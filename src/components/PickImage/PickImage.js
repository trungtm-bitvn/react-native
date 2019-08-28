import React, { Component } from "react";
import { View, Image, Button, StyleSheet } from "react-native";

import previewImage from "../../../assets/logo.jpg";

class PickImage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image source={previewImage} style={styles.previewImage} />
        </View>
        <View style={styles.button}>
          <Button title="Pick Image" />
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
