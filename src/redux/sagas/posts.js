import { call, put } from 'redux-saga/effects';
import * as api from '../../api';
import * as actions from '../actions';



export function* fetchPostsSaga(action) {
    try {
        const posts = yield call(api.fetchPost);
        yield put(actions.getPosts.getPostsSuccess(posts.data.data.posts));
    } catch (err) {
        console.log(err);
        yield put(actions.getPosts.getPostsFailure(err));
    }
}

export function* fetchPostsWithUidSaga(action) {
    try {
        const posts = yield call(api.fetchPostWithUid, action.payload);
        yield put(actions.getPosts.getPostsSuccess(posts.data.data.posts));
    } catch (err) {
        console.log(err);
        yield put(actions.getPosts.getPostsFailure(err));
    }
}

export function* createPostSaga(action) {
    try {
        const token = localStorage.getItem('_token' || null);
        const post = yield call(api.createPost, { token: token, data: action.payload });

        yield put(actions.createPost.createPostSuccess(post.data.data.post));
    } catch (err) {
        console.log(err);
        yield put(actions.createPost.createPostFailure(err));
    }
}

export function* updatePostSaga(action) {
    try {
        const token = localStorage.getItem('_token' || '');
        const { _id, ...rest } = action.payload;

        const updatedPost = yield call(api.updatePost, {
            config: {
                _id,
                token
            },
            data: { ...rest }
        });
        yield put(actions.updatePost.updatePostSuccess(updatedPost.data.data.post));
    } catch (err) {
        console.log(err);
        yield put(actions.updatePost.updatePostFailure(err));
    }
}

export function* deletePostSaga(action) {
    try {
        const token = localStorage.getItem('_token' || '');
        yield call(api.deletePost, { postId: action.payload, token });
        yield put(actions.deletePost.deletePostSuccess(action.payload));
    } catch (error) {
        console.log(error)
        yield put(actions.deletePost.deletePostFailure(error))
    }
}
