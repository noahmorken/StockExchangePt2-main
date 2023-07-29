import React, { useState } from "react";
import axios from 'axios';

export const Register = () => {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const register = () => {
        axios.post("http://localhost:8180/user/register", {
            username: user,
            email: email,
            password: pass,
        }).then((response) => {
            console.log(response);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                <label htmlFor="username">Username</label>
                <input value={user} type="text" onChange={(e) => setUser(e.target.value)} placeholder="yourusername" id="username" name="username"/>
                <label htmlFor="email">Email</label>
                <input value={email} type="text" onChange={(e) => setEmail(e.target.value)} placeholder="youremail@email.com" id="email" name="email"/>
                <label htmlFor="password">Password</label>
                <input value={pass} type="text" onChange={(e) => setPass(e.target.value)} placeholder="********" id="password" name="password"/>
                <button type="submit" onClick={register}>Register</button>
            </form>
        </>
    )
}

export default Register