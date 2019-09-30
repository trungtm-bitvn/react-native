import {
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator
} from "react-navigation";
import React, { Component } from "react";
import { TouchableOpacity, Platform, View, StyleSheet } from "react-native";

import SharePlaceScreen from "../SharePlace/SharePlace";
import FindPlaceScreen from "../FindPlace/FindPlace";
import ModalScreen from "../Modal/Modal";
import PlaceDetailScreen from "../PlaceDetail/PlaceDetail";
import DrawerScreen from "../Drawer/Drawer";

import { connect } from 'react-redux';
import { clearNotification } from '../../store/actions/index';

import { Ionicons } from "@expo/vector-icons";
import { Badge } from "react-native-elements";

class MenuButton extends Component {
  render() {
    notification = this.props.notifications.total ? <Badge status="error" containerStyle={{ position: 'absolute', top: 2, left: 20 }}/> : null;
    return (
      <TouchableOpacity
            onPress={() => {
              this.props.navigation.openDrawer();
              this.props.clearNotificationHandler('total');
            }}
          >
            <View style={styles.drawerItemIcon}>
              <Ionicons
                name={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                size={30}
                color="black"
                style={styles.menuButton}
              />
              {notification}
            </View>
            
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => {
  return {
      notifications: state.notifications.notifications
  }
}

const mapDispatchToProps = dispatch => {
  return {
      clearNotificationHandler: key => dispatch(clearNotification(key))
  }
}
let MenuButtonContainer = connect(mapStateToProps, mapDispatchToProps)(MenuButton);

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === "SharePlace") {
    iconName = "share";
  } else if (routeName === "FindPlace") {
    iconName = "map";
  }
  iconName = Platform.OS === "android" ? "md-" + iconName : "ios-" + iconName;

  return <IconComponent name={iconName} size={30} color={tintColor} />;
};

const Tabs = createBottomTabNavigator(
  {
    FindPlace: {
      screen: FindPlaceScreen
    },
    SharePlace: {
      screen: SharePlaceScreen
    }
  },
  {
    initialRouteName: "FindPlace",
    // backBehavior: 'history',
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) =>
        getTabBarIcon(navigation, focused, tintColor)
    }),
    tabBarOptions: {
      // activeTintColor: '#008000',
      // inactiveTintColor: 'gray'
    }
  }
);


const Stacks = createStackNavigator(
  {
    Tabs: {
      screen: Tabs
    },
    PlaceDetail: {
      screen: PlaceDetailScreen
    }
  },
  {
    initialRouteName: "Tabs",
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerRight: (
          <MenuButtonContainer navigation={navigation}/>
        ),
        title: "Tabs Navigation"
      };
    }
  }
);

const startMainTabs = createDrawerNavigator(
  {
    Stacks: {
      screen: Stacks
    }, 
    Modal: {
      screen: ModalScreen
    }
  },
  {
    contentComponent: props => <DrawerScreen {...props} />,
    drawerPosition: "right"
  }
);
const styles = StyleSheet.create({
  menuButton: {
    marginRight: 15
  },
  drawerItemIcon: {
    flexDirection: "row"
}
});


export default startMainTabs;
