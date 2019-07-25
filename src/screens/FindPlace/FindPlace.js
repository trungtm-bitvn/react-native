import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class FindPlaceScreen extends Component {
    render() {
        return (
            <View style={styles.findPlaceContainer}>
                <Text>On FindPlaceScreen</Text>
            </View>
        );
    }
    
}
const styles = StyleSheet.create({
    findPlaceContainer: {
        marginTop: 30
    } 
});
export default FindPlaceScreen;