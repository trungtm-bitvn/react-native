import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


class AuthScreen extends Component {
    render() {
        return (
            <View style={styles.authContainer}>
                <Button title="Login" onPress={() => this.props.navigation.navigate('Main')} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    authContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
export default AuthScreen;