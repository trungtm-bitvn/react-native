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
    return fetch("http://bfd235fb.ngrok.io/api/sites/get_notification", {
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

export const clearNotification = (key, id) => {
  return async dispatch => {
    let formData = new FormData();
    formData.append("notification_type", key);
    if (id) {
      formData.append("id", id);
    }
    dispatch({
      type: CLEAR_NOTI_INFO,
      key: key,
      id: id
    });
    if (key !== "total") {
      const userToken = await AsyncStorage.getItem("key");
      let requestHeaders = new Headers();
      console.log('clear notification action usertoken');
      console.log(userToken);
      requestHeaders.set("X-API-KEY", userToken);
      requestHeaders.set("Content-Type", "multipart/form-data");
      requestHeaders.set("Authorization", "Basic Yml0dm46Yml0dm4=");
      return fetch(
        "http://bfd235fb.ngrok.io/api/craftsmen/read_notification",
        {
          method: "POST",
          headers: requestHeaders,
          body: formData
        }
      )
        .then(res => res.json())
        .then(parsedRes => {
          console.log("response clear noti");
          console.log(parsedRes);
        })
        .catch(err => console.log("FALSE " + err));
    }
  };
};

export const increaseNotificationByOne = (key, latest) => {
  console.log("notificaiton action - increaseNotificationByOne");
  console.log("key " + key + " " + latest);
  return {
    type: UPDATE_NOTI_INFO,
    key: key,
    latest: {
      id: latest.id,
      title: latest.title,
      body: latest.body,
      notification_type: latest.notification_type
    }
  };
};

export const showLatestNotification = (currentNotificationList, isOpened) => {
  return async dispatch => {
    const latestNotificationString = await AsyncStorage.getItem(
      "latestNotification",
      err => console.log(err)
    );

    let latestNotification = null;
    if (latestNotificationString !== null) {
      latestNotification = JSON.parse(latestNotificationString);
    }

    stateNewestNotification = currentNotificationList;

    if (
      stateNewestNotification === null || 
      (Object.keys(stateNewestNotification).length === 0 &&
      stateNewestNotification.constructor === Object)
    ) {
      return;
    }
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
      if (isOpened === false) {
        Alert.alert(
          stateNewestNotification.title,
          stateNewestNotification.content,
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      }
    }
    return;
  };
};
