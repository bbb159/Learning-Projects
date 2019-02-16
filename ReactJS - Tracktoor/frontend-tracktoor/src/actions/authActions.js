import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER } from './types';

export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export const login = (data) => {
    return dispatch => {
        return axios.post('http://localhost:5000/login', data).then(res => {
            const token = res.headers.authorization;
            localStorage.setItem('jwtToken', token);
            localStorage.setItem('UserDetail', res.data);
            setAuthorizationToken(token);
            dispatch(setCurrentUser(res.data));
        });
    };
}

export const logout = () => {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('UserDetail');
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    }
}