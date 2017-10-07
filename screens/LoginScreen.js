import React from 'react';
import { Button, Text, View, ScrollView, StyleSheet, Image} from 'react-native';
import { AuthSession } from 'expo';
import { Login } from '../components/Login/Login'

export default class App extends React.Component {
  render() {
    return (
      <Login/>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },

  logo: {
    width: 100,
    height: 100,
  },

  title: {
    color: '#FFF',
    marginTop: 10,
    width: 160,
    textAlign: "center",
    textShadowColor: 'black',
    textShadowRadius: 5,
    textShadowOffset: { height: 2, width: 2 }
  }
});
