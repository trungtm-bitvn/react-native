import React, { Component } from "react";
import { View, Button, ScrollView, StyleSheet } from "react-native";

import { connect } from "react-redux";
import { addPlace } from "../../store/actions/index";

import MainText from "../../components/UI/MainText/MainText";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import PlaceInput from "../../components/PlaceInput/PlaceInput";
import PickImage from "../../components/PickImage/PickImage";
import PickLocation from "../../components/PickLocation/PickLocation";
import validate from "../../ultilities/validation";

class SharePlaceScreen extends Component {
  static navigationOptions = {
    title: "Share Places"
  };

  state = {
    controls: {
      placeName: {
        val: "",
        valid: false,
        touched: false,
        validationRules: {
          notEmpty: true
        }
      },
      location: {
        val: null,
        valid: false
      },
      image: {
        val: null,
        valid: false
      }
    }
  };
  
  placeNameChangedHandler = val => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          placeName: {
            ...prevState.controls.placeName,
            val: val,
            touched: true,
            valid: validate(val, prevState.controls.placeName.validationRules)
          }
        }
      };
    });
  };

  locationPickHandler = location => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          location: {
            val: location,
            valid: true
          }
        }
      };
    });
  };

  imagePickHandler = image => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          image: {
            val: image,
            valid: true
          }
        }
      };
    });
  };

  placeAddedHandler = () => {
    this.props.onPlaceAdded(
      this.state.controls.placeName.val,
      this.state.controls.location.val,
      this.state.controls.image.val
    );
    // this.resetSharePlace();
  };

  resetSharePlace = () => {
    this.setState({
      controls: {
        placeName: {
          val: "",
          valid: false,
          touched: false,
          validationRules: {
            notEmpty: true
          }
        },
        location: {
          val: null,
          valid: false
        },
        image: {
          val: null,
          valid: false
        }
      }
    });
  };
  openModal = () => {
    this.props.navigation.navigate("Modal");
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Button
              title="Open Modal"
              onPress={this.openModal}
          />
          <MainText>
            <HeadingText>Share a place with us!</HeadingText>
          </MainText>
          <View style={styles.input}>
            <PlaceInput
              placeName={this.state.controls.placeName.val}
              onPlaceNameChanged={this.placeNameChangedHandler}
              touched={this.state.controls.placeName.touched}
              valid={this.state.controls.placeName.valid}
            />
          </View>
          <PickImage onImagePick={this.imagePickHandler} />
          <PickLocation
            style={styles.location}
            onLocationPick={this.locationPickHandler}
          />
          <View style={styles.button}>
            <Button
              title="Share the Place!"
              onPress={this.placeAddedHandler}
              disabled={
                !this.state.controls.placeName.valid ||
                !this.state.controls.location.valid ||
                !this.state.controls.image.valid
              }
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center"
  },
  button: {
    margin: 10
  },
  input: {
    marginBottom: 10,
    width: "90%"
  },
  location: {
    width: "100%"
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onPlaceAdded: (placeName, location, image) =>
      dispatch(addPlace(placeName, location, image))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SharePlaceScreen);
