import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
const listItem = (props) => (
    <TouchableOpacity onPress={props.onItemSelected}>
        <View style={styles.listItem}>
            <Image resizeMode="contain" source={props.image} style={styles.imageItem}/>
            <Text>{props.placeName}</Text>
        </View>
    </TouchableOpacity>
    
);

const styles = StyleSheet.create({
    listItem: {
        width: "100%",
        padding: 10,
        backgroundColor: "#eee",
        marginTop: 5,
        marginBottom: 5,
        flexDirection: "row",
        alignItems: "center"
    },
    imageItem: {
        marginRight: 8,
        height: 30,
        width: 30
    }
});

export default listItem;

