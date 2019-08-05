import React, { Component } from "react";
import { View, Button, ScrollView, StyleSheet } from "react-native";

import { connect } from "react-redux";
import { addPlace } from "../../store/actions/index";

import MainText from "../../components/UI/MainText/MainText";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import PlaceInput from "../../components/PlaceInput/PlaceInput";
import PickImage from "../../components/PickImage/PickImage";
import PickLocation from "../../components/PickLocation/PickLocation";

class SharePlaceScreen extends Component {
  static navigationOptions = {
    title: "Share Places"
  };

  state = {
    placeName: ""
  };
  placeNameChangedHandler = val => {
    this.setState({
      placeName: val
    });
  };

  placeAddedHandler = () => {
    if (this.state.placeName.trim() !== "") {
      this.props.onPlaceAdded(this.state.placeName);
      this.setState({
        placeName: ''
      });
    }
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <HeadingText>Share a place with us!</HeadingText>
          </MainText>
          <PickImage />
          <PickLocation />
          <PlaceInput
            placeName={this.state.placeName}
            onPlaceNameChanged={this.placeNameChangedHandler}
          />
          <View style={styles.button}>
            <Button title="Share the Place!" onPress={this.placeAddedHandler} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  button: {
    margin: 10
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onPlaceAdded: placeName => dispatch(addPlace(placeName))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SharePlaceScreen);
