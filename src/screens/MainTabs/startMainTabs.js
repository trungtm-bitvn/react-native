import { createBottomTabNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import SharePlaceScreen from '../SharePlace/SharePlace';
import FindPlaceScreen from '../FindPlace/FindPlace';
import PlaceDetailScreen from '../PlaceDetail/PlaceDetail';
import DrawerScreen from '../Drawer/Drawer';

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

const Tabs = createBottomTabNavigator(
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

const Stacks = createStackNavigator (
    {
        Tabs: {
            screen: Tabs,
        },
        PlaceDetail: {
            screen: PlaceDetailScreen, 
        }
    },
    {
        initialRouteName: 'Tabs',
        defaultNavigationOptions: ({ navigation }) => {
            return ({
                headerRight: <TouchableOpacity onPress={() => {navigation.openDrawer()} }><MaterialCommunityIcons name='hamburger' size={30} color='black' /></TouchableOpacity>,
                title: 'Tabs Navigation'
            })
            
        }
    }
);

const startMainTabs = createDrawerNavigator(
    {
        Stacks: {
            screen: Stacks,
        },
    },
    {
        contentComponent: props => <DrawerScreen {...props} />,
        drawerPosition: 'right'
    }
);

export default startMainTabs;



