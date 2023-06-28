import React, { useState } from 'react'
import './SubmissionForm.css'
// import Dropdown from "./Dropdown";

const SubmissionForm = () => {
    const [name, setName] = useState('');
    const [intro, setIntro] = useState('');
    const [ingredient, setIngredient] = useState('');
    const [ingredient_order, setIngredientOrder] = useState('');
    const [ingredient_quantity, setIngredientQuantity] = useState('');
    const [ingredient_uom, setIngredientUOM] = useState('');
    const [step, setStep] = useState('');
    const [step_order, setStepOrder] = useState('');
    const [status, setStatus] = useState('');
    const [selected, setSelected] = useState("");

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
        }
    }

    return (
        <form>
            <h1>New <span>Recipe</span></h1>
            <input type="text" name="recipe" id="" placeholder="Recipe Title" value={name} onChange={(e) => setName(e.target.value)} />
            <textarea name="intro" id="" cols="30" rows="10" placeholder="Introduction" value={intro} onChange={(e) => setIntro(e.target.value)} />
            <textarea name="ingredients" id="" cols="30" rows="10" placeholder="Ingredients" value={ingredient} onChange={(e) => setIngredient(e.target.value)} />
            <textarea name="ingredient_order" id="" cols="30" rows="10" placeholder="Ingredient Order" value={ingredient_order} onChange={(e) => setIngredientOrder(e.target.value)} />
            <textarea name="ingredient_quantity" id="" cols="30" rows="10" placeholder="Ingredient Quantity" value={ingredient_quantity} onChange={(e) => setIngredientQuantity(e.target.value)} />
            <textarea name="ingredient_uom" id="" cols="30" rows="10" placeholder="Ingredient Unit of Measurement" value={ingredient_uom} onChange={(e) => setIngredientUOM(e.target.value)} />
            <textarea name="steps" id="" cols="30" rows="10" placeholder="Steps" value={step} onChange={(e) => setStep(e.target.value)} />
            <textarea name="step_order" id="" cols="30" rows="10" placeholder="Step Order" value={step_order} onChange={(e) => setStepOrder(e.target.value)} />
            <Dropdown selected={selected} setSelected={setSelected} value={selected} onChange={(e) => setStatus(e.target.value)} />
            <input type="checkbox" value={gluten} onChange={(e) => setVariation(e.target.value)} /> Gluten Free?
            <input type="checkbox" value={dairy} onChange={(e) => setVariation(e.target.value)} /> Dairy Free?
            <button type="submit" name="send" id="send" value ="SEND" onClick={(handleSubmit)}>Send</button>
            <button type="submit">Add Ingredient</button>
            <button type="submit">Remove Ingredient</button>
            <button type="submit">Add Step</button>
            <button type="submit">Remove Step</button>
        </form>
    )
}

export default SubmissionForm