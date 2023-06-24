import React, { useState } from "react";

export const Login = () => {
    const [user] = useState('');
    const [pass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input value={user} type="username" placeholder="yourusername" id="username" name="username"/>
                <label htmlFor="password">Password</label>
                <input value={pass} type="password" placeholder="********" id="password" name="password"/>
                <button type="submit">Log In</button>
            </form>
            <button>Don't have an account? Register here!</button>
        </>
    )
}