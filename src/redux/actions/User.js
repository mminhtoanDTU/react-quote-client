import { createAction, createActions } from 'redux-actions';


export const authUser = createActions({
    loginRequest: (payload) => payload,
    registerRequest: (payload) => payload,
    authSuccess: (payload) => payload,
    authFailure: (err) => err
});

export const userInfo = createActions({
    getUserInfoRequest: (uid) => uid,
    getUserInfoSuccess: (payload) => payload,
    getUserInfoFailure: (err) => err
});

export const updateUser = createActions({
    updateUserRequest: (payload) => payload,
    updateUserSuccess: (payload) => payload,
    updateUserFailure: (err) => err
})

export const checkUserToken = createAction("CHECK_USER_TOKEN");
export const logoutUser = createAction("LOGOUT_USER");