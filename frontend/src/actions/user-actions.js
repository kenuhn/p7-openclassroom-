import Axios from "axios"
export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const GET_USER_ERRORS = "GET_USER_ERRORS"
export const DELETE_PROFIL = "DELETE_PROFIL";
export const getUser = (uid) => {
    return (dispatch) => {
        return Axios
            .get(`http://localhost:5050/api/user/${uid}`)
            .then((res) => {
                dispatch({ type: GET_USER, payload: res.data })
            })
            .catch((err) => console.log(err))
    }
}

export const uploadPicture = (data, id) => {
    return (dispatch) => {
      return Axios
        .put(`http://localhost:5050/api/update/${id}`, data)
        .then((res) => {
          if (res.data.errors) {
            dispatch({ type: GET_USER_ERRORS, payload: res.data.errors });
          } else {
            dispatch({ type: GET_USER_ERRORS, payload: "" });
            return Axios
              .get(`http://localhost:5050/api/user/${id}`)
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
      })
        .then((res) => {
          dispatch({ type: DELETE_PROFIL, payload: { id } });
        })
        .catch((err) => console.log(err));
    };
  }