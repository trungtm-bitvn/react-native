import { GET_NOTI_INFO, CLEAR_NOTI_INFO, UPDATE_NOTI_INFO } from "./actionTypes";
import { AsyncStorage } from "react-native";

export const getNotification = () => {
  return async dispatch => {
    const userToken = await AsyncStorage.getItem("key");
    console.log(userToken);
    let requestHeaders = new Headers();
    requestHeaders.set("X-API-KEY", userToken);
    requestHeaders.set("Authorization", "Basic Yml0dm46Yml0dm4=");
    fetch("http://c6db1e9d.ngrok.io/api/sites/get_notification", {
      method: "POST",
      headers: requestHeaders
    })
      .then(res => res.json())
      .then(parsedRes => {
        console.log("response notification");
        console.log(parsedRes.noti);
        dispatch({
          type: GET_NOTI_INFO,
          notifications: parsedRes.noti
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const clearNotification = key => {
  return {
    type: CLEAR_NOTI_INFO,
    key: key
  };
};

export const increaseNotificationByOne = key => {
    return {
      type: UPDATE_NOTI_INFO,
      key: key
    };
  };
