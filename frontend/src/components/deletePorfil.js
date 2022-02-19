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
    const removeTKN = (key) => {
        if (window !== "undefined") {
            localStorage.clear(key)
        }
    }

    const logout = async () => {

        removeTKN('user')
        window.location = "/connection"
    }
    return (
        <button onClick={() => {
            if (window.confirm('voulez-vous supprimer votre compte')) {
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