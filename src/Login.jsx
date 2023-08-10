import React, { useState } from "react";
import axios from 'axios';

export const Login = () => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    const login = () => {
        axios.post("http://localhost:8180/api/auth/signin", {
            username: user,
            password: pass,
        }).then((response) => {
            if (response.data.username) {
                localStorage.setItem("username", JSON.stringify(response.data.username));
            }
            if (response.data.accessToken) {
                let jwt = response.data.tokenType + ' ' + response.data.accessToken;
                console.log(jwt.replace(/"/g, ''));
                localStorage.setItem("jwt", jwt.replace(/"/g, ''));
                //axios.defaults.headers.common['Authorization'] = JSON.stringify(response.data.accessToken);
            }
        })
    }

    const logout = () => {
        localStorage.setItem("jwt", null);
        localStorage.setItem("username", null);
        axios.get("http://localhost:8180/api/auth/signout");
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
                <button type="submit" onClick={logout}>Log Out</button>
            </form>
        </>
    )
}

export default Login