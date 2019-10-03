import {
  GET_NOTI_INFO,
  CLEAR_NOTI_INFO,
  UPDATE_NOTI_INFO,
  SHOW_LATEST_NOTI,
  UPDATE_APP_INFO
} from "./actionTypes";
import { AsyncStorage, Alert } from "react-native";

export const getNotification = () => {
  return async dispatch => {
    const userToken = await AsyncStorage.getItem("key");
    console.log(userToken);
    let requestHeaders = new Headers();
    requestHeaders.set("X-API-KEY", userToken);
    requestHeaders.set("Authorization", "Basic Yml0dm46Yml0dm4=");
    return fetch("http://c2ba113e.ngrok.io/api/sites/get_notification", {
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

export const increaseNotificationByOne = (key, latest) => {
  return {
    type: UPDATE_NOTI_INFO,
    key: key,
    latest: latest
  };
};

export const showLatestNotification = (currentNotificationList, isOpened) => {
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
    stateNewestNotification = currentNotificationList;
    // if(currentNotificationList.length > 0) {
    //   stateNewestNotification = currentNotificationList[0]
    // }

    if (stateNewestNotification === null) {
      return;
    }
    console.log('newest notification');
    console.log(stateNewestNotification);
    newNotificationComes = false;
    if (latestNotification === null) {
      newNotificationComes = true;
    } else if (
      parseInt(stateNewestNotification.id) > parseInt(latestNotification.id)
    ) {
      newNotificationComes = true;
    }

    if (newNotificationComes) {
      AsyncStorage.setItem(
        "latestNotification",
        JSON.stringify(stateNewestNotification)
      );
      console.log('isOpened is notification action');
      console.log(isOpened)
      if(isOpened === false) {
        Alert.alert(stateNewestNotification.title, stateNewestNotification.content, [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]);
        return dispatch({
          type: UPDATE_APP_INFO,
          appInfo: {
            isOpened: true
          }
        })
      }
    }
    return ;
  };
};
