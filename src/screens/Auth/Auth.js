import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert
} from "react-native";
import { connect } from 'react-redux';
import { Notifications } from "expo";

import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import backgroundImage from "../../../assets/logo.jpg";
import validation from "../../ultilities/validation";
import { tryAuth, increaseNotificationByOne } from "../../store/actions/index";

class AuthScreen extends Component {
  getDeviceDims = dims => (dims.height > 500 ? "portrait" : "landscape");

  state = {
    deviceDims: this.getDeviceDims(Dimensions.get("window")),
    authMode: "login",
    controls: {
      email: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      },
      password: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 6
        },
        touched: false
      },
      retypePassword: {
        value: "",
        valid: false,
        validationRules: {
          equalTo: "password"
        },
        touched: false
      }
    }
  };
  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.deviceRotateHandler);
  }

  _handleNotification = (notification) => {
    if('notificationType' in notification.data) {
      notificationType = notification.data.notificationType
      this.props.increaseNotification(notificationType);
      console.log('notification data');
      console.log(notification);
    }
  };
  onLoginHandler = async () => {
    authData = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    };
    await this.props.onLogin(authData);
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
    this.props.navigation.navigate("Main");
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === "login" ? "signup" : "login"
      };
    });
  };

  deviceRotateHandler = dims => {
    this.setState({
      deviceDims: this.getDeviceDims(dims.window)
    });
  };

  updateTextInput = (key, value) => {
    let connectedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {
      equalKey = this.state.controls[key].validationRules.equalTo;
      equalValue = this.state.controls[equalKey].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }

    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validation(
              value,
              prevState.controls[key].validationRules,
              connectedValue
            ),
            touched: true
          }
        }
      };
    });
  };
  render() {
    let headingContent = null;
    let retypePasswordContent = null;
    if (this.state.deviceDims === "portrait") {
      headingContent = (
        <MainText>
          <HeadingText>
            Please {this.state.authMode === "login" ? "Log In" : "Sign Up"}
          </HeadingText>
        </MainText>
      );
    }
    if (this.state.authMode === "signup") {
      retypePasswordContent = (
        <View
          style={
            this.state.deviceDims === "portrait"
              ? styles.portraitPasswordInput
              : styles.landscapePasswordInput
          }
        >
          <DefaultInput
            placeholder="Confirm Password"
            style={styles.input}
            value={this.state.controls.retypePassword.value}
            onChangeText={val => this.updateTextInput("retypePassword", val)}
            valid={this.state.controls.retypePassword.valid}
            touched={this.state.controls.retypePassword.touched}
            autoCapitalize="none"
            secureTextEntry
          />
        </View>
      );
    }
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <KeyboardAvoidingView style={styles.authContainer} behavior="padding">
          {headingContent}
          <CustomButton onPress={this.switchAuthModeHandler} color="#9c4dcc">
            Switch to {this.state.authMode === "login" ? "Sign Up" : "Log In"}
          </CustomButton>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.keyboardDismissContainer}>
              <View style={styles.inputContainer}>
                <DefaultInput
                  placeholder="Your Email Address"
                  style={styles.input}
                  value={this.state.controls.email.value}
                  onChangeText={val => this.updateTextInput("email", val)}
                  valid={this.state.controls.email.valid}
                  touched={this.state.controls.email.touched}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                />
                <View
                  style={
                    this.state.deviceDims === "portrait"
                      ? styles.portraitPasswordContainer
                      : styles.landscapePasswordContainer
                  }
                >
                  <View
                    style={
                      this.state.deviceDims === "portrait" ||
                      this.state.authMode === "login"
                        ? styles.portraitPasswordInput
                        : styles.landscapePasswordInput
                    }
                  >
                    <DefaultInput
                      placeholder="Password"
                      style={styles.input}
                      value={this.state.controls.password.value}
                      onChangeText={val =>
                        this.updateTextInput("password", val)
                      }
                      valid={this.state.controls.password.valid}
                      touched={this.state.controls.password.touched}
                      autoCapitalize="none"
                      secureTextEntry
                    />
                  </View>
                  {retypePasswordContent}
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <CustomButton
            onPress={() => this.onLoginHandler()}
            color="#9c4dcc"
            disabled={
              !this.state.controls.email.valid ||
              !this.state.controls.password.valid ||
              (!this.state.controls.retypePassword.valid &&
                this.state.authMode === "signup")
            }
          >
            Submit
          </CustomButton>
        </KeyboardAvoidingView>
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
  keyboardDismissContainer: {
    width: "100%",
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
    width: "100%"
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

mapDispatchToProps = dispatch => {
  return {
    onLogin: authData => dispatch(tryAuth(authData)),
    increaseNotification: key => dispatch(increaseNotificationByOne(key))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AuthScreen);
