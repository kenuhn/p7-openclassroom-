import Axios from "axios";
import authHeader from "../tknHeaders";

export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST"


//commentaire
export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";




export const getPosts = (num) => {
    return (dispatch) => {
      return Axios({
        method: "get",
        url: 'http://localhost:5050/api/home',
        num: num,
        headers: authHeader(),
      })
        .then((res) => {
         // const array = res.data.slice(0, num);
          //dispatch({ type: GET_POSTS, payload: array });
          dispatch({ type: GET_POSTS, payload: res.data });
        })
        .catch((err) => console.log(err));
    };
  };

  export const addPost = (data, id) => {
    return (dispatch) => {
        return Axios({
          method: "post",
          url: `http://localhost:5050/api/home/${id}`,
          data: data,
          headers: authHeader(),
        })
        .then((res) => {
          dispatch({ type: ADD_POST, payload: { id } });
        })
      };
  }

  export const addComment = (postID, texte, pseudoComm,) => {
    return (dispatch) => {
      return Axios({
        method: "post",
        url: `http://localhost:5050/api/home/${postID}/commentaires`,
        data: { texte, pseudoComm },
        headers: authHeader(),
      })
        .then((res) => {
          dispatch({ type: ADD_COMMENT, payload: { postID } });
        })
        .catch((err) => console.log(err));
    };
  };

  export const deletePost = (postID) => {
    return (dispatch) => {
      return Axios({
        method: "delete",
        url: `http://localhost:5050/api/post/${postID}`,
        headers: authHeader(),
      })
        .then((res) => {
          dispatch({ type: DELETE_POST, payload: { postID } });
        })
        .catch((err) => console.log(err));
    };
  }


  export const deleteCommentaire = (commentID) => {
    return (dispatch) => {
      return Axios({
        method: "delete",
        url: `http://localhost:5050/api/commentaires/${commentID}`,
        headers: authHeader(),
      })
      .then((res) => {
        dispatch({ type: DELETE_COMMENT, payload: { commentID } });
      })
      .catch((err) => console.log(err));
    }

  }


