import React, { useState } from "react";

export const Register = () => {
    const [user] = useState('');
    const [email] = useState('');
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
                <label htmlFor="email">Email</label>
                <input value={email} type="email" placeholder="youremail@email.com" id="email" name="email"/>
                <label htmlFor="password">Password</label>
                <input value={pass} type="password" placeholder="********" id="password" name="password"/>
                <button type="submit">Register</button>
            </form>
            <button>Already have an account? Log in here.</button>
        </>
    )
}