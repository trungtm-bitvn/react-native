import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import React, { Component } from 'react';

import AuthScreen from './src/screens/Auth/Auth';
import MainScreen from './src/screens/MainTabs/startMainTabs';

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

export default class App extends Component {
  render() {
    return <AppContainer/>;
  }
}