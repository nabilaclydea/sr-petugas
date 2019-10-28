import React, {Component} from 'react';
import {View, ScrollView, Modal, TouchableOpacity, Image, Text, StyleSheet, StatusBar, Dimensions} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import Spinner from 'react-native-loading-spinner-overlay';

class ProfileScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    state = {
        user: {},
        month: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
        spinner: false,
        visibleModal: false,
    };

    _logout() {
        this.setState({spinner: true});
        AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    listener = null;

    componentDidMount() {
        this.listener = this.props.navigation.addListener('willFocus', () => {
            AsyncStorage
                .getItem("user")
                .then(result => this.setState({user: JSON.parse(result)}));
        });
    };

    componentWillUnmount() {
        this.listener.remove();
    };

    _printName() {
        let fullName = this.state.user.nama + "";
        return fullName.split(' ').slice(0,2).join(' ');
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
                <Modal transparent={true} visible={this.state.visibleModal} onRequestClose={() => {this.setState({visibleModal: false})}}>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.setState({visibleModal: false})} style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
                        <TouchableOpacity activeOpacity={1} style={{width: 80 + '%', height: 50 + '%', backgroundColor: '#ffffff', borderRadius: 10}}>
                                <View style={{flexDirection: 'column', justifyContent: 'space-around'}}>
                                    <View style={{justifyContent: 'center', alignItems: 'center', height: 100 + '%'}}>
                                        <Text style={{fontSize: 20, textAlign: 'center'}}>
                                            Apakah anda yakin ingin keluar?
                                        </Text>
                                    </View>
                                    <View style={{flexDirection: 'row', position: 'absolute', bottom: 0}}>
                                        <TouchableOpacity 
                                            onPress={() => this._logout()}
                                            style={{width: 50 + '%', backgroundColor: '#f05d5e', borderBottomLeftRadius: 10}}>
                                            <Text 
                                                style={{paddingVertical: 10, textAlign: 'center', fontWeight: 'bold', color: 'white'}}>
                                                Keluar
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => this.setState({visibleModal: false})} 
                                            style={{width: 50 + '%', backgroundColor: 'grey', borderBottomRightRadius: 10}}>
                                            <Text 
                                                style={{paddingVertical: 10, textAlign: 'center', fontWeight: 'bold', color: 'white'}}>
                                                Tutup
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </Modal>
                <StatusBar backgroundColor={'#00818c'}/>
                <ScrollView>
                    <TouchableOpacity onPress={() => navigate('ProfileEditScreen', {user: this.state.user})} activeOpacity={0.9}  style={{backgroundColor: '#ffffff', width: 100 + '%', height: 220}}>
                        <View style={{alignItems: 'center'}}>
                            <View style={{width: 80 + '%', justifyContent: 'center', height: 130, marginTop: 10}}>
                                <View style={{alignItems: 'center', height: 100}}>
                                    <Image style={{borderRadius: 100, width: 100, height: 100}} source={require('../../assets/images/user.png')} />
                                    <View style={{position: 'absolute', flexDirection: 'row', alignItems: 'center', right: 0}}>
                                        <Text style={{color: '#00818c', marginRight: 5 + '%'}}>ubah profil</Text>
                                        <Image style={{width: 10, height: 10}} source={require('../../assets/images/edit.png')} />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{justifyContent: 'center', alignItems: 'center', width: 100 + '%', height: 30}}>
                            <Text style={{fontWeight: 'bold', fontSize: 18}}>{this._printName()}</Text>
                        </View>
                        <View style={{justifyContent: 'center', width: 100 + '%'}}>
                            <View style={{flexDirection:  'row', justifyContent: 'center'}}>
                                <View style={{flexDirection: 'column', alignItems: 'center', marginRight: 3 + '%'}}>
                                    <Text style={{color: '#019ca9', fontSize: 14}}>{this.state.user.idJenisKelamin <= 0 ? 'Laki-laki' : 'Perempuan'}</Text>
                                    <Text style={{color: '#c4c4c4', fontSize: 10}}>jenis kelamin</Text>
                                </View>
                                <View style={{flexDirection: 'column', alignItems: 'center', marginLeft: 3 + '%'}}>
                                    <Text style={{color: '#019ca9', fontSize: 14}}>
                                        {
                                            ("" + this.state.user.tanggalLahir).substring(8) + " " +
                                            this.state.month[parseInt(("" + this.state.user.tanggalLahir).substring(5,7)) - 1] + " " +
                                            ("" + this.state.user.tanggalLahir).substring(0,4)
                                        }
                                    </Text>
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
                    <TouchableOpacity onPress={() => navigate('ResetPasswordScreen', {username: this.state.user.username, source: 1})} activeOpacity={0.8} style={{backgroundColor: '#ffffff', justifyContent: 'center', width: 100 + '%', height: 50}}>
                        <Text style={{marginLeft: 5 + '%'}}>Ubah Password</Text>
                        <View style={{position: 'absolute', right: 5 + '%'}}>
                            <Image style={{width: 13, height: 13}} source={require('../../assets/images/right-arrow.png')} />
                        </View>
                    </TouchableOpacity>
                    <View style={{backgroundColor: '#fafafa', width: 100 + '%', height: 1}}></View>
                    <TouchableOpacity
                        onPress={() => this.setState({visibleModal: true})}
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
