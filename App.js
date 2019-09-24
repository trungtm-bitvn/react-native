import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import AuthScreen from './src/screens/Auth/Auth';
import MainScreen from './src/screens/MainTabs/startMainTabs';

import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';



const AppNavigator = createSwitchNavigator(
  {
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
    initialRouteName: "Auth"
  }
);

const AppContainer = createAppContainer(AppNavigator);

const store = configureStore();

const getNotifications = async () => {
  
}

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <AppContainer/>
      </Provider>
    );
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