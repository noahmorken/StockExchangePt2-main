import React, { useState } from "react";
import axios from 'axios';

export const Login = () => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    const login = () => {
        axios.post("http://localhost:8180/user/login", {
            username: user,
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
                <h2>Login</h2>
                <label htmlFor="username">Username</label>
                <input value={user} type="text" onChange={(e) => setUser(e.target.value)} placeholder="yourusername" id="username" name="username"/>
                <label htmlFor="password">Password</label>
                <input value={pass} type="text" onChange={(e) => setPass(e.target.value)} placeholder="********" id="password" name="password"/>
                <button type="submit" onClick={login}>Log In</button>
            </form>
        </>
    )
}

export default Login