import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import placeReducer from './reducers/places';
import notificationReducer from './reducers/notification';
import appInfoReducer from './reducers/appInfo';

const rootReducer = combineReducers({
    places: placeReducer,
    notifications: notificationReducer,
    appInfo: appInfoReducer
});

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
}

export default configureStore;