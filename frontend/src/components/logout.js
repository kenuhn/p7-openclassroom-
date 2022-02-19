import React from 'react';
import Axios  from 'axios';
import cookie from "js-cookie";
import authHeader from '../tknHeaders';

const Logout =  () => {

    const logout = () => {
        const removeTKN = (key) => {
            if (window !== "undefined"){
                localStorage.clear(key)
            }
        }
        removeTKN()
        window.location = "/connection"
    }
    return (
       <li onClick={logout}>
           <img src="./img/logout.svg" alt="logout" />

       </li>
    );
};

export default Logout;