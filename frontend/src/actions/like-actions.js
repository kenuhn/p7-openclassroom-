import Axios from "axios";
export const GET_LIKES   = "GET_LIKES"


export const getLikes = () => {
    return (dispatch) => {
      return Axios
        .get('http://localhost:5050/api/home/like/')
        .then((res) => {
          dispatch({ type: GET_LIKES, payload: res.data });
        })
        .catch((err) => console.log(err));
    };
  };
