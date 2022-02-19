import Axios from "axios";
import authHeader from "../tknHeaders";
export const GET_LIKES   = "GET_LIKES"


export const getLikes = () => {
    return (dispatch) => {
      return Axios({
        method: "get",
        url: 'http://localhost:5050/api/home/like/',
        headers: authHeader()
      })
        .then((res) => {
          dispatch({ type: GET_LIKES, payload: res.data });
        })
        .catch((err) => console.log(err));
    };
  };
