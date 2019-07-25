import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class SharePlaceScreen extends Component {
    render() {
        return (
            <View style={styles.sharePlaceContainer}>
                <Text>On SharePlaceScreen</Text>
            </View>
    )}
}
const styles = StyleSheet.create({
    sharePlaceContainer: {
        marginTop: 30
    } 
});
export default SharePlaceScreen;