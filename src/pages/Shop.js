import React from "react";
import Header from '../Header';
import Login from '../Login';
import Register from '../Register';

export default function Shop() {
    return (
        <>
            <Header link={"shop"} />
            <h2>Shop Page</h2>
            <Login />
            <Register />
        </>
    );
}