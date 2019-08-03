import React, { Component } from 'react';
import {View} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import {NavigationActions, StackActions} from "react-navigation";

class AuthScreen extends Component {

    componentWillMount(){
        AsyncStorage
            .getItem('user')
            .then(result => {
                let user = JSON.parse(result);
                let routeName = "";
                if(user) {
                    routeName = "HomeScreen";
                } else {
                    routeName = "LoginScreen";
                }
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: routeName })],
                });
                this.props.navigation.dispatch(resetAction);
            });
    }

    render() {
        return (
            <View></View>
        );
    }

}

export default AuthScreen;