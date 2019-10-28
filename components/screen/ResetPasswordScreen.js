import React, { Component } from 'react';
import { Alert, Picker, Button, TextInput, View, ScrollView, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import {NavigationActions, StackActions} from "react-navigation";
import HealthcareAPI from '../api/HealthcareAPI';
import AsyncStorage from "@react-native-community/async-storage";
import Spinner from 'react-native-loading-spinner-overlay';

export default class App extends Component {
  
  static navigationOptions = {
    headerStyle: {
        color: '#ffffff',
    },
    headerTintColor: '#000000',
    headerTitle:
        <View>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#000000'}} >Ubah Password</Text>
        </View>
    ,
};
  
  constructor(props) {
    super(props);
    
    this.state = {
      source: this.props.navigation.getParam('source'),
      spinner: false,
      passwordError: "false",
      confirmationPassword: '',
      password: '',
      username: this.props.navigation.getParam('username'),
    };
  }

  _reset() {

    if(this.state.passwordError == "false") {
      this.setState({spinner: true});
      let resetPassword = {username: this.state.username, password: this.state.password}
      HealthcareAPI
        .post('/password/reset', resetPassword)
        .then(response => {
          this.setState({spinner: false});
          if(this.state.source <= 0) {
            alert('Password Telah Berhasil Diubah, Silakan Login Kembali Dengan Password Terbaru');
            AsyncStorage.clear();
            this.props.navigation.navigate('Auth');
          } else {
            alert('Password Telah Berhasil Diubah');
            const popAction = StackActions.pop({
                n: 1,
            });

            this.props.navigation.dispatch(popAction);
          }
        })
        .catch(error => {
          this.setState({spinner: false});
          console.log(error)
        })
    }

  }

  _isPasswordMatch(confirmationPassword) {
    let match = "true";
    if(confirmationPassword == null || confirmationPassword == "") {
      match = "false";
    }
    if(this.state.password == confirmationPassword) {
      match = "false";
    }
    this.setState({confirmationPassword: confirmationPassword, passwordError: match});
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Spinner
              animation={'slide'}
              visible={this.state.spinner}
              textContent={'Melakukan Pendaftaran...'}
              textStyle={{color: '#ffffff'}}
          />
          <View style={{marginBottom: this.state.source <= 0 ? 250 :  200}}></View>
          <TextInput
            value={this.state.password}
            onChangeText={(password) => {
              this.setState({ password })
              this._isPasswordMatch(this.state.confirmationPassword);
            }}
            placeholder={'Password Baru'}
            secureTextEntry={true}
            style={styles.input}
          />
          {this.state.passwordError == "true" ? 
            <Text style={{fontWeight: 'bold', fontSize: 14, color: '#f05d5e', marginBottom: 20}}>
                Pastikan password yang anda masukkan sama
            </Text> : 
            null
          }

          <TextInput
            value={this.state.confirmationPassword}
            onChangeText={(confirmationPassword) => this._isPasswordMatch(confirmationPassword)}
            placeholder={'Confirmation Password'}
            secureTextEntry={true}
            style={this.state.passwordError == "true" ? styles.inputInValid : styles.inputValid}
          />
          {this.state.passwordError == "true" ? 
            <Text style={{fontWeight: 'bold', fontSize: 14, color: '#f05d5e', marginBottom: 20}}>
                Pastikan password yang anda masukkan sama
            </Text> : 
            null
          }
          
          <TouchableOpacity onPress={() => this._reset()}
          style={[styles.buttonContainer, styles.registerButton, {marginTop: 30}]}> 
            <Text style={{color: '#ffffff', fontWeight: 'bold'}}>Ubah Password</Text>
          </TouchableOpacity>

          {
            this.state.source <= 0 ? 
            <TouchableOpacity onPress={() => this._login()} style={[styles.buttonContainer, {marginTop: 20, marginBottom: 30}]}>
              <Text>Saya Sudah Punya Akun</Text>
            </TouchableOpacity> : null
          }
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