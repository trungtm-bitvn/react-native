import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const customButton = props => (
  <TouchableOpacity onPress={props.onPress} activeOpacity={.9}>
    <View style={[styles.button, {backgroundColor: props.color}]}>
      <Text style={styles.text}>{props.children}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        padding: 8,
        margin: 5,
        borderRadius: 3
    }, 
    text: {
        color: "#fff",
        fontWeight: "700",
        textTransform: "uppercase"
    }
});

export default customButton;
