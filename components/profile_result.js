import React from 'react';
import {
  Button,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import Expo, { Constants } from 'expo';

let {height , width} = Dimensions.get('window')

export default class ProfileResult extends React.Component {

  openPopup() {
    
  }

  render() {
    return (
      <TouchableOpacity onPress{this.openPopup}}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../assets/images/no_pic.jpg')}
            style={styles.profilePicture}
            />
          <View style={styles.infoContainer}>
            <Text style={styles.name}> {this.props.name} </Text>
            <Text style={styles.year}> Class of {this.props.year} </Text>
            <Text style={styles.similarities}> {this.props.similarities} </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  profileContainer: {
    width: width - 30,
    height: 120,
    backgroundColor: 'whitesmoke',
    marginBottom: 20,
    shadowColor: 'black',
    shadowOffset: { height: 2, width: 2}
  },

  profilePicture: {
    width: 100,
    height: 100,
    margin: 12,
  },

  infoContainer: {
    marginTop: -100,
    marginLeft: 125,
    flex: 1
  },

  name: {
    fontSize: 30
  },

  year: {
    fontSize: 20
  },

  similarities: {
    fontSize: 15
  }
})
