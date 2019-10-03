import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Button, AsyncStorage } from 'react-native';



import PlaceList from '../../components/PlaceList/PlaceList';

import { connect } from 'react-redux';
import { getNotification, showLatestNotification, updateAppInfo } from '../../store/actions/index';

class FindPlaceScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowList: false,
            findPlaceAnim: new Animated.Value(1),
        }
        console.log('props at constructor');
        console.log(this.props.appInfo.isOpened);
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

    getNoti = async () => {
        this.props.getNotificationHandler();
        
    }

    render() {
        const scale = this.state.findPlaceAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [12, 1]
        })
        let content = (<PlaceList places={this.props.places} onItemSelected={this.placeSelectedHandler} />);
        if(this.state.isShowList === false) {
            content = (
                <View style={styles.buttonContainer}>
                    <Animated.View 
                        style={{
                            opacity: this.state.findPlaceAnim, 
                            transform: [{scale: scale}] }}>
                            <TouchableOpacity onPress={this.findPlaceHandler} >
                                <Text style={styles.findPlaceButton} >Find Places!</Text>
                            </TouchableOpacity>
                    </Animated.View>
                    <Button title="Get noti" onPress={this.getNoti} />
                </View>
                
            )
        }
        return (
            <View style={this.state.isShowList ? null : styles.buttonContainer}>
                { content }
            </View>
            
        );

        
    }

    componentDidMount() {
        console.log('start fetch data and try to show alert');
        this.props.getNotificationHandler()
        .then(() => this.props.showLatestNotification(this.props.notifications.latest, this.props.appInfo.isOpened));
    }

    componentDidUpdate() {
        
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
        places: state.places.places,
        notifications: state.notifications.notifications,
        appInfo: state.appInfo.appInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getNotificationHandler: () => dispatch(getNotification()),
        updateAppInfo: (appInfo) => dispatch(updateAppInfo(appInfo)),
        showLatestNotification: (notifications, isOpened) => dispatch(showLatestNotification(notifications, isOpened))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindPlaceScreen);