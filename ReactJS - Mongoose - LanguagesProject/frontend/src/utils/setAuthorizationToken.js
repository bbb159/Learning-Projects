import axios from 'axios';

export default function setAuthorizationToken(token) {
    const instance = axios.create({
        baseURL: 'http://localhost:5000/'
    });
    if (token) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        instance.defaults.headers.delete['Authorization'];
    }
}
