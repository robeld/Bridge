import React from 'react';

import { AsyncStorage, Text, View, ScrollView, StyleSheet, Image, Dimensions} from 'react-native';

import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

export default class QuestionaireScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      gradYear: '',
      sex: '',
      ethnicity: '',
      major: '',
      courses: ''
    };

    this.handleAChange = this.handleAChange.bind(this);
    this.handleBChange = this.handleBChange.bind(this);
    this.handleCChange = this.handleCChange.bind(this);
    this.handleDChange = this.handleDChange.bind(this);
    this.handleEChange = this.handleEChange.bind(this);
    this.handleFChange = this.handleFChange.bind(this);
    this.handleGChange = this.handleGChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  };

  static navigationOptions = {
    title: 'QuestionaireScreen'
  };

  handleAChange(event) {
    const value = event;;
    this.state['name'] = value;
  }

  handleBChange(event) {
    const value = event;
    this.state['email'] = value;
  }
  handleCChange(event) {
    const value = event;
    this.state['gradYear'] = value;
  }
  handleDChange(event) {
    const value = event;
    this.state['sex'] = value;
  }
  handleEChange(event) {
    const value = event;
    this.state['ethnicity'] = value;
  }
  handleFChange(event) {
    const value = event;
    this.state['major'] = value;
  }
  handleGChange(event) {
    const value = event;
    this.state['courses'] = value;
  }


  async handleSubmit() {
    const { navigate } = this.props.navigation;
    total = this.state['name'] + ',' + this.state['email'] + ',' + this.state['gradYear'] + ',' + this.state['sex'] + ',' + this.state['ethnicity'] + ',' + this.state['major'] + '/' + this.state['courses'];
    let id = 0
    try {
      const response = await fetch("https://bridge-knn.herokuapp.com/adduser/" + total);
      id = await response.text();
    }
    catch(e) {
      console.error(e);
    }

    try {
      await AsyncStorage.setItem('@unique_id', id);
    } catch(error) {
      console.log(error);
    }

    navigate('Finding');
  };

  render() {
    return (
      <ScrollView>
        <FormLabel>Full Name</FormLabel>
        <FormInput onChangeText={this.handleAChange}/>

        <FormLabel>Email ID</FormLabel>
        <FormInput onChangeText={this.handleBChange}/>

        <FormLabel>Graduation Year</FormLabel>
        <FormInput onChangeText={this.handleCChange}/>

        <FormLabel>Sex</FormLabel>
        <FormInput onChangeText={this.handleDChange}/>

        <FormLabel>Ethnicity</FormLabel>
        <FormInput onChangeText={this.handleEChange}/>

        <FormLabel>Major</FormLabel>
        <FormInput onChangeText={this.handleFChange}/>

        <FormLabel>Courses List</FormLabel>
        <FormInput onChangeText={this.handleGChange}/>

        <Button style={styles.button}
          large
          backgroundColor="green"
          onPress={()=>this.handleSubmit()}
          title="Submit!"
          />
      </ScrollView>
    );
  };
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  }
});
