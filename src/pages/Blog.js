import React from "react";
import Header from '../Header'
import FetchList from "../api/FetchList";

export default function Blog() {
    return (
        <>
            <Header link={"blog"} />
            <h2>Blog Page</h2>
            <FetchList />
        </>
    );
}