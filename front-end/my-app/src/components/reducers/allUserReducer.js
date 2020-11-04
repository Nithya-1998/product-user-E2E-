import { ALL_USERS, LOGGED_IN } from '../actions/actions';
const allUserReducer = (state = [], action) => {
    // console.log(action);
    switch (action.type) {
        case ALL_USERS:
            let allUser = action.payload;
            console.log(allUser)
            return action.payload;
        case LOGGED_IN:
            console.log(action.payload);
            return true;
        default:
            break;
    }
    return state;
}
export default allUserReducer;