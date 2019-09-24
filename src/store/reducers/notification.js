import { STORE_NOTI_INFO } from "../actions/actionTypes";

const initialState = {
    notifications: {
        chat: {
            count: 0,
            contents: [] 
        },
        plan: {
            count: 0,
            contents: []
        }
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_NOTI_INFO:
            return {
                notifications: state.notifications
            }
        default:
            return state;
    }
}