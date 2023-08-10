import React, { useState, useEffect } from "react";
import './FetchList.css'
import axios from "axios";
// import { useTable } from "react-table";
// import { useNavigate } from 'react-router-dom';

function FetchList() {
    const [hidden, setHidden] = useState(true);
    const [hide, setHide] = useState(true);
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [intro, setIntro] = useState('');
    const [ingredients, setIngredients] = useState([{
        ingredient_order: "", ingredient: "", ingredient_quantity: "", ingredient_uom: ""
    }]);
    const [steps, setSteps] = useState([{
        step_order: "", step: ""
    }]);
    const [url, setUrl] = useState('');
    // const navigate = useNavigate();

    const listGet = () => {
        setHidden(!hidden);
    };

    useEffect(() => {
        (async () => {
            let config = {
                headers: {
                  "Authorization": localStorage.getItem('jwt'),
                }
            }            
            const result = await axios("http://localhost:8180/recipe/list", config);
            setData(result.data);
            console.log(result.data);
            listGet();
        })();
    }, []);

    /*
    const columns = useMemo(
        () => [
            {
                // First group - Recipe ID
                Header: "Recipe",
                // First group columns
                columns: [
                    {
                        Header: "Recipe ID",
                        accessor: "id",
                    },
                    {
                        Header: "Variation ID",
                        accessor: "variation",
                    },
                ],
            },
            {
                // Second group - Details
                Header: "Details",
                // Second group columns
                columns: [
                    {
                        Header: "Title",
                        accessor: "name",
                    },
                    {
                        Header: "Date Created",
                        accessor: "date",
                    },
                    {
                        Header: "URL",
                        accessor: "url",
                    },
                ],
            },
        ],
        []
    );
    */

    /*
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
        columns,
        data
    });
    */

    const showDetails = item => {
        setHide(false);
        setName(item.name);
        setIntro(item.intro);
        setIngredients(item.ingredients);
        console.log(ingredients);
        setSteps(item.steps);
        setUrl(item.url);
    };

    return (
        /* <div>
            All Recipes <br />
            <button onClick={listGet}>Fetch List</button>
            <br />
            <pre hidden={hidden} >
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                            prepareRow(row);
                            console.log(JSON.stringify(row.values.url));
                                return (
                                    <tr key={row.id} {...getTableBodyProps()}>
                                        {row.cells.map(cell => {
                                            return <td {...cell.getCellProps()} 
                                                onClick={() => 
                                                    {if (row.values.url.startsWith("/")) {
                                                        navigate(row.values.url)
                                                    }
                                                    else {
                                                        window.location.href = row.values.url;
                                                    }
                                                    }
                                                    } >
                                                {cell.render("Cell")}</td>;
                                        })}
                                    </tr>
                                );
                        })}
                    </tbody>
                </table>
            </pre>
        </div> */
        
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
                                    if (item.status === 1)  {
                                        return (
                                            <tbody>
                                                <tr onClick={() => {showDetails(item)}}>
                                                    <td style={{visibility: item.status === 1 ? "visible" : "hidden"}}>{item.name}</td>
                                                </tr>
                                            </tbody>
                                        );
                                    }
                                    else {
                                        return (
                                            <tbody></tbody>
                                        );
                                    }
                                })}
                            </table>
                        </>
                    </ul>
                </div>
                {/* <div className="recipeList">
                    {data.map((recipe) => {
                        return (
                            <button onClick={showDetails}>{recipe}</button>
                        )
                    })}
                </div>
                <pre hidden={showDetails} >
                    <div className="recipeInfo">
                        <>
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
                    </div>
                </pre> */}
            </div>

            <div className="content" id="content">
                <pre hidden={hide} >
                    <h1 style={{color: "red"}}>{name}</h1>
                    <h3>Introduction: {intro}</h3>
                    <h3>Ingredients you'll need:</h3>
                    {ingredients && ingredients.map((item) => {
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
                    {steps && steps.map((item) => {
                        return (
                            <h4>Step #{item.step_order + 1}: {item.step}</h4>
                        )
                    })}

                    <iframe title="recipeIframe" src={url} width="1000px" height="1000px"></iframe>

                </pre>
            </div>
        </div>
    );
}

export default FetchList;