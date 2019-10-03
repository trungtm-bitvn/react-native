import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform, AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from "react-native-elements";

import { connect } from 'react-redux';
import { logout, clearNotification } from '../../store/actions/index';


import { Notifications } from "expo";

class Drawer extends Component {
    static navigationOptions = {
        title: 'Find Places',
    }

    logout = async () => {
        // this.props.logoutHandler();
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }
    render() {
        console.log('state redux');
        console.log(this.props.notifications);
        let chatCount = null;
        let planCount = null;
        if(parseInt(this.props.notifications.chat.count) > 0) {
            chatCount = <Badge value={this.props.notifications.chat.count} status="error" containerStyle={{ position: 'absolute', top: -6, left: 15 }}/>
        }
        if(parseInt(this.props.notifications.plan.count) > 0) {
            planCount = <Badge value={this.props.notifications.plan.count} status="error" containerStyle={{ position: 'absolute', top: -6, left: 15 }}/>
        }
        return (
            <View style={styles.findPlaceContainer}>
                <TouchableOpacity onPress={this.logout}>
                    <View style={styles.drawerItem}>
                        <View style={styles.drawerItemIcon}>
                            <Ionicons name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"} size={30} color="#aaa"/>
                        </View>
                        <Text>Sign Out</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.clearNotificationHandler('chat')}>
                    <View style={styles.drawerItem}>
                        <View style={styles.drawerItemIcon}>
                            <Ionicons name={Platform.OS === "android" ? "md-chatboxes" : "ios-chatboxes"} size={30} color="#aaa"/>
                            {chatCount}
                        </View>
                        <Text>Message</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.clearNotificationHandler('plan')}>
                    <View style={styles.drawerItem}>
                        <View style={styles.drawerItemIcon}>
                            <Ionicons name={Platform.OS === "android" ? "md-airplane" : "ios-airplane"} size={30} color="#aaa"/>
                            {planCount}
                        </View>
                        <Text>Plan</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    componentDidMount() {
        if (Platform.OS === 'android') {
            Notifications.createChannelAndroidAsync('test-notification', {
              name: 'Test Notification',
              sound: true,
              priority: 'max',
              vibrate: [0, 250, 250, 250],
            });
        }
    }
    
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
        marginRight: 20,
        flexDirection: "row",
    },
    badgeNumber: {
        position: "absolute",
        right: -4
    }

});

const mapDispatchToProps = dispatch => {
    return {
        logoutHandler: () => dispatch(logout()),
        clearNotificationHandler: key => dispatch(clearNotification(key))
    }
}

const mapStateToProps = state => {
    return {
        notifications: state.notifications.notifications,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);