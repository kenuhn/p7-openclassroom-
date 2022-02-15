import { GET_USER } from "../actions/user-actions";
import {UPLOAD_PICTURE} from "../actions/user-actions"
const initialState = {};


export default function UserReducer (state = initialState, action){
    switch(action.type){
        case GET_USER: 
            return  action.payload.data
        
    case UPLOAD_PICTURE:
      return {
        ...state,
        imagesUrl: action.payload.data,
      };
        default: 
            return state
    } 
}