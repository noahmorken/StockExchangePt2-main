import React from "react";
import Header from '../Header'
import SubmissionForm from "../api/SubmissionForm";

export default function About() {
    return (
        <>
            <Header link={"about"} />
            <h2>About Page</h2>
            <SubmissionForm />
        </>
    );
}