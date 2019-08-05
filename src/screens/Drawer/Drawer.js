import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { connect } from 'react-redux';
import { logout } from '../../store/actions/index'

class Drawer extends Component {
    static navigationOptions = {
        title: 'Find Places',
    }
    logout = () => {
        this.props.logoutHandler();
        this.props.navigation.navigate('Auth');
    }
    render() {
        return (
            <View style={styles.findPlaceContainer}>
                <TouchableOpacity onPress={this.logout}>
                    <View style={styles.drawerItem}>
                        <MaterialCommunityIcons name="logout-variant" size={30} color="#aaa" style={styles.drawerItemIcon}/>
                        <Text>Sign Out</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    findPlaceContainer: {
        paddingTop: 30
    }, 
    drawerItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#eee"
    },
    drawerItemIcon: {
        marginRight: 10
    }
});

const mapDispatchToProps = dispatch => {
    return {
        logoutHandler: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(Drawer);