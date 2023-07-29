import React from "react";
import Header from '../Header'
// import FetchAPI from "../api/FetchApi";
import ModifyForm from "../api/ModifyForm";

export default function Contact() {
    return (
        <>
            <Header link={"contact"} />
            <h2>Contact Page</h2>
            <ModifyForm />
        </>
    );
}