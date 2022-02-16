import React, { useState } from 'react';
import Axios from 'axios'
const SignIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        const emailError = document.getElementsByClassName("email-error")
        const passwordError = document.getElementsByClassName('password-error')

        Axios({
            method: "post",
            url: `http://localhost:5050/api/login`,
            withCredentials: true,
            data: {
                email,
                mdp: password,
            }

        })
            .then((response) => {
                console.log(response)
                window.location = '/'

            })
            .catch((err) => {
                console.log(err)
                throw err
            })
    }
    return (
        <div>
            <form action="" onSubmit={handleLogin} id="sign-up-form">
                <label htmlFor="email">Email</label>
                <br />
                <input
                    type="text"
                    name="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <div className="email-error"></div>
                <br />
                <label htmlFor="password">Mot de passe</label>
                <br />
                <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <div className="password-error"></div>
                <br />
                <input type="submit" value="Se connecter" />

            </form>
        </div>
    );
};

export default SignIn;