import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import placeReducer from './reducers/places';
import notificationReducer from './reducers/notification';

const rootReducer = combineReducers({
    places: placeReducer,
    notifications: notificationReducer
});

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
}

export default configureStore;