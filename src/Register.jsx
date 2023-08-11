import React, { useState } from "react";
import axios from 'axios';

export const Register = () => {
    const [logged] = useState(localStorage.getItem("jwt") !== "null");
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const register = () => {
        axios.post("http://localhost:8180/api/auth/signup", {
            username: user,
            email: email,
            password: pass,
        }).then((response) => {
            if (response.status === 401) {
                alert("Registration unsuccessful. Please try again.");
            }
            else {
                alert("Registration successful!");
                console.log(response);
            }
            window.location.reload(true);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);
    }

    return(
        <>
            <pre hidden={logged === true}>
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
            </pre>
        </>
    )
}

export default Register