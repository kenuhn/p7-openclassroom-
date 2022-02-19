import Axios from "axios"
import authHeader from "../tknHeaders";


export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const GET_USER_ERRORS = "GET_USER_ERRORS"
export const DELETE_PROFIL = "DELETE_PROFIL";
export const getUser = (uid) => {
    return (dispatch) => {
        return Axios({
          method: "get",
          url:`http://localhost:5050/api/user/${uid}`,
          headers: authHeader()
        })
            .then((res) => {
                dispatch({ type: GET_USER, payload: res.data })
            })
            .catch((err) => console.log(err))
    }
}

export const uploadPicture = (data, id) => {
    return (dispatch) => {
      return Axios({
        method: "put",
        url: `http://localhost:5050/api/update/${id}`,
        data:data,
        headers: authHeader()
      })
        .then((res) => {
          if (res.data.errors) {
            dispatch({ type: GET_USER_ERRORS, payload: res.data.errors });
          } else {
            dispatch({ type: GET_USER_ERRORS, payload: "" });
            return Axios({
              method: "get",
              url: `http://localhost:5050/api/user/${id}`,
              headers: authHeader()
            })
              .then((res) => {
                dispatch({ type: UPLOAD_PICTURE, payload: res.data.imagesUrl });
              });
          }
        })
        .catch((err) => console.log(err));
    };
  };

  export const deleteProfil = (id) => {
    return (dispatch) => {
      return Axios({
        method: "delete",
        url: `http://localhost:5050/api/delete/${id}`,
        headers: authHeader(),
      })
        .then((res) => {
          dispatch({ type: DELETE_PROFIL, payload: { id } });
        })
        .catch((err) => console.log(err));
    };
  }