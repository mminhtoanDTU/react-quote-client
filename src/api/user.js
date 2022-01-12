import axios from 'axios';
import { URL } from './index';

export const loginRequest = (payload) => axios.post(`${URL}/auth/login`, payload);
export const registerRequest = (payload) => axios.post(`${URL}/auth/register`, payload);
export const currentUser = (payload) => {
    return axios.get(`${URL}/auth`, { headers: { Authorization: `Bearer ${payload}` } });
};

export const userInfoRequest = (payload) => axios.get(`${URL}/users/${payload}`);
export const updateUser = (payload) =>
    axios.put(`${URL}/users/${payload.config.userId}`, payload.data, {
        headers: { Authorization: `Bearer ${payload.config.token}` },
    });
