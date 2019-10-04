import {
  GET_NOTI_INFO,
  CLEAR_NOTI_INFO,
  UPDATE_NOTI_INFO
} from "../actions/actionTypes";

const initialState = {
  notifications: {
    total: "0",
    chat: {
      count: "0",
      list: []
    },
    plan: {
      count: "0",
      list: []
    },
    latest: {}
  }
};

const maxState = "99+";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTI_INFO:
      return {
        ...state,
        notifications: action.notifications
      };
    case CLEAR_NOTI_INFO:
      const key = action.key;
      const id = action.id;
      if (key in state.notifications) {
        if(key === 'total') {
          return {
            notifications: {
              ...state.notifications,
              total: "0"
            }
          }; 
        }
        return {
          notifications: {
            ...state.notifications,
            [key]: {
              count: "0",
              list: state.notifications[key].list.filter((list_item) => list_item.id !== id)
            }
          }
        };
      }
    case UPDATE_NOTI_INFO:
      let count = maxState;
      let total = maxState;
      const updateKey = action.key;
      if (
        updateKey in state.notifications &&
        state.notifications[updateKey].count !== "0"
      ) {
        if (
          state.notifications[updateKey].count !== "99" ||
          state.notifications[updateKey].count !== maxState
        ) {
          count = (parseInt(state.notifications[updateKey].count) + 1).toString();
          total = (parseInt(state.notifications.total) + 1).toString();
        }
        return {
          notifications: {
            ...state.notifications,
            total: total,
            [updateKey]: {
              count: count,
              list: state.notifications[updateKey].list.unshift(action.latest)
            },
            latest: action.latest
          }
        };
      }
    default:
      return state;
  }
};

export default reducer;
