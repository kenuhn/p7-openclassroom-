import Axios from "axios";
import authHeader from "../tknHeaders";
export const GET_USERS = "GET_USERS";

export const getUsers = () => {
  return (dispatch) => {
    return Axios({
      method: "get",
      url: `http://localhost:5050/api/user`,
      headers: authHeader()
  })
      .then((res) => {
        console.log(res)
        dispatch({ type: GET_USERS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};