import React, { useState } from 'react'
import './SubmissionForm.css'
// import Dropdown from "./Dropdown";

const SubmissionForm = () => {
    const [name, setName] = useState('');
    const [variation, setVariation] = useState('');
    const [intro, setIntro] = useState('');
    const [ingredient, setIngredient] = useState('');
    const [ingredientQuantity, setIngredientQuantity] = useState('');
    const [ingredientUOM, setIngredientUOM] = useState('');
    const [step, setStep] = useState('');
    const [status, setStatus] = useState('');
    const [gluten, setGluten] = useState('');
    const [dairy, setDairy] = useState('');
    const [selected, setSelected] = useState('');
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

        if (selected === "Public") {
            setStatus(1);
        }
        else {
            setStatus(2);
        }

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
        else if(status === "Choose One") {
            alert("Status cannot be blank!")
        }
        else{
            alert("All set!");
            //ingredientList.ingredientUOM.replace(/[^a-z]/gi, '');

            fetch('http://localhost:8180/recipe/add',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({name, intro, ingredientList, stepList, status, variation})
                }
            )
            .then((response) => response.json());


            // const formData  = new FormData();
            // formData.append("name", name);
            // formData.append("intro", intro);
            // formData.append("ingredientList", ingredientList);
            // formData.append("stepList", stepList);
            // formData.append("status", status);
            // formData.append("variation", variation);

            // fetch('http://localhost:8180/recipe/add',
            //     {
            //         method: 'POST',
            //         body: formData
            //     }
            // )
            // .then((response) => response.json());
        }
    }

    return (
        <form>
            <h1>New <span>Recipe</span></h1>
            <input type="text" name="recipe" id="" placeholder="Recipe Title" value={name} onChange={(e) => setName(e.target.value)} />
            <textarea name="intro" id="" cols="30" rows="10" placeholder="Introduction" value={intro} onChange={(e) => setIntro(e.target.value)} />

            {ingredientList.map((item, i) => {
            return (
                <div key={i} className="ingredientBox">
                    <textarea name="ingredient" id="" placeholder="Ingredient" value={ingredient[item]} onChange={(e) => setIngredient(e.target.value)} />
                    <input type="number" name="ingredient_quantity" id="" placeholder="Ingredient Quantity" value={ingredientQuantity[item]} onChange={(e) => setIngredientQuantity(e.target.value)} />
                    <input type="text" name="ingredient_uom" id="" placeholder="Ingredient Unit of Measurement" value={ingredientUOM[item]} onChange={(e) => setIngredientUOM(e.target.value)} />
                </div>
            )})}

            <button type="button" id="add_ingredient" style={{visibility: ingredientList.length === 20 ? "hidden" : "visible"}} onClick={(handleChange)}>Add Ingredient</button>
            <button type="button" id="remove_ingredient" style={{visibility: ingredientList.length === 1 ? "hidden" : "visible"}} onClick={(handleChange)}>Remove Ingredient</button>

            {stepList.map((item, i) => {
            return (
                <div key={i} className="stepBox">
                    <textarea name="step" id="" cols="30" rows="10" placeholder="Step" value={step[item]} onChange={(e) => setStep(e.target.value)} />
                </div>
            )})}

            <button type="button" id="add_step" style={{visibility: stepList.length === 20 ? "hidden" : "visible"}} onClick={(handleChange)}>Add Step</button>
            <button type="button" id="remove_step" style={{visibility: stepList.length === 1 ? "hidden" : "visible"}} onClick={(handleChange)}>Remove Step</button>

            {/* <Dropdown selected={selected} setSelected={setSelected} value={selected} onChange={(e) => setStatus(e.target.value)} /> */}
            <h2>Visibility</h2>
            <input type="radio" name="selected" value="radio1" onChange={e=>setSelected(e.target.value)} />Public
            <input type="radio" name="selected" value="radio2" onChange={e=>setSelected(e.target.value)} />Private
            <input type="checkbox" value={gluten} onChange={(e) => setGluten(e.target.value)} />Gluten Free?
            <input type="checkbox" value={dairy} onChange={(e) => setDairy(e.target.value)} />Dairy Free?
            <button type="button" name="send" id="send" value ="SEND" onClick={(handleSubmit)}>Send</button>
            
        </form>
    )
}

export default SubmissionForm