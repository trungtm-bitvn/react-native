import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform, 
  ScrollView
} from "react-native";
import MapView from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { deletePlace } from "../../store/actions/index";

class placeDetailScreen extends Component {
  selectedPlace = this.props.navigation.getParam("selectedPlace");
  static navigationOptions = ({ navigation }) => {
    let selectedPlace = navigation.getParam("selectedPlace");
    name = selectedPlace ? selectedPlace.name : "Find Place";
    return {
      title: name
    };
  };

  placeDeletedHandler = () => {
    this.props.onPlaceDeleted(this.selectedPlace.key);
    this.props.navigation.goBack(null);
  };
  render() {
    console.log(this.selectedPlace);
    return (
      <ScrollView>
        <View style={styles.modalContainer}>
          <View style={styles.placeDetailContainer}>
            <Image
              source={this.selectedPlace.image}
              style={styles.placeImage}
            />
            <MapView
              initialRegion={this.selectedPlace.location}
              style={styles.map}
            >
              <MapView.Marker coordinate={this.selectedPlace.location} />
            </MapView>
          </View>
          <View>
            <TouchableOpacity onPress={() => this.placeDeletedHandler()}>
              <View style={styles.deleteButton}>
                <Ionicons
                  name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
                  size={32}
                  color="red"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    margin: 5,
    alignItems: "center"
  },
  placeDetailContainer: {
    width: "100%",
    alignItems: "center"
  },
  placeImage: {
    width: "100%",
    height: 200
  },
  placeName: {
    fontWeight: "bold",
    fontSize: 28,
    textAlign: "center"
  },
  deleteButton: {
    alignItems: "center"
  },
  map: {
    width: "100%",
    height: 250,
    marginTop: 15
  }
});

const mapDispatchToState = dispatch => {
  return {
    onPlaceDeleted: placeKey => dispatch(deletePlace(placeKey))
  };
};

export default connect(
  null,
  mapDispatchToState
)(placeDetailScreen);
