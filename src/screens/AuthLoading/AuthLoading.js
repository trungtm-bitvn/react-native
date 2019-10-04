import React from "react";
import {
  ActivityIndicator,
  StatusBar,
  View,
  AsyncStorage,
  StyleSheet
} from "react-native";
import { Notifications } from "expo";
import { updateAppInfo, increaseNotificationByOne } from '../../store/actions/index';

import { connect } from 'react-redux';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _handleNotification = (notification) => {
    console.log('start noti event');
    console.log(notification);
    if(notification.origin === 'selected') {
      console.log('start noti selected')
      this.props.updateAppInfo({isOpened: true});
    }
    else if(notification.origin === 'received' && 'notification_type' in notification.data) {
      latestNoti = notification.data;
      console.log('latestNoti');
      console.log(notification.data);
      notification_type = latestNoti.notification_type

      this.props.increaseNotification(notification_type, latestNoti);
      console.log('increase notification result');
      console.log(this.props.notifications);
    }
  };

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("key");

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    Notifications.addListener(this._handleNotification);
  };

  
  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }

  async componentDidMount() {
    const userToken = await AsyncStorage.getItem("key");
    if(userToken) {
      this.props.navigation.navigate("Main");
    } else {
      this.props.navigation.navigate("Auth");
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapDispatchToProps = dispatch => {
  return {
      updateAppInfo: (appInfo) => dispatch(updateAppInfo(appInfo)),
      increaseNotification: (key, latest) => dispatch(increaseNotificationByOne(key, latest))
  }
}
const mapStateToProps = state => {
  return {
      places: state.places.places,
      notifications: state.notifications.notifications,
      appInfo: state.appInfo.appInfo
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);


