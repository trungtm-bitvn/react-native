import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

class PickLocation extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Text>Maps</Text>
        </View>
        <View style={styles.button}>
          <Button title="Locate Me!" />
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
    width: "80%",
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

export default PickLocation;
