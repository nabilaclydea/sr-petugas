import React, { Component } from 'react';
import { Alert, Picker, Button, TextInput, View, ScrollView, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import {NavigationActions, StackActions} from "react-navigation";
import HealthcareAPI from '../api/HealthcareAPI';
import AsyncStorage from "@react-native-community/async-storage";
import Spinner from 'react-native-loading-spinner-overlay';

export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      spinner: false,
      usernameError: "false",
      username: '',
    };
  }
  
  _login() {
    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({
            routeName: "LoginScreen",
        })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  _forget() {
    this.setState({spinner: true});
    HealthcareAPI
        .get(
          '/password/forget',
          {
            params: {
              username: this.state.username
            }
          } 
        )
        .then(response => {
          this.setState({spinner: false});
          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({
                routeName: "CodePasswordScreen",
            })],
        });
        this.props.navigation.dispatch(resetAction);
        })
        .catch(error => {
          this.setState({spinner: false});
          console.log(error)
        })

  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Spinner
              animation={'slide'}
              visible={this.state.spinner}
              textContent={'Memeriksa username...'}
              textStyle={{color: '#ffffff'}}
          />
         <View style={{marginBottom: 250}}></View>
          <TextInput 
            value={this.state.username}
            onChangeText={(username) => {
              this.setState({ username })
            }}
            placeholder={'Username'}
            style={this.state.usernameError == "true" ? styles.inputInValid : styles.inputValid}
          />
          {this.state.usernameError == "true" ? 
            <Text style={{fontWeight: 'bold', fontSize: 14, color: '#f05d5e', marginBottom: 20}}>
                Username yang anda masukkan sudah terdaftar
            </Text> : 
            null
          }

          <TouchableOpacity onPress={() => this._forget()}
          style={[styles.buttonContainer, styles.registerButton, {marginTop: 30}]}> 
            <Text style={{color: '#ffffff', fontWeight: 'bold'}}>Lupa Password</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this._login()} style={[styles.buttonContainer, {marginTop: 20, marginBottom: 30}]}>
            <Text>Saya Sudah Punya Akun</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  input: {
    borderBottomWidth: 1,
    width: 80 + '%',
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',
    marginLeft: 4, 
    borderBottomColor: '#c4c4c4',
    color: '#cacaca'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10,
    width: 80 + '%',
    height: 40,
    borderRadius: 5
  },
  registerButton: {
    backgroundColor: "#019ca9",
  },
  inputValid: {
    borderBottomWidth: 1,
    width: 80 + '%',
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',
    marginLeft: 4,
    borderBottomColor: '#c4c4c4',
    color: '#cacaca'
},
inputInValid: {
    borderBottomWidth: 1,
    width: 80 + '%',
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',
    marginLeft: 4,
    borderBottomColor: '#f05d5e',
    color: '#cacaca'
},
});