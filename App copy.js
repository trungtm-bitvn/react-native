import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Provider, connect } from 'react-redux';
import configureStore from './src/store/configureStore';
import { addPlace, deletePlace, selectPlace, deselectPlace } from './src/store/actions/index';
 
import PlaceInput from "./src/components/PlaceInput/PlaceInput";
import PlaceList from "./src/components/PlaceList/PlaceList";
import PlaceDetail from "./src/components/PlaceDetail/PlaceDetail";

class App extends Component {
  placeAddedHandler = placeName => {
    this.props.onAddPlace(placeName);
    console.log('Place added!');
  };
  placeSelectedHandler = key => {
    this.props.selectPlace(key);
  };
  modalClosedHandler = () => {
    this.props.deselectPlace();
  };
  placeDeletedHandler = () => {
    this.props.onDeletePlace();
  };

  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail 
          selectedPlace={this.props.selectedPlace} 
          onModalClosed={this.modalClosedHandler}
          onPlaceDeleted={this.placeDeletedHandler}
          />
        <PlaceInput onPlaceAdded={this.placeAddedHandler} />
        <PlaceList
          places={this.props.places}
          onItemSelected={this.placeSelectedHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 30,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start"
  }
});

const mapStateToProps = state => {
  return {
    places: state.places.places,
    selectedPlace: state.places.selectedPlace
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (name) => dispatch(addPlace(name)),
    onDeletePlace: () => dispatch(deletePlace()),
    selectPlace: (key) => dispatch(selectPlace(key)),
    deselectPlace: () => dispatch(deselectPlace())
  };
};

const store = configureStore();
const ConnectAppScreen = connect(mapStateToProps, mapDispatchToProps)(App);

const RNRedux = () => (
  <Provider store={store}>
    <ConnectAppScreen />
  </Provider>
);
export default RNRedux;
