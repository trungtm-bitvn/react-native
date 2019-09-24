import { STORE_NOTI_INFO } from "./actionTypes";
import  { AsyncStorage } from 'react-native';

export const storeNotification = () => {
    return async dispatch => {
        try {
            const userToken = await AsyncStorage.getItem('key');
            let requestHeaders = new Headers();
            requestHeaders.set("X-API-KEY", userToken);
            requestHeaders.set('Authorization', 'Basic Yml0dm46Yml0dm4=' );
            let response = await fetch(
                'http://3343c1ae.ngrok.io/api/craftsmen/get_notification', {
                    method: 'POST',
                    headers: requestHeaders,
                }
            );
            let responseJson = await response.json();
            console.log(responseJson);
        } catch (error) {
            console.error('FALSE' + error);
        }
    };
}