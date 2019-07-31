import React, { Component} from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { deletePlace } from '../../store/actions/index';

class placeDetailScreen extends Component {
    selectedPlace = this.props.navigation.getParam('selectedPlace');
    static navigationOptions = ({navigation}) => {
        let selectedPlace = navigation.getParam('selectedPlace');
        name = selectedPlace ? selectedPlace.name : 'Find Place';
        return {
            title: name
        }
    }
    
    placeDeletedHandler = () => {
        this.props.onPlaceDeleted(this.selectedPlace.key);
        this.props.navigation.goBack(null);
    }
    render() {
        
        return (
            <View style={styles.modalContainer} >
                <View>
                    <Image 
                        source={this.selectedPlace.image} 
                        style={styles.placeImage}
                    />
                </View>
                <View>
                    <TouchableOpacity onPress={() => this.placeDeletedHandler()}>
                        <View style={styles.deleteButton}>
                            <Ionicons 
                                name="ios-trash" 
                                size={32} 
                                color="red" 
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    
};

const styles = StyleSheet.create({
    modalContainer: {
        margin: 5
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
    }

});

const mapDispatchToState = dispatch => {
    return {
        onPlaceDeleted: placeKey => dispatch(deletePlace(placeKey))
    }
}

export default connect(null, mapDispatchToState)(placeDetailScreen);

