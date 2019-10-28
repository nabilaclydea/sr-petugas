import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import {NavigationActions, StackActions} from "react-navigation";
import HealthcareAPI from "../api/HealthcareAPI";
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from "@react-native-community/async-storage";

class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            spinner: false,
            error: false,
            errorMessage: '',
        };
    }

    _login() {
        if(this.state.username.replace(/\s/g, '') === '') {
            this.setState({error: true, errorMessage: 'Masukkan username'})
        } else {
            if(this.state.password === '') {
                this.setState({error: true, errorMessage: 'Masukkan password'})
            } else {
                this.setState({spinner: true});
                HealthcareAPI
                    .post(
                        '/login',
                        {
                            username: this.state.username,
                            password: this.state.password,
                            role: 3
                        }
                    )
                    .then(response => {
                        this.setState({spinner: false});
                        if(response.data.status === "200") {
                            AsyncStorage.setItem('user', JSON.stringify(response.data));
                            this.props.navigation.navigate('Auth');
                        } else {
                            this.setState({error: true, spinner: false, errorMessage: 'Username / Password yang anda masukkan salah'})
                        }
                    })
                    .catch(error => this.setState({error: true, spinner: false, errorMessage: 'Username / Password yang anda masukkan salah'}));
            }
        }
    }

    _forgetPassword() {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({
                routeName: "ForgetPasswordScreen",
            })],
        });
        this.props.navigation.dispatch(resetAction);
    }

    render() {
        return (
            <View style={styles.container}>
                <Spinner
                    animation={'slide'}
                    visible={this.state.spinner}
                    textContent={'Mencoba Masuk...'}
                    textStyle={{color: '#ffffff'}}
                />
                <Image source={require('../../assets/images/logo.png')}
                       style={{width: 70, height: 70}} />
                <Text style={styles.logoText}>SiRujuk</Text>

                <TextInput
                    value={this.state.username}
                    onChangeText={(username) => this.setState({ username })}
                    placeholder={'Username'}
                    style={this.state.error ? styles.inputInValid : styles.inputValid}
                />
                <TextInput
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
                    placeholder={'Password'}
                    secureTextEntry={true}
                    style={this.state.error ? styles.inputInValid : styles.inputValid}
                />
                {this.state.error ? 
                <Text style={{fontWeight: 'bold', fontSize: 14, color: '#f05d5e', marginBottom: 20}}>{this.state.errorMessage}</Text> : null}

                <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this._login()}>
                    <Text style={{color: '#ffffff', fontWeight: 'bold'}}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this._forgetPassword()} style={styles.buttonContainer}>
                    <Text>Lupa password?</Text>
                </TouchableOpacity>

            </View>
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
    logoText: {
        fontSize: 40,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: 'center',
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:10,
        width: 80 + '%',
        height: 40,
        borderRadius: 5
    },
    loginButton: {
        backgroundColor: "#00b5ec",
    },
    registerButton: {
        backgroundColor: "#019ca9",
    }
});

export default LoginScreen;