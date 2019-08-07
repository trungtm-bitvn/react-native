import React, { Component } from "react";
import { View, StyleSheet, ImageBackground, Dimensions } from "react-native";

import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import CustomButton from '../../components/UI/CustomButton/CustomButton'
import backgroundImage from '../../../assets/logo.jpg';


class AuthScreen extends Component {
  getDeviceDims = dims => dims.height > 500 ? 'portrait' : 'landscape'
  
  state = {
    deviceDims: this.getDeviceDims(Dimensions.get('window'))
  }
  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.deviceRotateHandler);
  }

  deviceRotateHandler = dims => {
    this.setState({
      deviceDims: this.getDeviceDims(dims.window)
    });
  }

  
  render() {
    headingContent = null
    if(this.state.deviceDims === "portrait") {
      headingContent = (
      <MainText>
        <HeadingText>Please Log In</HeadingText>
      </MainText>
      );
    }
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.authContainer}>
          {headingContent}
          <CustomButton onPress={() => {alert('sss')}} color="#9c4dcc">Switch to Login</CustomButton>
          <View style={styles.inputContainer}>
            <DefaultInput
              placeholder="Your Email Address"
              style={styles.input}
            />
            <View style={this.state.deviceDims === "portrait" ? styles.portraitPasswordContainer : styles.landscapePasswordContainer}>
              <View style={this.state.deviceDims === "portrait" ? styles.portraitPasswordInput : styles.landscapePasswordInput}>
                <DefaultInput placeholder="Password" style={styles.input} />
              </View>
              <View style={this.state.deviceDims === "portrait" ? styles.portraitPasswordInput : styles.landscapePasswordInput}>
                <DefaultInput placeholder="Confirm Password" style={styles.input} />
              </View>
            </View>
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
      
  }, 
  portraitPasswordContainer: {
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  landscapePasswordContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  portraitPasswordInput: {
    width: "100%"
  },
  landscapePasswordInput: {
    width: "45%"
  }
});
export default AuthScreen;
