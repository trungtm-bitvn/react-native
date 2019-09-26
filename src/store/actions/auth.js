import {TRY_AUTH} from './actionTypes';
import { AsyncStorage } from "react-native"; 
import { getNotification } from "./index";

import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

export const tryAuth = authData => {
    return async dispatch => {
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;

        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== "granted") {
            // Android remote notification permissions are granted during the app
            // install, so this will only ask on iOS
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        // Stop here if the user did not grant permissions
        if (finalStatus !== "granted") {
            return;
        }

        // Get the token that uniquely identifies this device
        let token = await Notifications.getExpoPushTokenAsync();
        let formData = new FormData();
        formData.append('tel', '111');
        formData.append('login_pass', '111');
        formData.append('expo_push_token', token);
        let requestHeaders = new Headers();
        requestHeaders.set('Content-Type', 'multipart/form-data');
        requestHeaders.set('Authorization', 'Basic Yml0dm46Yml0dm4=');
        fetch(
            'http://c6db1e9d.ngrok.io/api/craftsmen/index', {
                method: 'POST',
                headers: requestHeaders,
                body: formData,
            }
        )
        .then(res => res.json())
        .then(parsedRes => {
            console.log('ssss');
            console.log(responseJson);
            AsyncStorage.setItem('key', responseJson.user.key)
        })
        .then(
            dispatch(getNotification())
        )
        .catch(err => console.log('FALSE ' + err))
    };
}