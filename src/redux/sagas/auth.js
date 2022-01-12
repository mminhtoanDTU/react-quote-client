import { call, put } from '@redux-saga/core/effects';
import * as api from '../../api';
import * as actions from '../actions';

export function* checkUserToken(action) {
    try {
        const token = localStorage.getItem('_token');
        const user = yield call(api.currentUser, token);

        yield put(actions.authUser.authSuccess(user.data.data.user));
    } catch (error) {
        console.log(error);
    }
}

export function* loginRequest(action) {
    try {
        const user = yield call(api.loginRequest, action.payload);
        const { token, userName, userId } = user.data.data;

        localStorage.setItem('_token', token);

        yield put(actions.authUser.authSuccess({ userName, userId }));
    } catch (error) {
        console.log(error);
        yield put(actions.authUser.authFailure(error.response.data.message));
    }
}

export function* registerRequest(action) {
    try {
        const user = yield call(api.registerRequest, action.payload);
        const { token, userName, userId } = user.data.data;

        localStorage.setItem('_token', token);

        yield put(actions.authUser.authSuccess({ userName, userId }));
    } catch (error) {
        console.log(error);
        yield put(actions.authUser.authFailure(error.response.data.message));
    }
}

export function* fetchUserRequest(action) {
    try {
        const user = yield call(api.userInfoRequest, action.payload);

        yield put(actions.userInfo.getUserInfoSuccess(user.data.data));
    } catch (error) {
        console.log(error);
        yield put(actions.userInfo.getUserInfoError(error));
    }
}

export function* updateUserSaga(action) {
    try {
        const token = localStorage.getItem('_token' || '');
        const { userId, ...rest } = action.payload;
        const user = yield call(api.updateUser, {
            config: {
                userId,
                token,
            },
            data: { ...rest },
        });

        console.log(user);
        yield put(actions.updateUser.updateUserSuccess(user.data.data.user));
    } catch (error) {
        console.log(error);
    }
}
