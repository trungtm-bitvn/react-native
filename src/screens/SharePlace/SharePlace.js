import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import PlaceInput from '../../components/PlaceInput/PlaceInput';

import { connect } from 'react-redux';
import { addPlace } from '../../store/actions/index';


class SharePlaceScreen extends Component {
    // static navigationOptions = {
    //     title: 'Share Places',
    //     header: null
    // }

    placeAddedHandler = (placeName) => {
        this.props.onPlaceAdded(placeName);
    }

    render() {
        return (
            <PlaceInput onPlaceAdded={this.placeAddedHandler} />
    )}
}

const styles = StyleSheet.create({
});

const mapDispatchToProps = dispatch => {
    return {
        onPlaceAdded: (placeName) => dispatch(addPlace(placeName))
    }
}

export default connect(null, mapDispatchToProps)(SharePlaceScreen);