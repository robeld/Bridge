import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
  AsyncStorage
} from 'react-native';

const FETCH_NUM =  5

import { SearchBar, List, ListItem, ListView } from 'react-native-elements';

import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

import { ProfileResult } from '../components/profile_result'

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


export default class FindingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      people: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.queryDb = this.queryDb.bind(this);
    this.render = this.render.bind(this);
  }

  handleChange(text) {
    this.state['value'] = text;
  }

  static navigationOptions = {
    header: null,
  };

  async queryDb() {
    console.log("TESTING");
    console.log(this.state['value']);
    try {
      let id = -1;
      try {
        id = await AsyncStorage.getItem('@unique_id');
        if(id !== null) {
          const path = id + "/" + this.state['value'] + "/" + FETCH_NUM;
          console.log("path: " + path);
          let response = await fetch("https://bridge-knn.herokuapp.com/getSim/" + path);
          const indices_str = await response.text();
          const indices = indices_str.split(",");

          console.log(indices);

          const closest = [];

          for(let i = 0; i < indices.length; i++) {
            one_person = {};
            const response = await fetch("https://bridge-knn.herokuapp.com/info/" + indices[i])
            const text = await response.text();
            const data = text.split(",");
            one_person['name'] = data[0];
            one_person['year'] = data[1];
            one_person['email'] = data[2];
            closest.push(one_person);

            const response2 = await fetch("https://bridge-knn.herokuapp.com/common/" + id + '/' + indices[i])
            const similarTraits= await response2.text();
            console.log(similarTraits);
          }

          this.state['people'] = closest;
          console.log("DONE");
          console.log(this.state['people']);
          this.forceUpdate();
        }
      } catch(error) {
        console.error(error);
      }
    }
    catch(e) {
      console.error(e);
    }
  }

  renderRow(rowData, sectionID) {
    return (
      <ListItem
        roundAvatar
        key={sectionID}
        title={rowData.name}
        subtitle={rowData.year}
        avatar={{uri:"../assets/images/no_pic.jpg"}}
        />
    )
  }

  render() {
    var kk = this.state['people'].map(function(obj, i) {
      console.log(obj.name);
      console.log(obj.year);
      console.log(i);
      var temp = obj.name;
      var temp2 = obj.email;
      return (
        <ListItem
          key={i}
          title={temp}
          subtitle={temp2}
          avatar={{uri:"../assets/images/no_pic.jpg"}}
          style={styles.listItem}
        />
      )
    }.bind(this));

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
            <SearchBar
              round={true}
              onChangeText={this.handleChange}
              onSubmitEditing={this.queryDb}
              placeholder='Search for a course!'
              />
          </View>
          <View style={styles.resultsContainer}>
            <List>
              {kk}
            </List>
          </View>

        </ScrollView>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  listItem: {
    margin: 20,
    width: 300
  },
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
    marginBottom: 20
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
