import React, { useState } from "react";
import './FetchList.css'

function FetchList() {
    const [hidden, setHidden] = useState(true);
    const [data, setData] = useState([]);
    const listGet = () => {
        fetch('http://localhost:8180/recipe/list')
        .then((response) => response.json())
        .then((json) => {
            // console.log(json);
            setData(json);
            setHidden(!hidden);
        });
    };

    return (
        <div>
            My List <br />
            <button onClick={listGet}>Fetch List</button>
            <br />
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
            <pre hidden={hidden} >
                <div>All recipes:
                    <ul>
                        <>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Recipe Number:</th>
                                        <th>Variation Number:</th>
                                        <th>Title:</th>
                                        <th>Date Created:</th>
                                    </tr>
                                </thead>
                                {data && data.map((item) => {
                                    console.log("recipe: "+item);
                                    return (
                                        <tbody>
                                            <tr onClick={'http://localhost:8180/recipe/info' + item}>
                                                <td>{item.id}</td>
                                                <td>{item.variation}</td>
                                                <td>{item.name}</td>
                                                <td>{item.date}</td>
                                            </tr>
                                        </tbody>
                                    )
                                })}
                            </table>
                        </>
                    </ul>
                </div>
            </pre>
        </div>
    );
}

export default FetchList;