import { ADD_PLACE, DELETE_PLACE, SELECT_PLACE, DESELECT_PLACE } from './actionTypes';
import placeImage from '../../assets/wallhaven.jpg';

export const addPlace = (placeName) => {
    return {
        type: ADD_PLACE,
        placeName: placeName,
        placeImage: placeImage
    };
};

export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    };
};