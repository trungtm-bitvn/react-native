import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import React from 'react';

import SharePlaceScreen from '../SharePlace/SharePlace';
import FindPlaceScreen from '../FindPlace/FindPlace';
import PlaceDetailScreen from '../PlaceDetail/PlaceDetail';

import { MaterialCommunityIcons } from '@expo/vector-icons';

const getTabBarIcon = (navigation, focused, tintColor) => {
    const { routeName } = navigation.state;
    let IconComponent = MaterialCommunityIcons;
    let iconName;
    if (routeName === 'SharePlace') {
        iconName = 'share';
    } else if (routeName === 'FindPlace') {
        iconName = 'map-search';
    }

    return <IconComponent name={iconName} size={30} color={tintColor} />
}

const tabStack = createBottomTabNavigator(
    {
        SharePlace: {
            screen: SharePlaceScreen,
        },
        FindPlace: {
            screen: FindPlaceScreen
        }
    },
    {
        initialRouteName: 'SharePlace',
        // backBehavior: 'history',
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, tintColor}) => getTabBarIcon(navigation, focused, tintColor),
        }),
        tabBarOptions: {
            // activeTintColor: '#008000',
            // inactiveTintColor: 'gray'
        }
    }
);

const startMainTabs = createStackNavigator(
    {
        Tabs: {
            screen: tabStack,
            navigationOptions: {
                header: null
            }
        },
        PlaceDetail: {
            screen: PlaceDetailScreen, 
        }
    },
    {
        initialRouteName: 'Tabs',
    }
);

export default startMainTabs;



