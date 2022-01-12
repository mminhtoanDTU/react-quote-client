import { takeLatest } from 'redux-saga/effects';
import * as actions from '../actions';
import { checkUserToken, fetchUserRequest, loginRequest, registerRequest, updateUserSaga } from './auth';
import {
    createPostSaga, deletePostSaga, fetchPostsSaga,
    fetchPostsWithUidSaga, updatePostSaga
} from './posts';



//take event action
function* mySaga() {
    yield takeLatest(actions.checkUserToken, checkUserToken);
    yield takeLatest(actions.authUser.loginRequest, loginRequest);
    yield takeLatest(actions.authUser.registerRequest, registerRequest);

    yield takeLatest(actions.getPosts.getPostsRequest, fetchPostsSaga);
    yield takeLatest(actions.getPosts.getPostsRequestWithUid, fetchPostsWithUidSaga);
    yield takeLatest(actions.createPost.createPostRequest, createPostSaga);
    yield takeLatest(actions.updatePost.updatePostRequest, updatePostSaga);
    yield takeLatest(actions.deletePost.deletePostRequest, deletePostSaga);

    yield takeLatest(actions.userInfo.getUserInfoRequest, fetchUserRequest);
    yield takeLatest(actions.updateUser.updateUserRequest, updateUserSaga);
}

export default mySaga;