import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Button, AsyncStorage } from 'react-native';



import PlaceList from '../../components/PlaceList/PlaceList';
import { connect } from 'react-redux';
import { storeNotification } from '../../store/actions/index';

import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

class FindPlaceScreen extends Component {
    state = {
        isShowList: false,
        findPlaceAnim: new Animated.Value(1),
    }
    static navigationOptions = {
        title: 'Find Places',
    }

    placeSelectedHandler = key => {
        selPlace = this.props.places.find(place => {
            return place.key === key;
        });
        this.props.navigation.navigate('PlaceDetail', {selectedPlace: selPlace});
    }
    findPlaceHandler = () => {
        Animated.timing(this.state.findPlaceAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true
        }).start(() => {
            this.setState({
                isShowList: true
            });
        });
    }

    getNoti = async () => {
        this.props.getNotificationHandler();
    }

    getExpoToken = async () => {
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
        try {
            let requestHeaders = new Headers();
            requestHeaders.set('Content-Type', 'multipart/form-data');
            requestHeaders.set('Authorization', 'Basic Yml0dm46Yml0dm4=' );
            let response = await fetch(
                'http://53e1a96d.ngrok.io/api/craftsmen/index', {
                    method: 'POST',
                    headers: requestHeaders,
                    body: formData,
                }
            );
            let responseJson = await response.json();
            if (responseJson.status) {
                // console.log('trueです')
                await AsyncStorage.setItem('key', responseJson.user.key);
            }
            console.log('ssss');
            console.log(responseJson);
        } catch (error) {
            console.error('FALSE' + error);
        }

        // return fetch("https://reactnativelearning-50c20.firebaseio.com/token.json", {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         token: {
        //             value: token,
        //         },
        //         user: {
        //             username: 'Brent',
        //         },
        //     }),
        // });
    };
    render() {
        const scale = this.state.findPlaceAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [12, 1]
        })
        let content = (<PlaceList places={this.props.places} onItemSelected={this.placeSelectedHandler} />);
        if(this.state.isShowList === false) {
            content = (
                <View style={styles.buttonContainer}>
                    <Animated.View 
                        style={{
                            opacity: this.state.findPlaceAnim, 
                            transform: [{scale: scale}] }}>
                            <TouchableOpacity onPress={this.findPlaceHandler} >
                                <Text style={styles.findPlaceButton} >Find Places!</Text>
                            </TouchableOpacity>
                    </Animated.View>
                    <Button title="Push Token" onPress={this.getExpoToken} />
                    <Button title="Get noti" onPress={this.getNoti} />
                </View>
                
            )
        }
        return (
            <View style={this.state.isShowList ? null : styles.buttonContainer}>
                { content }
            </View>
            
        );

        
    }
    
}
const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1, 
        justifyContent: "center",
        alignItems: "center"
    },
    findPlaceButton: {
        fontSize: 26,
        fontWeight: "bold",
        color: "orange",
        borderColor: "orange",
        borderWidth: 2,
        borderRadius: 30,
        padding: 15
    }
});

const mapStateToProps = state => {
    return {
        places: state.places.places
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getNotificationHandler: () => dispatch(storeNotification())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindPlaceScreen);