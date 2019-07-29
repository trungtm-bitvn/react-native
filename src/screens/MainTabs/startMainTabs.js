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
    } else if (routeName === 'FindPlaceStack') {
        iconName = 'map-search';
    }

    return <IconComponent name={iconName} size={30} color={tintColor} />
}

const FindPlaceStack = createStackNavigator(
    {
        FindPlace: {
            screen: FindPlaceScreen,
        },
        PlaceDetail: {
            screen: PlaceDetailScreen, 
        }
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
            }
        }
    },
    {
        initialRouteName: 'SharePlace',
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, tintColor}) => getTabBarIcon(navigation, focused, tintColor),
        }),
        tabBarOptions: {
            // activeTintColor: '#008000',
            // inactiveTintColor: 'gray'
        }
    }
);

export default startMainTabs;



