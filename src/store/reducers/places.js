import { ADD_PLACE, DELETE_PLACE, LOGOUT } from '../actions/actionTypes';

const initialState = {
    places: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            return {
                ...state,
                places: state.places.concat({
                    key: Math.random().toString(),
                    name: action.placeName,
                    location: action.location,
                    image: action.image
                })
            };
        case DELETE_PLACE:
            return {
                ...state,
                places: state.places.filter(place => {
                    return place.key !== action.placeKey;
                })
            };
        case LOGOUT:
            return {
                places: []
            };
        default:
            return state;
    }
};

export default reducer;