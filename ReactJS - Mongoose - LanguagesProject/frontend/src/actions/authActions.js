import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';
import { SET_CURRENT_USER } from './types';

import { Auth } from 'aws-amplify';

export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export const login = (username, password) => {
    return dispatch => {
        return Auth.signIn(username, password)
            .then(res => {
                const token = res.signInUserSession.idToken.jwtToken;
                setAuthorizationToken(token);
                const decodedToken = jwt.decode(token);
                const infoToSave = {
                    username: decodedToken.sub,
                    email: decodedToken.email,
                    name: decodedToken.name,
                    address: decodedToken.address.formatted
                }
                dispatch(setCurrentUser(infoToSave));
            });
    }
}

export const signup = (userData) => {
    return dispatch => {
        return Auth.signUp({
            username: userData.email,
            password: userData.password,
            attributes: {
                name: userData.name,
                address: userData.password
            }
        });
    }
}

export const confirmSignUp = (email, confirmationCode) => {
    return dispatch => {
        return Auth.confirmSignUp(email, confirmationCode);
    }
}

export const logout = () => {
    return dispatch => {
        Auth.signOut();
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    }
}