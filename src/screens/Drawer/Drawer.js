import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { connect } from 'react-redux';
import { logout } from '../../store/actions/index'

import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

class Drawer extends Component {
    static navigationOptions = {
        title: 'Find Places',
    }

    // getExpoToken = async () => {
    //     const { status: existingStatus } = await Permissions.getAsync(
    //         Permissions.NOTIFICATIONS
    //     );
    //     let finalStatus = existingStatus;

    //     // only ask if permissions have not already been determined, because
    //     // iOS won't necessarily prompt the user a second time.
    //     if (existingStatus !== "granted") {
    //         // Android remote notification permissions are granted during the app
    //         // install, so this will only ask on iOS
    //         const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    //         finalStatus = status;
    //     }

    //     // Stop here if the user did not grant permissions
    //     if (finalStatus !== "granted") {
    //         return;
    //     }

    //     // Get the token that uniquely identifies this device
    //     let token = await Notifications.getExpoPushTokenAsync();

    //     return fetch("https://reactnativelearning-50c20.firebaseio.com/token.json", {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             token: {
    //                 value: token,
    //             },
    //             user: {
    //                 username: 'Brent',
    //             },
    //         }),
    //     });
    // };
    logout = () => {
        this.props.logoutHandler();
        this.props.navigation.navigate('Auth');
    }
    render() {
        return (
            <View style={styles.findPlaceContainer}>
                <TouchableOpacity onPress={this.logout}>
                    <View style={styles.drawerItem}>
                        <Ionicons name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"} size={30} color="#aaa" style={styles.drawerItemIcon}/>
                        <Text>Sign Out</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    // componentDidMount() {
    //     this.getExpoToken();
    // }
    
}

const styles = StyleSheet.create({
    findPlaceContainer: {
        paddingTop: 30
    }, 
    drawerItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#eee"
    },
    drawerItemIcon: {
        marginRight: 10
    }
});

const mapDispatchToProps = dispatch => {
    return {
        logoutHandler: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(Drawer);