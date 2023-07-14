import React, { useState, useEffect } from "react";
import Header from '../Header'
import { useParams } from 'react-router-dom';
import './Info.css'

export default function Info() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const recipeGet = (e) => {
        fetch('http://localhost:8180/recipe/'+e)
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            setData(json);
            if (!json.ok) {
                throw new Error();
            }
        })
        .catch(error => {
            if (typeof error.json === "function") {
                error.json().then(jsonError => {
                    console.log("Json error from API");
                    console.log(jsonError);
                }).catch(genericError => {
                    console.log("Generic error from API");
                    console.log(error.statusText);
                });
            } else {
                console.log("Fetch error");
                console.log(error);

            }
        });
//        setState();
    };
    useEffect(() => {
        /* if (id === parseInt(id, 10)){
            recipeGet(id);
        }
        else {
            (async () => {
                const result = await axios("http://localhost:8180/recipe/list");
                setData(result.data);
                console.log(result.data);
                {result.data && result.data.map((item) => {
                    console.log(item.url);
                    if(JSON.stringify(id) === JSON.stringify(item.url)) {
                        console.log("Match found!");
                        let r_id = item.recipe_id;
                        recipeGet(r_id);
                    }
                })}
            })();
        } */
        recipeGet(id);
    }, []);

    return (
/*         <>
            <Header link={"info"} />
            <h2>Recipe Information</h2>
            <p>Recipe ID: {data.id}</p>
                <p>Variation ID: {data.variation}</p>
                <p>Date: {data.date}</p>
                <p>Name: {data.name}</p>
                <p>Intro: {data.intro}</p>
                <p>Status: {data.status}</p>
                <div>Ingredients:
                    <ul>
                        <>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Order</th>
                                        <th>Name</th>
                                        <th>Quantity</th>
                                        <th>UOM</th>
                                    </tr>
                                </thead>
                                {data.ingredients && data.ingredients.map((item) => {
                                    console.log("item: "+item);
                                    return (
                                        <tbody>
                                            <tr>
                                                <td>{item.ingredient_order}</td>
                                                <td>{item.ingredient}</td>
                                                <td>{item.ingredient_quantity}</td>
                                                <td>{item.ingredient_uom}</td>
                                            </tr>
                                        </tbody>
                                    )
                                })}
                            </table>
                        </>
                    </ul>
                </div>
                <div>Steps:
                    <ul>
                        <>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Order</th>
                                        <th>Content</th>
                                    </tr>
                                </thead>
                                {data.steps && data.steps.map((item) => {
                                    console.log(item);
                                    return (
                                        <tbody>
                                            <tr>
                                                <td>{item.step_order}</td>
                                                <td>{item.step}</td>
                                            </tr>
                                        </tbody>
                                    )
                                })}
                            </table>
                        </>
                    </ul>
                </div>
        </> */
        <>
            <Header />
                <h1 style={{color: "red"}}>{data.name}</h1>
                <h3>Introduction: {data.intro}</h3>
                <h3>Ingredients you'll need:</h3>
                {data.ingredients && data.ingredients.map((item) => {
                    if(item.ingredient_uom) {
                        return (
                            <h4>{item.ingredient}, {item.ingredient_quantity} {item.ingredient_uom}</h4>
                        )
                    }
                    else {
                        return (
                            <h4>{item.ingredient_quantity} {item.ingredient}</h4>
                        )
                    }
                })}
                <h3>Steps:</h3>
                {data.steps && data.steps.map((item) => {
                    return (
                        <h4>Step #{item.step_order}: {item.step}</h4>
                    )
                })}
        </>
    );
}