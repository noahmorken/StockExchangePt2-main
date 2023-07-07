import React, { useState } from "react";
import './FetchApi.css'

function FetchAPI() {
    const [hidden, setHidden] = useState(true);
    const [data, setData] = useState([]);
    const apiGet = () => {
        fetch('http://localhost:8180/recipe/list')
        .then((response) => response.json())
        .then((json) => {
            // console.log(json);
            setData(json[json.length-1]);
            setHidden(!hidden);
        });
//        setState();

    };

    // const state = {
    //     showMessage: false
    // }
    // function setState() {
    //     this.setState({showMessage: !this.state.showMessage});
    // }

    return (
        <div>
            My API <br />
            <button onClick={apiGet}>Fetch API</button>
            <br />
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
            <pre hidden={hidden} >
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
            </pre>
            <div>
                {/* <ul>
                    {data.map((item) => (
                        <li key={item.id}>{item.user},{item.title}</li>
                    ))}
                    </ul>*/}
            </div>
        </div>
    );
}

export default FetchAPI;