import React from 'react';

import { Text, View, ScrollView, StyleSheet, Image, Dimensions} from 'react-native';

import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'


export default class QuestionaireScreen extends React.Component {
  static navigationOptions = {
    title: 'QuestionaireScreen',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <FormLabel>Full Name</FormLabel>
        <FormInput onChangeText={(text) => this.setState({text})}/>

        <FormLabel>Email ID</FormLabel>
        <FormInput onChangeText={(text) => this.setState({text})}/>

        <FormLabel>Graduation Year</FormLabel>
        <FormInput onChangeText={(text) => this.setState({text})}/>

        <FormLabel>Sex</FormLabel>
        <FormInput onChangeText={(text) => this.setState({text})}/>

        <FormLabel>Ethnicity</FormLabel>
        <FormInput onChangeText={(text) => this.setState({text})}/>

        <FormLabel>Major</FormLabel>
        <FormInput onChangeText={(text) => this.setState({text})}/>

        <FormLabel>Courses List</FormLabel>
        <FormInput onChangeText={(text) => this.setState({text})}/>

        <Button style={styles.button}
          large
          title="Submit!"
          />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    color: 'green'
  }
});
