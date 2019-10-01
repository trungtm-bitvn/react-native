import { UPDATE_APP_INFO } from "../actions/actionTypes";

const initialState = {
  appInfo: {
    isOpened: false
  }
};

const reducer = (state = initialState, action) => {
  console.log("AppInfo");
  console.log("check action");
  console.log(action);
  switch (action.type) {
    case UPDATE_APP_INFO:
        return {
          appInfo: action.appInfo
        }
    default:
      return state;
  }
};

export default reducer;
