import React from "react";
import Header from '../Header'
import FetchAPI from "../api/FetchApi";

export default function Contact() {
    return (
        <>
            <Header link={"contact"} />
            <h2>Contact Page</h2>
            <FetchAPI />
        </>
    );
}