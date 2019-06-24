import { combineReducers } from "redux";
import imageReducer from './imageReducer';
import authReducer from './authReducer';

export const reducers = combineReducers({
    image: imageReducer,
    auth: authReducer
});
