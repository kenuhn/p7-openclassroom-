import {
    DELETE_COMMENT,
    DELETE_POST,
    GET_POSTS,
  } from "../actions/post-actions";
  
  const initialState = {};
  
  export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
          return action.payload;
          case DELETE_POST:
            return state.filter((post) => post.id !== action.payload.postID)
          case DELETE_COMMENT:
              return state.payload
            default: 
            return state
     }
    }