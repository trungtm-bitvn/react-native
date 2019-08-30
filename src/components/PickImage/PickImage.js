import React, { Component } from "react";
import { View, Image, Button, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import previewImage from "../../../assets/logo.jpg";

class PickImage extends Component {
  state = {
    pickedImage: null
  };

  pickImageHandler = async () => {
    let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      alert("We dont have permission to access Image Library");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All
    });
    console.log(result);
    if (result && !result.cancelled) {
      this.setState({
        pickedImage: {
          uri: result.uri
        }
      });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image source={this.state.pickedImage} style={styles.previewImage} />
        </View>
        <View style={styles.button}>
          <Button title="Take Image" onPress={this.pickImageHandler} />
          <Button title="Pick Image" onPress={this.pickImageHandler} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "90%",
    height: 150
  },
  button: {
    margin: 10
  },
  previewImage: {
    width: "100%",
    height: "100%"
  }
});

export default PickImage;
