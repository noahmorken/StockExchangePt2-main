import React, { useState, useEffect } from "react";
import Header from '../Header'
import { useParams } from 'react-router-dom';

export default function Info() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const recipeGet = (e) => {
        fetch('http://localhost:8180/recipe/'+e)
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            setData(json);
        });
//        setState();
    };
    useEffect(() => {
        recipeGet(id);
    }, []);

    return (
        <>
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
        </>
    );
}