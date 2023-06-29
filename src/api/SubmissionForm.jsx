import React, { useState } from 'react'
import './SubmissionForm.css'
import Dropdown from "./Dropdown";

const SubmissionForm = () => {
    const [name, setName] = useState('');
    const [setVariation] = useState('');
    const [intro, setIntro] = useState('');
    const [ingredient, setIngredient] = useState('');
    const [setIngredientQuantity] = useState('');
    const [setIngredientUOM] = useState('');
    const [step, setStep] = useState('');
    const [status, setStatus] = useState('');
    const [gluten, setGluten] = useState('');
    const [dairy, setDairy] = useState('');
    const [selected, setSelected] = useState("");
    const [ingredientList, setIngredientList] = useState([{
        ingredient: "", ingredient_quantity: "", ingredient_uom: ""
    }]);
    const [stepList, setStepList] = useState([{
        step: ""
    }]);

    const handleChange = e => {
        if (e.target.id === "add_ingredient" && ingredientList.length < 20) {
            setIngredientList([
                ...ingredientList,
                {ingredient: "", ingredient_quantity: "", ingredient_uom: ""}
            ])
        }
        if (e.target.id === "remove_ingredient" && ingredientList.length > 1) {
            setIngredientList(
                ingredientList.slice(0, -1)
            )
        }
        if (e.target.id === "add_step" && stepList.length < 20) {
            setStepList([
                ...stepList,
                {step: ""}
            ])
        }
        if (e.target.id === "remove_step" && stepList.length > 1) {
            setStepList(
                stepList.slice(0, -1)
            )
        }
    }

    const handleSubmit = () => {
        if(name.length === 0) {
            alert("Title cannot be blank!");
        }
        else if(intro.length === 0) {
            alert("Intro cannot be blank!");
        }
        else if(ingredient.length === 0) {
            alert("Ingredients cannot be blank!");
        }
        else if(step.length === 0) {
            alert("Steps cannot be blank!");
        }
        else{
            alert("All set!");
            
            if (!gluten && !dairy) {
                setVariation(1);
            }
            else if (gluten && !dairy) {
                setVariation(2);
            }
            else if (!gluten && dairy) {
                setVariation(3);
            }
            else {
                setVariation(4);
            }

            if (status === "Public") {
                setStatus(1);
            }
            else {
                setStatus(2);
            }

            fetch('http://localhost:8180/recipe/add')
            .then((response) => response.json());
        }
    }

    return (
        <form>
            <h1>New <span>Recipe</span></h1>
            <input type="text" name="recipe" id="" placeholder="Recipe Title" value={name} onChange={(e) => setName(e.target.value)} />
            <textarea name="intro" id="" cols="30" rows="10" placeholder="Introduction" value={intro} onChange={(e) => setIntro(e.target.value)} />

            <button type="button" id="add_ingredient" onClick={(handleChange)}>Add Ingredient</button>
            <button type="button" id="remove_ingredient" onClick={(handleChange)}>Remove Ingredient</button>

            {ingredientList.map((item, i) => {
            return (
                <div key={i} className="ingredientBox">
                    <textarea name="ingredient" id="" pattern="/[^a-z]/gi" placeholder="Ingredient" value={item.ingredient} onChange={(e) => setIngredient(e.target.value)} />
                    <textarea name="ingredient_quantity" id="" pattern="/[a-z]/gi" placeholder="Ingredient Quantity" value={item.ingredient_quantity} onChange={(e) => setIngredientQuantity(e.target.value)} />
                    <textarea name="ingredient_uom" id="" pattern="/[^a-z]/gi" placeholder="Ingredient Unit of Measurement" value={item.ingredient_uom} onChange={(e) => setIngredientUOM(e.target.value)} />
                </div>
            )})}

            <button type="button" id="add_step" onClick={(handleChange)}>Add Step</button>
            <button type="button" id="remove_step" onClick={(handleChange)}>Remove Step</button>

            {stepList.map((item, i) => {
            return (
                <div key={i} className="stepBox">
                    <textarea name="step" id="" cols="30" rows="10" placeholder="Step" value={item.step} onChange={(e) => setStep(e.target.value)} />
                </div>
            )})}

            <Dropdown selected={selected} setSelected={setSelected} value={selected} onChange={(e) => setStatus(e.target.value)} />
            <input type="checkbox" value={gluten} onChange={(e) => setGluten(e.target.value)} /> Gluten Free?
            <input type="checkbox" value={dairy} onChange={(e) => setDairy(e.target.value)} /> Dairy Free?
            <button type="submit" name="send" id="send" value ="SEND" onClick={(handleSubmit)}>Send</button>
            
        </form>
    )
}

export default SubmissionForm