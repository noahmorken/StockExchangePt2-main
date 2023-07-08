import React, { useMemo, useState, useEffect } from "react";
import './FetchList.css'
import axios from "axios";
import { useTable } from "react-table";

function FetchList() {
    const [hidden, setHidden] = useState(true);
    const [data, setData] = useState([]);
    const listGet = () => {
        setHidden(!hidden);
    };

    useEffect(() => {
        (async () => {
            const result = await axios("http://localhost:8180/recipe/list");
            setData(result.data);
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

export default FetchList;