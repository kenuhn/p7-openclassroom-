import React, { useState } from 'react';
import Axios from 'axios'
import SignIn from './signIn';

const SignUp = () => {
    const [formSubmit, setFormSubmit] = useState(false);
    const [pseudo, setPseudo] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [ctrlPassword, setCtrlPassword] = useState("")

    const handleRegister = async (e) => {
        e.preventDefault();
        const pseudoError = document.querySelector('.pseudo.error')
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error')
        const ctrlPasswordError = document.querySelector(".ctrlPassword.error")

        ctrlPasswordError.innerHTML = "";


        ////////////////    pseudo   /////////////////////
        let pseudoRegex = new RegExp(
            /^[a-zA-Z\-]+$/
        )
        let testPseudo = pseudoRegex.test(pseudo)
        if (testPseudo == false){
            pseudoError.textContent ="pseudo pas secure"
        }
        /////////////      EMAIL      ////////////////////

        let emailRegexp = new RegExp(
            '^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$', 'i'
        );
        let testEmail = emailRegexp.test(email);
        if (testEmail == false) {
            emailError.textContent = 'Email non Valide';
        } 
        ////////////////    PASSWORD   /////////////////////
        let passwordRegexp = new RegExp(
            /^[#.0-9a-zA-ZÀ-ÿ\s,-]{2,60}$/
        )
        let testPassword = passwordRegexp.test(password)
        if (testPassword == false){
            passwordError.textContent ="Password pas secure"
        }

        if (password !== ctrlPassword ) {
            ctrlPasswordError.innerHTML = "les mots de passe ne correspondent pas";
        } 
        
        if (testEmail == false || testPassword == false || testPseudo == false  || password !== ctrlPassword){
            alert('une erreur a été commise')
        }else {
            await Axios({
                method: "post",
                url: "http://localhost:5050/api/signup",
                withCredentials: true,
                data: {
                    pseudo,
                    email,
                    mdp: password
                }
            })
                .then(() => {
                    setFormSubmit(true)
                })
                .catch((err) => console.log(err))
        }
    }
    return (
        <>
            {formSubmit ? (
                <>
                    <SignIn />
                    <span></span>
                    <h4 className="success">
                        Enregistrement réussi, veuillez vous connecter
                    </h4>
                </>
            ) : (

                <form action="" onSubmit={handleRegister} id="sign-up-form">
                    <label htmlFor="pseudo">Pseudo</label>
                    <br />
                    <input
                        type="text"
                        name="pseudo"
                        id="pseudo"
                        onChange={(e) => setPseudo(e.target.value)}
                        value={pseudo} />
                    <div className="pseudo error"></div>
                    <br />
                    <label htmlFor="email">Email</label>
                    <br />
                    <input
                        type="text"
                        name="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <div className="email error"></div>
                    <br />
                    <label htmlFor="password">mot de passe</label>
                    <br />
                    <input
                        type="text"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <div className="password error"></div>
                    <br />
                    <label htmlFor="controlPassword">confirmer mot de passe</label>
                    <br />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setCtrlPassword(e.target.value)}
                        value={ctrlPassword}
                    />
                    <div className="ctrlPassword error"></div>
                    <input type="submit" value="valider inscription" />
                </form>
            )}
        </>
    );
};

export default SignUp;