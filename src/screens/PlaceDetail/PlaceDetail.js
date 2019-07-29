import React, { Component} from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

class placeDetailScreen extends Component {
    static navigationOptions = ({navigation}) => {
        let selectedPlace = navigation.getParam('selectedPlace');
        name = selectedPlace ?  selectedPlace.name : 'Find Place';
        return {
            title: name
        }
    }
    
    render() {
        selectedPlace = this.props.navigation.getParam('selectedPlace');
        return (
            <View style={styles.modalContainer} >
                <View>
                    <Image 
                        source={selectedPlace.image} 
                        style={styles.placeImage}
                    />
                </View>
                <View>
                    <TouchableOpacity onPress={this.props.onPlaceDeleted}>
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
        margin: 22
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

export default placeDetailScreen;

