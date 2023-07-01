import React, { useState } from 'react'
import './SubmissionForm.css'
// import Dropdown from "./Dropdown";

const SubmissionForm = () => {
    const [name, setName] = useState('');
    //const [variation, setVariation] = useState('');
    const [intro, setIntro] = useState('');
    // const [ingredient, setIngredient] = useState([]);
    // const [ingredientQuantity, setIngredientQuantity] = useState([]);
    // const [ingredientUOM, setIngredientUOM] = useState([]);
    const [step, setStep] = useState('');
    //const [status, setStatus] = useState('');
    const [gluten, setGluten] = useState(false);
    const [dairy, setDairy] = useState(false);
    const [selected, setSelected] = useState('');
    const [ingredients, setIngredients] = useState([{
        ingredient: "", ingredient_quantity: "", ingredient_uom: ""
    }]);
    const [steps, setSteps] = useState([{
        step: ""
    }]);

    const handleChange = e => {
        if (e.target.id === "add_ingredient" && ingredients.length < 20) {
            setIngredients([
                ...ingredients,
                {ingredient: "", ingredient_quantity: "", ingredient_uom: ""}
            ])
        }
        if (e.target.id === "remove_ingredient" && ingredients.length > 1) {
            setIngredients(
                ingredients.slice(0, -1)
            )
        }
        if (e.target.id === "add_step" && steps.length < 20) {
            setSteps([
                ...steps,
                {step: ""}
            ])
        }
        if (e.target.id === "remove_step" && steps.length > 1) {
            setSteps(
                steps.slice(0, -1)
            )
        }
    }

    const handleSubmit = () => {
        var variation = 0;
        if (gluten) {
            variation += 1;
        }
        if (dairy) {
            variation += 2;
        }

        var status = 1;
        if (selected !== "radio1") {
            status = 2;
        }

        var ingredients = [];
        console.log("Ingredient:" + ingredient);

        var stepList = new Array([step.length]);
        for (let i = 0; i < step.length; i++) {
            stepList[i] = step[i];
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
            

            //ingredients.ingredientUOM.replace(/[^a-z]/gi, '');

            fetch('http://localhost:8180/recipe/add',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({name, intro, ingredient, stepList, status, variation})
                }
            )
            .then((response) => response.json());


            // const formData  = new FormData();
            // formData.append("name", name);
            // formData.append("intro", intro);
            // formData.append("ingredients", ingredients);
            // formData.append("steps", steps);
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

    function handleIngredientUpdate(updateIndex, value) {
        const nextIngredients = ingredients.map((currElement, index) => {
            if (updateIndex === index) {
                var i =  currElement.ingredient_quantity;
                var uom = currElement.ingredient_uom;
                return { value, i, uom };
            }
            else {
                return currElement;
            }
        });
        setIngredients(nextIngredients);
    }

    return (
        <form>
            <h1>New <span>Recipe</span></h1>
            <input type="text" name="recipe" id="" placeholder="Recipe Title" value={name} onChange={(e) => setName(e.target.value)} />
            <textarea name="intro" id="" cols="30" rows="10" placeholder="Introduction" value={intro} onChange={(e) => setIntro(e.target.value)} />

            <h2>Ingredients</h2>
            {ingredients.map((item, i) => {
            return (
                <div key={i} className="ingredientBox">
                    <textarea name="ingredient" placeholder="Ingredient" value={item.ingredient}
                            onChange={(e) => handleIngredientUpdate(i, e.target.value)} />
                    <input type="number" name="ingredient_quantity" placeholder="Ingredient Quantity" value={item.ingredient_quantity} onChange={(e) => setIngredientQuantity(e.target.value)} />
                    <input type="text" name="ingredient_uom" placeholder="Ingredient Unit of Measurement" value={item.ingredient_uom} onChange={(e) => setIngredientUOM(e.target.value)} />
                    {/* <textarea name="ingredient" id="" placeholder="Ingredient" value={ingredient[item]} onChange={(e) => setIngredient(e.target.value)} />
                    <input type="number" name="ingredient_quantity" id="" placeholder="Ingredient Quantity" value={ingredientQuantity[item]} onChange={(e) => setIngredientQuantity(e.target.value)} />
                    <input type="text" name="ingredient_uom" id="" placeholder="Ingredient Unit of Measurement" value={ingredientUOM[item]} onChange={(e) => setIngredientUOM(e.target.value)} /> */}
                </div>
            )})}

            <button type="button" id="add_ingredient" style={{visibility: ingredients.length === 20 ? "hidden" : "visible"}} onClick={(handleChange)}>Add Ingredient</button>
            <button type="button" id="remove_ingredient" style={{visibility: ingredients.length === 1 ? "hidden" : "visible"}} onClick={(handleChange)}>Remove Ingredient</button>

            <h2>Steps</h2>
            {steps.map((item, i) => {
            return (
                <div key={i} className="stepBox">
                    <textarea name="step" id="" cols="30" rows="10" placeholder="Step" value={step[item]} onChange={(e) => setStep(e.target.value)} />
                </div>
            )})}

                <button type="button" id="add_step" style={{visibility: steps.length === 20 ? "hidden" : "visible"}} onClick={(handleChange)}>Add Step</button>
                <button type="button" id="remove_step" style={{visibility: steps.length === 1 ? "hidden" : "visible"}} onClick={(handleChange)}>Remove Step</button>

            {/* <Dropdown selected={selected} setSelected={setSelected} value={selected} onChange={(e) => setStatus(e.target.value)} /> */}
            <h2>Visibility</h2>
            Public<input type="radio" name="selected" value="radio1" onChange={e=>setSelected(e.target.value)} />
            Private<input type="radio" name="selected" value="radio2" onChange={e=>setSelected(e.target.value)} />
            Gluten Free?<input type="checkbox" value="gluten" onChange={(e) => setGluten(e.target.checked)} />
            Dairy Free?<input type="checkbox" value="dairy" onChange={(e) => setDairy(e.target.checked)} />
            <button type="button" name="send" id="send" value ="SEND" onClick={(handleSubmit)}>Send</button>
            
        </form>
    )
}

export default SubmissionForm