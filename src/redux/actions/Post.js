import { createActions } from 'redux-actions';

export const getPosts = createActions({
    getPostsRequest: undefined,
    getPostsRequestWithUid: (uid) => uid,
    getPostsSuccess: (payload) => payload,
    getPostsFailure: (err) => err,
});
export const createPost = createActions({
    createPostRequest: (payload) => payload,
    createPostSuccess: (payload) => payload,
    createPostFailure: (err) => err,
});
export const updatePost = createActions({
    updatePostRequest: (payload) => payload,
    updatePostSuccess: (payload) => payload,
    updatePostFailure: (err) => err,
});

export const deletePost = createActions({
    deletePostRequest: undefined,
    deletePostSuccess: (message) => message,
    deletePostFailure: (err) => err,
});

export const actionPost = createActions({
    likePost: (payload) => payload,
    disLikePost: (payload) => payload,
    sharePost: undefined,
});
