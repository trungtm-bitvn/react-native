import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import PlaceList from '../../components/PlaceList/PlaceList';
import { connect } from 'react-redux';

class FindPlaceScreen extends Component {
    static navigationOptions = {
        title: 'Find Places',
        tabBarIcon: (<MaterialCommunityIcons name="map-search" size={30} />)  
    }
    placeSelectedHandler = key => {
        console.log(typeof key);
        selPlace = this.props.places.find(place => {
            place.key == key
        });
        console.log(typeof this.props.places[0].key);
        this.props.navigation.navigate('PlaceDetail', {selectedPlace: selPlace});
    }
    render() {
        return (
            <View style={styles.findPlaceContainer}>
                <PlaceList places={this.props.places} onItemSelected={this.placeSelectedHandler} />
            </View>
        );
    }
    
}
const styles = StyleSheet.create({
    findPlaceContainer: {
        marginTop: 30
    } 
});

const mapStateToProps = state => {
    return {
        places: state.places.places
    }
}

export default connect(mapStateToProps)(FindPlaceScreen);