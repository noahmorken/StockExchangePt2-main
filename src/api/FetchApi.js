import React, { useMemo, useState, useEffect } from "react";
import './FetchApi.css'
import axios from "axios";
import { useTable } from "react-table";

function FetchAPI() {
    const [hidden, setHidden] = useState(true);
    const [data, setData] = useState([]);
    const apiGet = () => {
        setHidden(!hidden);
    };

    useEffect(() => {
        (async () => {
            const result = await axios("http://localhost:8180/recipe/list");
            setData(result.data[result.data.length-1]);
            console.log(result.data);
        })();
    }, []);

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
                ],
            },
            {
                // Third group - Ingredients
                Header: "Ingredients",
                // Third group columns
                columns: [
                    {
                        Header: "Name",
                        accessor: "name",
                    },
                    {
                        Header: "Quantity",
                        accessor: "date",
                    },
                    {
                        Header: "Unit of Measurement",
                        accessor: "date",
                    },
                ],
            },
            {
                // Fourth group - Ingredients
                Header: "Steps",
                // Fourth group columns
                columns: [
                    {
                        Header: "Description",
                        accessor: "name",
                    },
                ],
            },
        ],
        []
    );

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

    return (
        <div>
            Fetch API <br />
            <button onClick={apiGet}>Fetch API</button>
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
                            return (
                                <tr key={row.id} {...getTableBodyProps()}>
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </pre>
        </div>
    );
}

export default FetchAPI;