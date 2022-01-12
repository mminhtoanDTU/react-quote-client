import axios from 'axios';
import { URL } from './index';

export const fetchPost = () => axios.get(`${URL}/posts`);
export const fetchPostWithUid = (uid) => axios.get(`${URL}/posts/${uid}`);

export const createPost = (payload) =>
    axios.post(`${URL}/posts`, payload.data, {
        headers: { Authorization: `Bearer ${payload.token}` },
    });
export const updatePost = (payload) =>
    axios.put(`${URL}/posts/${payload.config._id}`, payload.data, {
        headers: { Authorization: `Bearer ${payload.config.token}` },
    });
export const deletePost = (payload) =>
    axios.delete(`${URL}/posts/${payload.postId}`, {
        headers: { Authorization: `Bearer ${payload.token}` },
    });
