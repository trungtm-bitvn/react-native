import React from "react";
import { Modal, View, StyleSheet, Text, Image, Button, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const placeDetail = props => {
    let modalContent = null;
    if (props.selectedPlace) {
        modalContent = (
            <View>
                <Image 
                    source={props.selectedPlace.image} 
                    style={styles.placeImage}
                />
                <Text style={styles.placeName}>{props.selectedPlace.name}</Text>
            </View>
        );
    }
    return (
        <Modal 
            visible={props.selectedPlace !== null} 
            animationType="slide"
        >
            <View style={styles.modalContainer} >
                {modalContent}
                <View>
                    <TouchableOpacity onPress={props.onPlaceDeleted}>
                        <View style={styles.deleteButton}>
                            <Ionicons 
                                name="ios-trash" 
                                size={32} 
                                color="red" 
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={props.onModalClosed} >
                        <View style={styles.deleteButton}>
                            <Ionicons 
                                name="ios-close" 
                                size={32} 
                                color="#007bff" 
                            />
                        </View>
                    </TouchableOpacity>
                    
                    {/* <Button title="Close" onPress={props.onModalClosed}/> */}
                </View>
            </View>
            
        </Modal>
  );
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

export default placeDetail;

