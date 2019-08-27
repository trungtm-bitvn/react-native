import React from "react";
import { TouchableOpacity, TouchableHighlight, View, Text, StyleSheet, Platform } from "react-native";

const customButton = props => {
  content = (
    <View style={[styles.button, {backgroundColor: props.color}, props.disabled ? styles.invalid : null]}>
      <Text style={[styles.text, props.disabled ? styles.invalidText: null]}>{props.children}</Text>
    </View>
  );
  if(props.disabled) {
    return content;
  }
  if (Platform.OS === "android") {
    return (
      <TouchableHighlight onPress={props.onPress}>
        {content}
      </TouchableHighlight>
    );
  }
  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={.9}>
      {content}
    </TouchableOpacity>
  );
};

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
    },
    invalid: {
      backgroundColor: "#aaa",
      borderColor: "#eee"
    },
    invalidText: {
      color: "#eee"
    }
});

export default customButton;
