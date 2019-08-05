import React, { Component } from "react";
import { View, Button, StyleSheet, ImageBackground } from "react-native";

import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import CustomButton from '../../components/UI/CustomButton/CustomButton'
import backgroundImage from '../../../assets/logo.jpg';


class AuthScreen extends Component {
  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.authContainer}>
          <MainText>
            <HeadingText>Please Log In</HeadingText>
          </MainText>
          <CustomButton onPress={() => {alert('sss')}} color="#9c4dcc">Switch to Login</CustomButton>
          <View style={styles.inputContainer}>
            <DefaultInput
              placeholder="Your Email Address"
              style={styles.input}
            />
            <DefaultInput placeholder="Password" style={styles.input} />
            <DefaultInput placeholder="Confirm Password" style={styles.input} />
          </View>
          <CustomButton onPress={() => {this.props.navigation.navigate('Main')}} color="#9c4dcc">Submit</CustomButton>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainer: {
    width: "80%"
  },
  input: {
    backgroundColor: "#eee",
    borderColor: "#bbb"
  }, 
  backgroundImage: {
      flex: 1,
      width: "100%",
      
  }
});
export default AuthScreen;
