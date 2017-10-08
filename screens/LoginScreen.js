import React from 'react';
import { Button, Text, View, ScrollView, StyleSheet, Image, Dimensions, Alert} from 'react-native';
import { AuthSession, Facebook } from 'expo';

const {height, width} = Dimensions.get("window")

const FB_APP_ID = '130552880933614';

export default class LoginScreen extends React.Component {

  state = {
    result: null,
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>

        <Button title="Open FB Auth" onPress={this._handlePressAsync} />
        {this.state.result ? (
          <Text>{JSON.stringify(this.state.result)}</Text>
        ) : null}

        <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/images/white_logo.png")}
          />
        </View>

        <Text style={styles.title}>Connect to Students Like You</Text>
        <Button title="Submit" onPress={() =>
            navigate('Questionaire') }
            style={styles.formContainer}>
        </Button>
      </View>
    );
  };

  _handlePressAsync = async () => {
    /*let redirectUrl = AuthSession.getRedirectUrl();
    let result = await AuthSession.startAsync({
      authUrl:
        `https://www.facebook.com/v2.8/dialog/oauth?response_type=token` +
        `&client_id=${FB_APP_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
    });
    this.setState({ result }); */

    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('130552880933614', { // make
      permissions: ['public_profile'],
    });
    if (type === 'success') {
    // Get the user's name using Facebook's Graph API
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}`);
    Alert.alert(
      'Logged in!',
      `Hi ${(await response.json()).name}!`,
    );
  }
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
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
