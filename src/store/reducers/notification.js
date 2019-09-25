import { STORE_NOTI_INFO } from "../actions/actionTypes";

const initialState = {
    notifications: {
        count: '',
        chat: '',
        plan: '',
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_NOTI_INFO:
            console.log('action log');
            console.log(action);
            return {
                ...state,
                notifications: action.notifications
            }
        default:
            return state;
    }
}


export default reducer;