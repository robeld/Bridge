import React from 'react';
import { Button, Text, View, ScrollView, StyleSheet, Image, Dimensions} from 'react-native';
import { AuthSession } from 'expo';

const {height, width} = Dimensions.get("window")

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/images/logo.png")}
          />
        </View>


            <Text style={styles.title}>Connect to Students Like You</Text>
        <Button title="Submit" onPress={(text) => console.log(text)} style={styles.formContainer}> </Button>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498db'
  },

  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },

  logo: {
    width: width - 20,
    height: 200,
    marginTop: -height/2 + 200,
    backgroundColor: 'transparent'
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
