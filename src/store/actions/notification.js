import { STORE_NOTI_INFO } from "./actionTypes";
import  { AsyncStorage } from 'react-native';

export const storeNotification = () => {
    return async dispatch => {
        try {
            const userToken = await AsyncStorage.getItem('key');
            console.log(userToken);
            let requestHeaders = new Headers();
            requestHeaders.set("X-API-KEY", userToken);
            requestHeaders.set('Authorization', 'Basic Yml0dm46Yml0dm4=' );
            let response = await fetch(
                'http://72d220f2.ngrok.io/api/sites/get_notification', {
                    method: 'POST',
                    headers: requestHeaders,
                }
            );
            let responseJson = await response.json();
            console.log('response notification')
            console.log(responseJson.noti);

            return {
                type: STORE_NOTI_INFO, 
                notifications: responseJson.noti
            }
        } catch (error) {
            console.error('FALSE' + error);
        }
    };
}