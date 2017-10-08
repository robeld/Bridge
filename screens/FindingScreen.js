import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  View
} from 'react-native';

const FETCH_NUM =  5

import { SearchBar } from 'react-native-elements';

import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import ProfileResult from '../components/profile_result.js'

const {height, width} = Dimensions.get("window");

const config = {
    apiKey: "AIzaSyAVEWEDbzbuEOTuyoAWYqFwTggf8Ut4C7Q",
    authDomain: "bridge-fb5ab.firebaseapp.com",
    databaseURL: "https://bridge-fb5ab.firebaseio.com",
    projectId: "bridge-fb5ab",
    storageBucket: "bridge-fb5ab.appspot.com",
    messagingSenderId: "87959739697"
};

try {
  firebase.initializeApp(config);
} catch(e) {
  console.log('App reloaded, so firebase did not re-initialize');
}


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  async queryDb(text) {
    try {
      console.log("reached");
      let init = await fetch(encodeURIComponent("https://bridge-knn.herokuapp.com/"));
      if(init) {
        const path = id + "/" + text + "/" + str(FETCH_NUM)
        let response = await fetch(encodeURIComponent("https://bridge-knn.herokuapp.com/" + path));
        const indices_str = await response.text();
        const indices = indices_str.split(",")
        console.log(indices)
      }
      else {
        console.log("error initalizing");
      }
    }
    catch(e) {
      console.error(e);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={ require('../assets/images/logo.png') }
              style={styles.welcomeImage}
              />
          </View>

          <View style={styles.resultsContainer}>
            <SearchBar
              round={true}
              onChangeText={(text) => this.setState({text})}
              onSubmitEditing={(text) => this.queryDb(text)}
              placeholder='Search for a course!'/>
          </View>

        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: width - 10,
    height: 150,
    resizeMode: 'contain',
    marginTop: 30,
  },
  resultsContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
