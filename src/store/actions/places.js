import {ADD_PLACE, DELETE_PLACE, LOGOUT} from './actionTypes';

export const addPlace = (placeName) => {
    return {
        type: ADD_PLACE,
        placeName: placeName
    }
}

export const deletePlace = (placeKey) => {
    return {
        type: DELETE_PLACE,
        placeKey: placeKey
    }
}

export const logout = () => {
    return {
        type: LOGOUT,
    }
}