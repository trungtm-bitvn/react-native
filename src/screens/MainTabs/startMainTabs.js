import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import React from 'react';

import SharePlaceScreen from '../SharePlace/SharePlace';
import FindPlaceScreen from '../FindPlace/FindPlace';
import PlaceDetailScreen from '../PlaceDetail/PlaceDetail';

const FindPlaceStack = createStackNavigator(
    {
        FindPlace: {
            screen: FindPlaceScreen,
        },
        PlaceDetail: {
            screen: PlaceDetailScreen
        }
    },
    {
        initialRouteName: 'FindPlace',
    }
);

const startMainTabs = createBottomTabNavigator(
    {
        SharePlace: {
            screen: SharePlaceScreen
        },
        FindPlaceStack: {
            screen: FindPlaceStack,
        }
    },
    {
        initialRouteName: 'SharePlace',
    }
);

export default startMainTabs;



