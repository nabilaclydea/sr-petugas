import React, {Component} from 'react';
import {View, ScrollView, TouchableOpacity, Image, Text, TextInput, Picker, StyleSheet, StatusBar, Dimensions} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {StackActions} from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay'
import AsyncStorage from "@react-native-community/async-storage";
import HealthcareAPI from "../api/HealthcareAPI";

class ProfileEditScreen extends Component {

    static navigationOptions = {
        headerStyle: {
            color: '#ffffff',
        },
        headerTintColor: '#000000',
        headerTitle:
            <View>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: '#000000'}} >Ubah Profil</Text>
            </View>
        ,
    };

    state = {
        user: {},
        nama: "",
        idJenisKelamin: 0,
        tanggalLahir: new Date(),
        isDateTimePickerVisible: false,
        spinner: false,
    };

    componentWillMount() {

        let user = this.props.navigation.getParam("user");
        this.setState({user: user, nama: user.nama,
            idJenisKelamin: user.idJenisKelamin, tanggalLahir: new Date(("" + user.tanggalLahir))});

    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        this.setState({tanggalLahir: date});
        this._hideDateTimePicker();
    };

    _editProfile() {
        this.setState({spinner: !this.state.spinner});

        HealthcareAPI.post(
            '/profile/tk/update',
            {
                idTenagaKesehatan: this.state.user.idTenagaKesehatan,
                nama: this.state.nama,
                idJenisKelamin: this.state.idJenisKelamin,
                tanggalLahir: this.state.tanggalLahir.getFullYear() + "-"
                    + this._twoDigit((this.state.tanggalLahir.getMonth() + 1)) + "-"
                    + this._twoDigit(this.state.tanggalLahir.getDate())
            }
        )
            .then(() => {
                console.log(this.state.idJenisKelamin);
                let user = this.state.user;
                user.nama = this.state.nama;
                user.idJenisKelamin = this.state.idJenisKelamin;
                user.tanggalLahir = this.state.tanggalLahir.getFullYear() + "-"
                    + this._twoDigit((this.state.tanggalLahir.getMonth() + 1)) + "-"
                    + this._twoDigit(this.state.tanggalLahir.getDate());
                AsyncStorage.setItem("user", JSON.stringify(user));
                this.setState({spinner: !this.state.spinner});
                const popAction = StackActions.pop({
                    n: 1,
                });

                this.props.navigation.dispatch(popAction);
            });

    };

    _twoDigit(digit) {
        if(digit < 10) {
            return "0" + digit;
        } else {
            return digit;
        }
    }

    render () {
        return(
            <View style={styles.firstLayer}>
                <Spinner
                    animation={'slide'}
                    visible={this.state.spinner}
                    textContent={'Memperbarui Profil...'}
                    textStyle={{color: '#ffffff'}}
                />
                <StatusBar backgroundColor={'#00818c'}/>
                <ScrollView>
                    {/* <View style={{backgroundColor: '#ffffff', width: 100 + '%', height: 130}}>
                        <TouchableOpacity>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 100 + '%'}}>
                                <View style={{width: 100, height: 100}}>
                                    <Image style={{borderRadius: 100, width: 100, height: 100}} source={require('../../assets/images/profil.jpg')} />
                                    <View style={{position: 'absolute', width: 30, height: 30, right: 0, bottom: 0}}>
                                        <View style={{backgroundColor: '#000000', opacity: 0.4, borderRadius: 100, width: 30, height: 30}}>
                                        </View>
                                        <Image style={{position: 'absolute', width: 30, height: 30}} source={require('../../assets/images/camera.png')} />
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View> */}
                    <View style={{backgroundColor: '#ffffff', width: 100 + '%', height: 280}}>
                        <View style={{marginHorizontal: 5 + '%', marginTop: 5 + '%'}}>
                            <View>
                                <Text style={{color: '#cacaca'}}>Nama</Text>
                                <TextInput
                                    onChangeText={(text) => this.setState({nama: text})}
                                    value={this.state.nama}
                                    placeholder={'Nama'} style={{marginLeft: 4, borderBottomColor: '#c4c4c4', borderBottomWidth: 1}} />
                            </View>
                            <View style={{marginTop: 2 + '%'}}>
                                <Text style={{color: '#cacaca'}}>Jenis Kelamin</Text>
                                <View style={{width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1}}>
                                    <Picker
                                        selectedValue={this.state.idJenisKelamin}
                                        onValueChange={(itemValue) => this.setState({idJenisKelamin: itemValue})}
                                    >
                                        <Picker.Item label={'Laki-laki'} value={0}/>
                                        <Picker.Item label={'Perempuan'} value={1}/>
                                    </Picker>
                                </View>
                            </View>
                            <View style={{marginTop: 2 + '%'}}>
                                <Text style={{color: '#cacaca'}}>Tanggal Lahir</Text>
                                <View style={{borderBottomColor: '#c4c4c4', borderBottomWidth: 1}}>
                                    <TouchableOpacity onPress={this._showDateTimePicker}>
                                        <TextInput value={
                                            this.state.tanggalLahir.getDate() + " / " +
                                            (this.state.tanggalLahir.getMonth() + 1) + " / " +
                                            this.state.tanggalLahir.getFullYear()
                                        } editable={false} selectTextOnFocus={false} style={{color: '#000000', marginLeft: 5}} />
                                    </TouchableOpacity>
                                </View>
                                <DateTimePicker
                                    date={this.state.tanggalLahir}
                                    isVisible={this.state.isDateTimePickerVisible}
                                    onConfirm={this._handleDatePicked}
                                    onCancel={this._hideDateTimePicker}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center', width: 100 + '%', height: 80}}>
                        <TouchableOpacity onPress={() => this._editProfile()} style={{backgroundColor: '#00a6fb', justifyContent: 'center', alignItems: 'center', width: 80 + '%', height: 40, borderRadius: 5}}>
                            <Text style={{color: '#ffffff', fontWeight: 'bold'}}>Simpan</Text>
                        </TouchableOpacity>
                    </View>
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

export default ProfileEditScreen;