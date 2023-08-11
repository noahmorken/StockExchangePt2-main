import React, { useState } from "react";
import axios from 'axios';

export const Login = () => {
    const [logged, setLogged] = useState(localStorage.getItem("jwt") !== "null");
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
                alert("Login successful!");
                setLogged(true);
                window.location.reload(true);
                //axios.defaults.headers.common['Authorization'] = JSON.stringify(response.data.accessToken);
            }
            if (response.data.status === 401) {
                alert("Login unsuccessful. Please try again.");
            }
        })
    }

    const logout = () => {
        localStorage.setItem("jwt", null);
        localStorage.setItem("username", null);
        axios.get("http://localhost:8180/api/auth/signout");
        alert("You have been logged out.")
        setLogged(false);
        window.location.reload(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <pre hidden={logged === true}>
                    <h2>Login</h2>
                    <label htmlFor="username">Username</label>
                    <input value={user} type="text" onChange={(e) => setUser(e.target.value)} placeholder="yourusername" id="username" name="username"/>
                    <label htmlFor="password">Password</label>
                    <input value={pass} type="text" onChange={(e) => setPass(e.target.value)} placeholder="********" id="password" name="password"/>
                    <button type="submit" onClick={login}>Log In</button>
                </pre>
                <pre hidden={logged === false}>
                    <button type="submit" onClick={logout}>Log Out</button>
                </pre>
            </form>
        </>
    )
}

export default Login