import { createStackNavigator, createAppContainer} from 'react-navigation';
import React, { Component } from 'react';

import AuthScreen from './src/screens/Auth/Auth';

const AppNavigator = createStackNavigator(
  {
    Auth: {
      screen: AuthScreen, 
      navigationOptions: ({navigation}) => ({
        title: 'Authentication'
      }),
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