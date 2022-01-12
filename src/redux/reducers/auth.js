import { INIT_STATE } from "../../constant";
import { authUser, getType, logoutUser } from "../actions";



export default function authReducers(state = INIT_STATE.auth, action) {

    switch (action.type) {
        case getType(authUser.loginRequest):
            return {
                ...state,
                isLoading: true
            }
        case getType(authUser.authSuccess):
            return {
                ...state,
                isLoading: false,
                currentUser: action.payload.userName,
                userId: action.payload.userId,
                photoId: action.payload.photoId,
                errors: ''
            }
        case getType(authUser.authFailure):
            return {
                ...state,
                isLoading: false,
                errors: action.payload
            }
        case getType(logoutUser):
            return {
                ...state,
                currentUser: '',
                userId: '',
                photoId: ''
            }

        default:
            return state;
    }

}