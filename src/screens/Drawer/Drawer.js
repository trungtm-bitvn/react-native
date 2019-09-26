import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Badge, withBadge } from "react-native-elements";

import { connect } from 'react-redux';
import { logout, storeNotification } from '../../store/actions/index';


import { Notifications } from "expo";

class Drawer extends Component {
    static navigationOptions = {
        title: 'Find Places',
    }

    logout = () => {
        this.props.logoutHandler();
        this.props.navigation.navigate('Auth');
    }
    render() {
        console.log('state redux');
        console.log(this.props.notifications);
        const BadgedIcon = withBadge(this.props.notifications.total? this.props.notifications.total : null, {right: -2, top: -4})(Ionicons)
        return (
            <View style={styles.findPlaceContainer}>
                <TouchableOpacity onPress={this.logout}>
                    <View style={styles.drawerItem}>
                        <BadgedIcon name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"} size={30} color="#aaa" style={styles.drawerItemIcon}/>
                        <Text>Sign Out</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.logout}>
                    <View style={styles.drawerItem}>
                        <Ionicons name={Platform.OS === "android" ? "md-chatboxes" : "ios-chatboxes"} size={30} color="#aaa" style={styles.drawerItemIcon}/>
                        <Text>Message</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.logout}>
                    <View style={styles.drawerItem}>
                        <Ionicons name={Platform.OS === "android" ? "md-airplane" : "ios-airplane"} size={30} color="#aaa" style={styles.drawerItemIcon}/>
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
        marginRight: 10
    }
});

const mapDispatchToProps = dispatch => {
    return {
        logoutHandler: () => dispatch(logout())
    }
}

const mapStateToProps = state => {
    return {
        notifications: state.notifications.notifications
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);