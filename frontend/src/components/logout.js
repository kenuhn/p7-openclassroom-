import React from 'react';
import Axios  from 'axios';
import cookie from "js-cookie";


const Logout =  () => {

    const removeCookie = (key) => {
        if (window !== "undefined"){
            cookie.remove(key, { expires: 1})
        }
    }

  const logout = async () =>{
      
    await Axios ({
        method: "get",
        url: "http://localhost:5050/api/logout",
        withCredentials: true,

    })
    .then(() => removeCookie('jwt'))
    .catch((err) => console.log(err))

    window.location = "/home"
  } 

    return (
       <li onClick={logout}>
           <img src="./img/logout.svg" alt="logout" />

       </li>
    );
};

export default Logout;