import {
    DELETE_COMMENT,
    DELETE_POST,
    EDIT_COMMENT,
    GET_POSTS,
    GET_LIKES,
    UNLIKE_POST,
    UPDATE_POST,
  } from "../actions/post-actions";
  
  const initialState = {};
  
  export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
          return action.payload;
          case DELETE_POST:
            return state.filter((post) => post.id !== action.payload.postID)
            default: 
            return state
     }
    }