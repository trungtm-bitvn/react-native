import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Button,
  Modal
} from "react-native";

import { connect } from "react-redux";
import { getNotification } from "../../store/actions/index";

class ModalScreen extends Component {
  //   state = {
  //     modalVisible: false
  //   };

  //   setModalVisible(visible) {
  //     this.setState({ modalVisible: visible });
  //   }

  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent
          visible={true}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>Hello World!</Text>

            </View>
          </View>
        </Modal>

      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    places: state.places.places
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getNotificationHandler: () => dispatch(getNotification())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalScreen);
