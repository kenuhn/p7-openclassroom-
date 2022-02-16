import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProfil } from '../actions/user-actions';
import Axios from 'axios';
import cookie from "js-cookie";



const DeleteProfil = () => {

    const userData = useSelector((state) => state.UserReducer)
    const disptach = useDispatch()
    const deleteOne = () => {
        disptach(deleteProfil(userData.id))
    }
    const removeCookie = (key) => {
        if (window !== "undefined") {
            cookie.remove(key, { expires: 1 })
        }
    }

    const logout = async () => {

        await Axios({
            method: "get",
            url: "http://localhost:5050/api/logout",
            withCredentials: true,

        })
            .then(() => removeCookie('jwt'))
            .catch((err) => console.log(err))

        window.location = "/home"
    }
    return (
        <button onClick={() => {
            if (window.confirm('voulez-vous supprimer cet article')) {
                deleteOne()
                logout()

            }
        }
        }>
            supprimer votre compte
        </button>
    );
};

export default DeleteProfil;