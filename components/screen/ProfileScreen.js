import React, {Component} from 'react';
import {View, ScrollView, TouchableOpacity, Image, Text, StyleSheet, StatusBar, Dimensions} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import Spinner from 'react-native-loading-spinner-overlay';

let name = 'Budi Sudrajat';

class ProfileScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    state = {
        spinner: false,
    };

    _logout() {
        this.setState({spinner: true});
        AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    render() {

        const {navigate} = this.props.navigation;

        return (
            <View style={styles.firstLayer}>
                <Spinner
                    animation={'slide'}
                    visible={this.state.spinner}
                    textContent={'Mencoba Keluar...'}
                    textStyle={{color: '#ffffff'}}
                />
                <StatusBar backgroundColor={'#00818c'}/>
                <ScrollView>
                    <TouchableOpacity onPress={() => navigate('ProfileEditScreen')} activeOpacity={0.9}  style={{backgroundColor: '#ffffff', width: 100 + '%', height: 220}}>
                        <View style={{alignItems: 'center'}}>
                            <View style={{width: 80 + '%', justifyContent: 'center', height: 130, marginTop: 10}}>
                                <View style={{alignItems: 'center', height: 100}}>
                                    <Image style={{borderRadius: 100, width: 100, height: 100}} source={require('../../assets/images/profil.jpg')} />
                                    <View style={{position: 'absolute', flexDirection: 'row', alignItems: 'center', right: 0}}>
                                        <Text style={{color: '#00818c', marginRight: 5 + '%'}}>ubah profil</Text>
                                        <Image style={{width: 10, height: 10}} source={require('../../assets/images/edit.png')} />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{justifyContent: 'center', alignItems: 'center', width: 100 + '%', height: 30}}>
                            <Text style={{fontWeight: 'bold', fontSize: 18}}>{name}</Text>
                        </View>
                        <View style={{justifyContent: 'center', width: 100 + '%'}}>
                            <View style={{flexDirection:  'row', justifyContent: 'center'}}>
                                <View style={{flexDirection: 'column', alignItems: 'center', marginRight: 3 + '%'}}>
                                    <Text style={{color: '#019ca9', fontSize: 14}}>Laki-laki</Text>
                                    <Text style={{color: '#c4c4c4', fontSize: 10}}>jenis kelamin</Text>
                                </View>
                                <View style={{flexDirection: 'column', alignItems: 'center', marginLeft: 3 + '%'}}>
                                    <Text style={{color: '#019ca9', fontSize: 14}}>20 Januari 1990</Text>
                                    <Text style={{color: '#c4c4c4', fontSize: 10}}>tanggal lahir</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{justifyContent: 'center', width: 100 + '%', height: 25}}>
                        <Text style={{color: '#000000', fontWeight: 'bold', marginLeft: 3 + '%'}}>Lainnya</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.8} style={{backgroundColor: '#ffffff', justifyContent: 'center', width: 100 + '%', height: 50}}>
                        <Text style={{marginLeft: 5 + '%'}}>Syarat dan Ketentuan</Text>
                        <View style={{position: 'absolute', right: 5 + '%'}}>
                            <Image style={{width: 13, height: 13}} source={require('../../assets/images/right-arrow.png')} />
                        </View>
                    </TouchableOpacity>
                    <View style={{backgroundColor: '#fafafa', width: 100 + '%', height: 1}}></View>
                    <TouchableOpacity activeOpacity={0.8} style={{backgroundColor: '#ffffff', justifyContent: 'center', width: 100 + '%', height: 50}}>
                        <Text style={{marginLeft: 5 + '%'}}>Kebijakan Privasi</Text>
                        <View style={{position: 'absolute', right: 5 + '%'}}>
                            <Image style={{width: 13, height: 13}} source={require('../../assets/images/right-arrow.png')} />
                        </View>
                    </TouchableOpacity>
                    <View style={{backgroundColor: '#fafafa', width: 100 + '%', height: 1}}></View>
                    <TouchableOpacity
                        onPress={() => this._logout()}
                        activeOpacity={0.8} style={{backgroundColor: '#ffffff', justifyContent: 'center', width: 100 + '%', height: 50}}>
                        <Text style={{marginLeft: 5 + '%'}}>Keluar</Text>
                        <View style={{position: 'absolute', right: 5 + '%'}}>
                            <Image style={{width: 13, height: 13}} source={require('../../assets/images/right-arrow.png')} />
                        </View>
                    </TouchableOpacity>
                    <View style={{backgroundColor: '#fafafa', width: 100 + '%', height: 1}}></View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    firstLayer: {
        width: 100 + '%',
        height: 100 + '%',
        backgroundColor: '#f2f5f7'
    }
});

export default ProfileScreen;