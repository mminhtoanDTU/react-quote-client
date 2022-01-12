import { combineReducers } from "redux";
import posts from './posts';
import modal from './modal';
import auth from './auth';
import user from './user';

export default combineReducers({
    posts,
    modal,
    auth,
    user
})