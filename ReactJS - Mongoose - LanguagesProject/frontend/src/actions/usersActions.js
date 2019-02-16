import axios from 'axios';
import { GET_USERS, ADD_USER, DELETE_USER, USERS_LOADING, REGISTER_USER } from './types';

export const getUsers = () => dispatch => {
    axios 
        .get('http://localhost:5000/users/all')
        .then(res => 
            dispatch({
                type: GET_USERS,
                payload: res.data
            })
        )
        .catch(function (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
            console.log(error.config);
          });
};

export const registerUser = (user) => {
    axios 
        .post('http://localhost:5000/auth/signup', user)
        .then(res => 
            dispatch({
                type: REGISTER_USER,
                payload: res.data
            })
        )
        .catch(function (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
            console.log(error.config);
          });
}

export const deleteUser = (id) => {
    return {
        type: DELETE_USER,
        payload: id
    };
};

export const getUserGroups = (userId) => {
    return dispatch => {
        return axios.get('http://localhost:5000/users/' + userId + '/groups');
    }
}
