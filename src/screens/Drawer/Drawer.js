import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Drawer extends Component {
    static navigationOptions = {
        title: 'Find Places',
    }
    render() {
        return (
            <View style={styles.findPlaceContainer}>
                <Text>Drawer Navigator</Text>
            </View>
        );
    }
    
}
const styles = StyleSheet.create({
    findPlaceContainer: {
        paddingTop: 30
    } 
});

export default Drawer;