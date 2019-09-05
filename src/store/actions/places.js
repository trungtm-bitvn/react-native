import {ADD_PLACE, DELETE_PLACE, LOGOUT} from './actionTypes';

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        const placeData = {
            name: placeName,
            location: location
        }
        fetch("https://reactnativelearning-50c20.firebaseio.com/places.json", {
            method: "POST",
            body: JSON.stringify(placeData)
        })
        .catch(err => console.log(err))
        .then(res => res.json())
        .then(parsedData => {
            console.log(parsedData);
        })
        ;
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