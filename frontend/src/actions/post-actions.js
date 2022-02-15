import Axios from "axios";
export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const ADD_COMMENT = "ADD_COMMENT";



export const getPosts = (num) => {
    return (dispatch) => {
      return Axios
        .get('http://localhost:5050/api/home', num)
        .then((res) => {
         // const array = res.data.slice(0, num);
          //dispatch({ type: GET_POSTS, payload: array });
          dispatch({ type: GET_POSTS, payload: res.data });
        })
        .catch((err) => console.log(err));
    };
  };

  export const addPost = (data, id) => {
    return () => {
        return Axios({
          method: "post",
          url: `http://localhost:5050/api/home/${id}`,
          data: data,
        })
      };
  }

  export const addComment = (postID, texte, pseudoComm,) => {
    return (dispatch) => {
      return Axios({
        method: "post",
        url: `http://localhost:5050/api/home/${postID}/commentaires`,
        data: { texte, pseudoComm },
      })
        .then((res) => {
          dispatch({ type: ADD_COMMENT, payload: { postID } });
        })
        .catch((err) => console.log(err));
    };
  };



