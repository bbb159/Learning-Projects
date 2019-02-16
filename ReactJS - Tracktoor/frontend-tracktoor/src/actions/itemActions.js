import axios from 'axios';
import { API_AUTH, URI } from './types';

export const getItens = (item) => {
    return dispatch => {
        return axios.get(URI + item + API_AUTH);
    }
}

export const getItensFiltered = (item, orderBy) => {
    return dispatch => {
        console.log(orderBy);
        return axios.get(URI + item + API_AUTH + '&orderBy=' + orderBy);
    }
}