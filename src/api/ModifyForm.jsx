import React, { useState, useEffect } from 'react'
import './ModifyForm.css'
import axios from "axios";
import validator from 'validator';
import { useNavigate } from 'react-router-dom';

// import Dropdown from "./Dropdown";

const ModifyForm = () => {
    const [hidden, setHidden] = useState(true);
    const [data, setData] = useState([]);
    const [id, setId] = useState();
    const [name, setName] = useState('');
    const [intro, setIntro] = useState('');
    const [ingredients, setIngredients] = useState([{
        ingredient_order: "", ingredient: "", ingredient_quantity: "", ingredient_uom: ""
    }]);
    const [steps, setSteps] = useState([{
        step_order: "", step: ""
    }]);
    const [status, setStatus] = useState('');
    const [selected, setSelected] = useState('');
    const [diet, setDiet] = useState(false);
    const [url, setUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const showInfo = item => {
        setHidden(false);
        setId(item.id);
        setName(item.name);
        setIntro(item.intro);
        setIngredients(item.ingredients);
        setSteps(item.steps);
        setStatus(item.status);
        setDiet(item.variation);
        setUrl(item.url);
    };

    function handleIngredientUpdate(updateIndex, field, value) {
        const nextIngredients = ingredients.map((currElement, index) => {
            if (updateIndex === index) {
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
        setIngredients(nextIngredients);
    }

    function handleStepUpdate(updateIndex, field, value) {
        const nextSteps = steps.map((currElement, index) => {
            if (updateIndex === index) {
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

    const handleChange = e => {
        if (e.target.id === "add_ingredient" && ingredients.length < 20) {
            setIngredients([
                ...ingredients,
                {ingredient_order: "", ingredient: "", ingredient_quantity: "", ingredient_uom: ""}
            ])
        }
        if (e.target.id === "add_step" && steps.length < 20) {
            setSteps([
                ...steps,
                {step_order: "", step: ""}
            ])
        }
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

    const handleUpdate = () => {
        validate(url);
        var variation = 0;
        if (diet === 1 | diet === 3) {
            variation += 1;
        }
        if (diet === 2 | diet === 3) {
            variation += 2;
        }

        var status = 1;
        if (selected !== "radio1") {
            status = 2;
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
            fetch('http://localhost:8180/recipe/update',
                {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({id, name, intro, ingredients, steps, status, variation, url})
                }
            )
            .then(response => {
                if (!response.ok) {
                    alert("An error occured.");
                }
                else {
                    alert("Recipe updated!");
                    window.location.reload(true);
                }
            });
        }
    }

    const handleDelete = () => {
        fetch('http://localhost:8180/recipe/delete?' + new URLSearchParams({ recipeId: id }),
            {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }
        )
        .then(response => {
            if (!response.ok) {
                alert("An error occured.");
            }
            else {
                alert("Recipe deleted!");
                window.location.reload(true);
            }
        });
    }

    useEffect(() => {
        (async () => {
            navigate("/shop");
            const result = await axios("http://localhost:8180/recipe/list");
            setData(result.data);
        })();
    }, []);

    return (
        <div className="parent">
            <div className="leftNav">
                All Recipes
                <div>
                    <ul>
                        <>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Recipe Title:</th>
                                    </tr>
                                </thead>
                                {data && data.map((item) => {
                                    return (
                                        <tbody>
                                            <tr onClick={() => {showInfo(item)}}>
                                                <td>{item.name}</td>
                                            </tr>
                                        </tbody>
                                    )
                                })}
                            </table>
                        </>
                    </ul>
                </div>
                <button type="button" id="add_recipe" onClick={() => navigate("/about")}>Add New Recipe!</button>
            </div>

            <pre hidden={hidden} >
                <form>
                    <h1>Recipe <span>Details</span></h1>
                    <h2>Title</h2>
                    <input type="text" name="recipe" id="" placeholder="Recipe Title" value={name} onChange={(e) => setName(e.target.value)} />

                    <h2>Introduction</h2>
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

                    <h2>Visibility</h2>
                    <div className="side-by-side">
                        <input type="radio" name="selected" value="radio1" id="public_radio" 
                                checked={status === 1} onChange={e=>setSelected(e.target.value)} />
                        <label htmlFor="public_radio">Public</label>
                        <span className="space_expander"></span>
                    </div>
                    <div className="side-by-side">
                        <input type="radio" name="selected" value="radio2" id="private_radio"
                                checked={status === 2} onChange={e=>setSelected(e.target.value)} />
                        <label htmlFor="private_radio">Private</label>
                        <span className="space_expander"></span>
                    </div>

                    <h2>Dietary Restrictions</h2>
                    <div className="side-by-side">
                        <input type="checkbox" value="gluten" id="gluten_free"
                                checked={diet === 1 || diet === 3} onChange={(e) => setDiet(e.target.checked)} />
                        <label htmlFor="gluten_free">Gluten Free</label>                
                        <span className="space_expander"></span>
                    </div>
                    <div className="side-by-side">
                        <input type="checkbox" value="dairy" id="dairy_free"
                                checked={diet === 2 || diet === 3} onChange={(e) => setDiet(e.target.checked)} />
                        <label htmlFor="dairy_free">Dairy Free</label>                
                        <span className="space_expander"></span>
                    </div>

                    <h2>URL</h2>
                    <input type="text" name="url" id="" placeholder="alternate URL" value={url} onChange={(e) => setUrl(e.target.value)} />

                    <button type="button" name="update" id="update" value ="UPDATE" onClick={(handleUpdate)}>Update Entry</button>
                    <button type="button" name="delete" id="delete" value ="DELETE" onClick={(handleDelete)}>Delete Entry</button>
                </form>
            </pre>
        </div>
    )
}

export default ModifyForm