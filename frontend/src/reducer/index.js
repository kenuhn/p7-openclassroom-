import { combineReducers } from "redux";
import UserReducer from "./user-reducer";
import postReducer from "./post-reducer";
import UsersReducer from "./users-reducer";
import likeReducer from "./like-reducer"
export default combineReducers({
    likeReducer,
    UsersReducer,
    UserReducer,
    postReducer,
})