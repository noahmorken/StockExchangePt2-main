import React, { useState, useEffect } from 'react'
import './SubmissionForm.css'
import validator from 'validator';
import { useNavigate } from 'react-router-dom';
// import Dropdown from "./Dropdown";

const SubmissionForm = () => {
    // const [hidden, setHidden] = useState(true);
    const [name, setName] = useState('');
    const [intro, setIntro] = useState('');
    const [url, setUrl] = useState('');
    const [gluten, setGluten] = useState(false);
    const [dairy, setDairy] = useState(false);
    const [selected, setSelected] = useState('');
    const [ingredients, setIngredients] = useState([{
        ingredient_order: "", ingredient: "", ingredient_quantity: "", ingredient_uom: ""
    }]);
    const [steps, setSteps] = useState([{
        step_order: "", step: ""
    }]);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    /* const listGet = () => {
        setHidden(!hidden);
    };
    const [data, setData] = useState([]); */

    const handleChange = e => {
        if (e.target.id === "add_ingredient" && ingredients.length < 20) {
            setIngredients([
                ...ingredients,
                {ingredient_order: "", ingredient: "", ingredient_quantity: "", ingredient_uom: ""}
            ])
        }
        /* if (e.target.id === "remove_ingredient" && ingredients.length > 1) {
            setIngredients(
                ingredients.slice(0, -1)
            )
        } */
        if (e.target.id === "add_step" && steps.length < 20) {
            setSteps([
                ...steps,
                {step_order: "", step: ""}
            ])
        }
        /* if (e.target.id === "remove_step" && steps.length > 1) {
            setSteps(
                steps.slice(0, -1)
            )
        } */
    }

    const validate = (value) => {
        if (url.length === 0 || validator.isURL(value)) {
            setErrorMessage("Valid URL!");
            if (validator.isURL(value)) {
                setUrl(value);
            }
            else {
                setUrl(null);
            }
        }
        else {
            setErrorMessage("Invalid URL.");
        }
    }

    const handleSubmit = () => {
        validate(url);
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

        // var ingredients = [];
        for (let i = 0; i < ingredients.length; i++) {
            console.log("Ingredient:" + JSON.stringify(ingredients[i]));
        }

        var stepList = new Array([steps.length]);
        for (let i = 0; i < steps.length; i++) {
            stepList[i] = steps[i];
        }

        if(name.length === 0) {
            alert("Title cannot be blank!");
        }
        else if(intro.length === 0) {
            alert("Intro cannot be blank!");
        }
        else if(ingredients.length === 0) {
            alert("Ingredients cannot be blank!");
        }
        else if(steps.length === 0) {
            alert("Steps cannot be blank!");
        }
        else if(status === "Choose One") {
            alert("Status cannot be blank!")
        }
        else if(errorMessage === "Invalid URL.") {
            alert("URL is not valid!");
        }
        else{
            for(var i = 0;  i < ingredients.length; i++) {
                const match = ingredients[i].ingredient_quantity.match(/[1-9][0-9]*(?:\/[1-9][0-9])/g);
                if(match != null) {
                    alert("Invalid ingredient quantity!")
                    break;
                }
            }

            alert("All set!");

            //ingredients.ingredientUOM.replace(/[^a-z]/gi, '');
            console.log(ingredients);
            fetch('http://localhost:8180/recipe/add',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({name, intro, ingredients, steps, status, variation, url})
                }
            )
            .then(response => {
                console.log(response);
                if (!response.ok) {
                    alert("An error occured.");
                }
                else {
                    alert("Recipe added!");
                    window.location.reload(true);
                }
            });

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

    function handleIngredientUpdate(updateIndex, field, value) {
        const nextIngredients = ingredients.map((currElement, index) => {
            if (updateIndex === index) {
                console.log("curr ing:" + JSON.stringify(currElement));
                var ing =  currElement.ingredient;
                var num =  currElement.ingredient_quantity;
                var uom = currElement.ingredient_uom;
                if (field === "ing") {
                    return { "ingredient_order": index, "ingredient": value, "ingredient_quantity": num, "ingredient_uom": uom };
                }
                else if (field === "num") {
                    return { "ingredient_order": index, "ingredient": ing, "ingredient_quantity": value, "ingredient_uom": uom };
                }
                else if (field === "unit") {
                    return { "ingredient_order": index, "ingredient": ing, "ingredient_quantity": num, "ingredient_uom": value };
                }
                else {
                    return { "ingredient_order": index, "ingredient": ing, "ingredient_quantity": num, "ingredient_uom": uom };
                }
            }
            else {
                return currElement;
            }
        });
        console.log("next ing:" + JSON.stringify(nextIngredients));
        setIngredients(nextIngredients);
    }

    function handleStepUpdate(updateIndex, field, value) {
        const nextSteps = steps.map((currElement, index) => {
            if (updateIndex === index) {
                console.log("curr step:" + JSON.stringify(currElement));
                var des =  currElement.step;
                if (field === "step") {
                    return { "step_order": index, "step": value };
                }
                else {
                    return { "step_order": index , "step": des };
                }
            }
            else {
                return currElement;
            }
        });
        console.log("next step:" + JSON.stringify(nextSteps));
        setSteps(nextSteps);
    }

    function removeIng(ingId) {
        var newIngredients = ingredients.slice();
        newIngredients.splice(ingId, 1);
        setIngredients(newIngredients);
    }

    function removeStep(stepId) {
        var newSteps = steps.slice();
        newSteps.splice(stepId, 1);
        setSteps(newSteps);
    }

    useEffect(() => {
        (async () => {
            navigate("/shop");
        })();
    }, []);

    return (
        <form>
            <h1>New <span>Recipe</span></h1>
            <input type="text" name="recipe" id="" placeholder="Recipe Title" value={name} onChange={(e) => setName(e.target.value)} />
            <textarea name="intro" id="" cols="30" rows="10" placeholder="Introduction" value={intro} onChange={(e) => setIntro(e.target.value)} />

            <h2>Ingredients</h2>
            {ingredients.map((item, i) => {
            return (
                <div key={i} className="side-by-side">
                    <textarea name="ingredient" placeholder="Ingredient" value={item.ingredient}
                            onChange={(e) => handleIngredientUpdate(i, "ing", e.target.value)} />
                    <input type="text" name="ingredient_quantity" placeholder="Quantity"
                            value={item.ingredient_quantity} onChange={(e) => handleIngredientUpdate(i, "num", e.target.value)} />
                    <input type="text" name="ingredient_uom" placeholder="Units"
                            value={item.ingredient_uom} onChange={(e) => handleIngredientUpdate(i, "unit", e.target.value)} />
                    <button type="button" id="remove_ingredient" style={{visibility: ingredients.length === 1 ? "hidden" : "visible"}}
                            onClick={(e) => removeIng(i)}>Remove Ingredient</button>
                    {/* <textarea name="ingredient" id="" placeholder="Ingredient" value={ingredient[item]} onChange={(e) => setIngredient(e.target.value)} />
                    <input type="number" name="ingredient_quantity" id="" placeholder="Ingredient Quantity" value={ingredientQuantity[item]} onChange={(e) => setIngredientQuantity(e.target.value)} />
                    <input type="text" name="ingredient_uom" id="" placeholder="Ingredient Unit of Measurement" value={ingredientUOM[item]} onChange={(e) => setIngredientUOM(e.target.value)} /> */}
                </div>
            )})}

            <button type="button" id="add_ingredient" style={{visibility: ingredients.length === 20 ? "hidden" : "visible"}} onClick={(handleChange)}>Add Ingredient</button>

            <h2>Steps</h2>
            {steps.map((item, i) => {
            return (
                <div key={i} className="side-by-side">
                    <textarea name="step" id="" cols="30" rows="10" placeholder="Step"
                            value={item.step} onChange={(e) => handleStepUpdate(i, "step", e.target.value)} />
                    <button type="button" id="remove_step" style={{visibility: steps.length === 1 ? "hidden" : "visible"}}
                            onClick={(e) => removeStep(i)}>Remove Step</button>
                </div>
            )})}

            <button type="button" id="add_step" style={{visibility: steps.length === 20 ? "hidden" : "visible"}} onClick={(handleChange)}>Add Step</button>

            {/* <Dropdown selected={selected} setSelected={setSelected} value={selected} onChange={(e) => setStatus(e.target.value)} /> */}
            <h2>Visibility</h2>
            <div className="side-by-side">
                <input type="radio" name="selected" value="radio1" id="public_radio" onChange={e=>setSelected(e.target.value)} />
                <label htmlFor="public_radio">Public</label>
                <span className="space_expander"></span>
            </div>
            <div className="side-by-side">
                <input type="radio" name="selected" value="radio2" id="private_radio" onChange={e=>setSelected(e.target.value)} />
                <label htmlFor="private_radio">Private</label>
                <span className="space_expander"></span>
            </div>
            <div className="side-by-side">
                <input type="checkbox" value="gluten" id="gluten_free" onChange={(e) => setGluten(e.target.checked)} />
                <label htmlFor="gluten_free">Gluten Free</label>                
                <span className="space_expander"></span>
            </div>
            <div className="side-by-side">
                <input type="checkbox" value="dairy" id="dairy_free" onChange={(e) => setDairy(e.target.checked)} />
                <label htmlFor="dairy_free">Dairy Free</label>                
                <span className="space_expander"></span>
            </div>
            <h2>URL</h2>
            <input type="text" name="url" id="" placeholder="alternate URL" value={url} onChange={(e) => setUrl(e.target.value)} />
            <button type="button" name="send" id="send" value ="SEND" onClick={(handleSubmit)}>Send</button>
            
        </form>
    )
}

export default SubmissionForm