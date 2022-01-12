import { INIT_STATE } from '../../constant';
import { getType } from '../actions';
import * as actions from '../actions';

export default function userReducers(state = INIT_STATE.user, action) {
    switch (action.type) {
        case getType(actions.userInfo.getUserInfoRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(actions.userInfo.getUserInfoSuccess):
            return {
                ...state,
                isLoading: false,
                ...action.payload,
            };
        // Them update nua
        case getType(actions.updateUser.updateUserRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(actions.updateUser.updateUserSuccess):
            return {
                ...state,
                isLoading: false,
                ...action.payload,
            };
        default:
            return state;
    }
}
