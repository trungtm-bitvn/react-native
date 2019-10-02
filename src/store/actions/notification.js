import {
  GET_NOTI_INFO,
  CLEAR_NOTI_INFO,
  UPDATE_NOTI_INFO,
  SHOW_LATEST_NOTI
} from "./actionTypes";
import { AsyncStorage, Alert } from "react-native";

export const getNotification = () => {
  return async dispatch => {
    const userToken = await AsyncStorage.getItem("key");
    console.log(userToken);
    let requestHeaders = new Headers();
    requestHeaders.set("X-API-KEY", userToken);
    requestHeaders.set("Authorization", "Basic Yml0dm46Yml0dm4=");
    fetch("http://dc0b5041.ngrok.io/api/sites/get_notification", {
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

export const showLatestNotification = currentNotificationList => {
  return async dispatch => {
    const latestNotificationString = await AsyncStorage.getItem(
      "latestNotification",
      err => console.log(err)
    );
    
    let latestNotification = null;
    if(latestNotificationString !== null) {
      latestNotification = JSON.parse(latestNotificationString);
    }

    console.log('parse string');
    console.log(latestNotification);
    stateNewestNotification = null;
    if(currentNotificationList.length > 0) {
      stateNewestNotification = currentNotificationList[0]
    }

    if (stateNewestNotification === null) {
      return;
    }

    isShowAlert = false;
    if (latestNotification === null) {
      isShowAlert = true;
    } else if (
      parseInt(stateNewestNotification.id) > parseInt(latestNotification.id)
    ) {
      isShowAlert = true;
    }

    if (isShowAlert) {
      AsyncStorage.setItem(
        "latestNotification",
        JSON.stringify(stateNewestNotification)
      );
      Alert.alert(stateNewestNotification.title, stateNewestNotification.content, [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]);
      
    }
    return;
  };
};
