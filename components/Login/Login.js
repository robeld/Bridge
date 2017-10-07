import React from 'react';
import { Button, Text, View, ScrollView, StyleSheet, Image} from 'react-native';

export default class Login extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}> </View>
          <Image
            style={styles.logo}
            source={require("../../assets/images/robot-dev.png")}
            />

            <Text style={styles.title}> Connect to Students Like You </Text>
        <Button style={styles.formContainer}> </Button>
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
    width: 100,
    height: 100,
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
