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
    if(notification.origin === 'selected') {
      console.log('start noti selected')
      this.props.updateAppInfo({isOpened: true});
    }
    else if(notification.origin === 'received' && 'notificationType' in notification.data) {
      notificationType = notification.data.notificationType
      this.props.increaseNotification(notificationType);
    }
  };

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("key");

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    if(userToken) {
      Notifications.addListener(this._handleNotification)
    } else {
      this.props.navigation.navigate("Auth");
    }
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
      increaseNotification: key => dispatch(increaseNotificationByOne(key))
  }
}

export default connect(null, mapDispatchToProps)(AuthLoadingScreen);


