import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';



import PlaceList from '../../components/PlaceList/PlaceList';
import { connect } from 'react-redux';

class FindPlaceScreen extends Component {
    // static navigationOptions = {
    //     title: 'Find Places',
    // }
    placeSelectedHandler = key => {
        selPlace = this.props.places.find(place => {
            return place.key === key;
        });
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