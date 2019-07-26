import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import React from 'react';

import SharePlaceScreen from '../SharePlace/SharePlace';
import FindPlaceScreen from '../FindPlace/FindPlace';
import PlaceDetailScreen from '../PlaceDetail/PlaceDetail';

import { MaterialCommunityIcons } from '@expo/vector-icons';

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
            navigationOptions: {
                title: 'Find Places',
                tabBarIcon: (<MaterialCommunityIcons name="map-search" size={30} />)
            }
        }
    },
    {
        initialRouteName: 'SharePlace',
    }
);

export default startMainTabs;



