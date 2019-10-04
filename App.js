import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import React, { Component } from 'react';
import { View, StyleSheet, AppState } from 'react-native';

import AuthLoadingScreen from './src/screens/AuthLoading/AuthLoading';
import AuthScreen from './src/screens/Auth/Auth';
import MainScreen from './src/screens/MainTabs/startMainTabs';

import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';

import { showLatestNotification } from './src/store/actions/index';



const AppNavigator = createSwitchNavigator(
  {

    AuthLoading: {
      screen: AuthLoadingScreen, 
    },
    Auth: {
      screen: AuthScreen, 
      navigationOptions: ({navigation}) => ({
        title: 'Authentication'
      }),
    },
    Main: {
      screen: MainScreen 
    }
  },
  {
    initialRouteName: "AuthLoading"
  }
);

const AppContainer = createAppContainer(AppNavigator);

const store = configureStore();


export default class App extends Component {
  state = {
    appState: AppState.currentState,
  };
  render() {
    return (
      <Provider store={store}>
          <AppContainer/>
      </Provider>
    );
  }

  _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      isOpened = store.getState().appInfo.appInfo.isOpened;
      latestNotification = store.getState().notifications.notifications.latest;
      console.log('Is isOpened init ' + isOpened);
      store.dispatch(showLatestNotification(latestNotification, isOpened));
    }
    this.setState({appState: nextAppState});
  };

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 30,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start"
  }
});