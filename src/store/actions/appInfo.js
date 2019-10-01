import { UPDATE_APP_INFO } from "./actionTypes";


export const updateAppInfo = (info) => {
  return {
    type: UPDATE_APP_INFO,
    appInfo: info
  };
};
