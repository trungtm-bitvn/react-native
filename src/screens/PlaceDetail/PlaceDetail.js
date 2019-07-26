import React, { Component} from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

class placeDetailScreen extends Component {
    render() {
        selectedPlace = this.props.navigation.getParam('selectedPlace');
        return (
            <View style={styles.modalContainer} >
                <View>
                    <Image 
                        source={selectedPlace.image} 
                        style={styles.placeImage}
                    />
                    <Text style={styles.placeName}>{selectedPlace.name}</Text>
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

