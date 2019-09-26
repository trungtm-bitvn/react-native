import { STORE_NOTI_INFO } from "./actionTypes";
import  { AsyncStorage } from 'react-native';

export const storeNotification = () => {
    return async dispatch => {
        const userToken = await AsyncStorage.getItem('key');
        console.log(userToken);
        let requestHeaders = new Headers();
        requestHeaders.set("X-API-KEY", userToken);
        requestHeaders.set('Authorization', 'Basic Yml0dm46Yml0dm4=' );
        fetch(
            'http://53e1a96d.ngrok.io/api/sites/get_notification', {
                method: 'POST',
                headers: requestHeaders,
            }
        )
        .then(res => res.json())
        .then(parsedRes => {
            console.log('response notification')
            console.log(parsedRes.noti);
            dispatch({
                type: STORE_NOTI_INFO, 
                notifications: parsedRes.noti
            })
        });
    };
}