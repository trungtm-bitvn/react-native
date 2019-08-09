import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';



import PlaceList from '../../components/PlaceList/PlaceList';
import { connect } from 'react-redux';

class FindPlaceScreen extends Component {
    state = {
        isShowList: false,
        findPlaceAnim: new Animated.Value(1),
    }
    static navigationOptions = {
        title: 'Find Places',
    }

    placeSelectedHandler = key => {
        selPlace = this.props.places.find(place => {
            return place.key === key;
        });
        this.props.navigation.navigate('PlaceDetail', {selectedPlace: selPlace});
    }
    findPlaceHandler = () => {
        Animated.timing(this.state.findPlaceAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true
        }).start(() => {
            this.setState({
                isShowList: true
            });
        });
    }
    render() {
        const scale = this.state.findPlaceAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [12, 1]
        })
        let content = (<PlaceList places={this.props.places} onItemSelected={this.placeSelectedHandler} />);
        if(this.state.isShowList === false) {
            content = (
                <Animated.View 
                    style={{
                        opacity: this.state.findPlaceAnim, 
                        transform: [{scale: scale}] }}>
                        <TouchableOpacity onPress={this.findPlaceHandler} >
                            <Text style={styles.findPlaceButton} >Find Places!</Text>
                        </TouchableOpacity>
                </Animated.View>
            )
        }
        return (
            <View style={this.state.isShowList ? null : styles.buttonContainer}>
                { content }
            </View>
            
        );

        
    }
    
}
const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1, 
        justifyContent: "center",
        alignItems: "center"
    },
    findPlaceButton: {
        fontSize: 26,
        fontWeight: "bold",
        color: "orange",
        borderColor: "orange",
        borderWidth: 2,
        borderRadius: 30,
        padding: 15
    }
});

const mapStateToProps = state => {
    return {
        places: state.places.places
    }
}

export default connect(mapStateToProps)(FindPlaceScreen);