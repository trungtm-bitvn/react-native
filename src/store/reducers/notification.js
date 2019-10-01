import {
  GET_NOTI_INFO,
  CLEAR_NOTI_INFO,
  UPDATE_NOTI_INFO
} from "../actions/actionTypes";

const initialState = {
  notifications: {
    total: "",
    chat: "",
    plan: "",
    list: []
  }
};

const maxState = "99+";

const reducer = (state = initialState, action) => {
  console.log("check action");
  console.log(action);
  switch (action.type) {
    case GET_NOTI_INFO:
      return {
        ...state,
        notifications: action.notifications
      };
    case CLEAR_NOTI_INFO:
      const key = action.key
      if (key in state.notifications) {
        return {
          notifications: {
            ...state.notifications,
            [key]: ""
          }
        };
      }
    case UPDATE_NOTI_INFO:
        let count = maxState;
        let total = maxState;
        const updateKey = action.key;
      if (
        updateKey in state.notifications &&
        state.notifications[updateKey] !== ""
        ) {
        if (
          state.notifications[updateKey] !== "99" ||
          state.notifications[updateKey] !== maxState
        ) {
            count = (parseInt(state.notifications[updateKey]) + 1).toString();
            total = (parseInt(state.notifications.total) + 1).toString();
        }
        return {
            notifications: {
                ...state.notifications,
                [updateKey]: count,
                total: total
            }
        };
      }
    default:
      return state;
  }
};

export default reducer;
