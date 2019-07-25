import { createBottomTabNavigator } from 'react-navigation';
import React from 'react';

import SharePlaceScreen from '../SharePlace/SharePlace';
import FindPlaceScreen from '../FindPlace/FindPlace';

import { MaterialCommunityIcons } from '@expo/vector-icons';
const startMainTabs = createBottomTabNavigator({
    SharePlace: {
        screen: SharePlaceScreen,
        navigationOptions: {
            title: 'Share Place',
            tabBarIcon: (<MaterialCommunityIcons name="share" size={30} />)  
        }
    },
    FindPlace: {
        screen: FindPlaceScreen,
        navigationOptions: {
            title: 'Find Place',
            tabBarIcon: (<MaterialCommunityIcons name="map-search" size={30} />)  
        }
    }
});

export default startMainTabs;



