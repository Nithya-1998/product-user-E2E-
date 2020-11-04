import { combineReducers } from "redux";
import allUserReducer from "./allUserReducer";
import userNameReducer from "./nameReducer";
const allReducers = combineReducers({

    allUser: allUserReducer,
    userName: userNameReducer,
    isLoggedIn:allUserReducer
});
export default allReducers;