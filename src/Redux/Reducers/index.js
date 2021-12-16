import { combineReducers } from "redux";
import auth from "./auth";
import forums from "./forums";
import comments from "./comments";
import error from "./error";

export default combineReducers({ auth, forums, comments, error });
