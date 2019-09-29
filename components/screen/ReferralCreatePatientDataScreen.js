import React, { Component } from 'react';
import {
    Alert,
    View,
    ScrollView,
    Picker,
    TouchableOpacity,
    TextInput,
    Image,
    Text,
    StyleSheet,
    StatusBar
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import HealthcareAPI from '../api/HealthcareAPI';
import axios from 'axios';

class ReferralCreatePatientDataScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerStyle: {
                color: '#ffffff',
            },
            headerTintColor: '#000000',
            headerTitle:
                <View>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000000' }}>
                        {navigation.getParam('referralType') <= 1 ? 'Rujuk Poli' : 'Rujuk Emergency'}
                    </Text>
                </View>
            ,
        };
    };
    
    state = {
        isDateTimePickerVisible: false,
        referralType: this.props.navigation.getParam('referralType'),
        insurancePatientType: 1,
        isSearched: false,
        isFound: false,
        isSelected: false,
        spinner: false,
        identityNumberChanged: '',
        identityNumber: '',
        patientSearchResult: {},
        patientSelected: {},
        birthDate: new Date(),
        isPatientFound: false,
        isPatientNotFoundSelected: false,
        required: {},
        inputRequired: [true, true, true, true],
        inputRequiredData: ['name', 'noHandphone', 'alamat', 'kodePos'],
        inputRequiredDataRead: ['Nama', 'Nomor Telepon Pribadi', 'Alamat', 'Kode Pos'],
        referralForm: { rujukan: {}, pasien: {}, jadwalPasien: {}, rekamMedis: {}, docPemeriksaanDarah: {}, docPemeriksaanLain: {} },
        insuranceType: [],
        identityType: [],
        gender: [],
        religion: [],
        education: [],
        marriage: [],
        province: [],
        city: [],
    };



    componentWillMount() {
        this._newPatient();
    }

    _newPatient() {
        let referralForm = { rujukan: {}, pasien: {}, jadwalPasien: {}, rekamMedis: {}, docPemeriksaanDarah: {}, docPemeriksaanLain: {} };
        this.setState({referralForm: referralForm});
        
        axios
            .all([this._init(), this._insuranceType(), this._identityType(), this._gender(),
            this._religion(), this._education(), this._marriage(), this._province(), this._city()])
    }

    _init() {
        let url = '';
        if (this.state.referralType <= 1) {
            url = '/referral/poli/init';
        } else {
            url = '/referral/emergency/init'
        }
        HealthcareAPI
            .get(url)
            .then(response => 
                {
                    let tmp = response.data;
                    if(this.state.referralType <= 1) {
                        tmp.rujukan.isRujukEmergency = 0;
                    } else {
                        tmp.rujukan.isRujukEmergency = 1;
                    }
                    this.setState({ referralForm: tmp});
                }
            )
    }

    _insuranceType() {
        HealthcareAPI
            .get('/patient/type/list')
            .then(response => 
                {
                    let list = response.data;
                    let tmp = this.state.referralForm;
                    tmp.rujukan.statusBayar = list[0].idJenisPasien;
                    this.setState({ insuranceType: list, referralForm: tmp});
                }
            )
    }

    _identityType() {
        HealthcareAPI
            .get('/patient/identity/type/list')
            .then(response => 
                {
                    let list = response.data;
                    let tmp = this.state.referralForm;
                    tmp.pasien.idJenisIdentitas = list[0].idJenisIdentitas;
                    this.setState({ identityType: list, referralForm: tmp});
                }
            )
    }

    _gender() {
        HealthcareAPI
            .get('/gender/list')
            .then(response => 
                {
                    let list = response.data;
                    let tmp = this.state.referralForm;
                    tmp.pasien.idJenisKelamin = list[0].idJenisKelamin;
                    this.setState({ gender: list, referralForm: tmp });
                }
            )
    }

    _religion() {
        HealthcareAPI
            .get('/religion/list')
            .then(response => 
                {
                    let list = response.data;
                    let tmp = this.state.referralForm;
                    tmp.pasien.idAgama = list[0].idAgama;
                    this.setState({ religion: list, referralForm: tmp });
                }
            )
    }

    _education() {
        HealthcareAPI
            .get('/education/list')
            .then(response => 
                {
                    let list = response.data;
                    let tmp = this.state.referralForm;
                    tmp.pasien.idJenjangPendidikan = list[0].idJenjangPendidikan;
                    this.setState({ education: list, referralForm: tmp });
                }
            )
    }

    _marriage() {
        HealthcareAPI
            .get('/marriage/list')
            .then(response => 
                {
                    let list = response.data;
                    let tmp = this.state.referralForm;
                    tmp.pasien.idStatusNikah = list[0].idStatusNikah;
                    this.setState({ marriage: list, referralForm: tmp });
                }
            )
    }

    _province() {
        HealthcareAPI
            .get('/province/list')
            .then(response => 
                {
                    let list = response.data;
                    let tmp = this.state.referralForm;
                    tmp.pasien.idProvinsi = list[0].idProvinsi;
                    this.setState({ province: list, referralForm: tmp });
                }
            )
    }

    _city() {
        HealthcareAPI
            .get('/city/list')
            .then(response => 
                {
                    let list = response.data;
                    let tmp = this.state.referralForm;
                    tmp.pasien.idKota = list[0].idKota;
                    tmp.pasien.tempatLahir = list[0].idKota;
                    this.setState({ city: list, referralForm: tmp });
                }
            )
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        this._hideDateTimePicker();
    };

    _setFormWizardScreen(isActive, index, text, isLast) {
        return <View
            style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginRight: (isLast ? 10 : 0) }}>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: (isActive ? '#00818c' : '#c4c4c4'),
                width: 15,
                height: 15,
                borderRadius: 100
            }}>
                <Text style={{ color: '#ffffff', fontSize: 8 }}>
                    {index}
                </Text>
            </View>
            <Text style={{
                color: (isActive ? '#00818c' : '#c4c4c4'),
                fontSize: 8,
                fontWeight: 'bold',
                marginLeft: 5
            }}>{text}</Text>
            {isLast ? null : <View
                style={{ backgroundColor: (isActive ? '#00818c' : '#c4c4c4'), width: 20, height: 2, marginLeft: 5 }} />}
        </View>
    };

    _searchPatient() {
        this.setState({ spinner: !this.state.spinner, identityNumber: this.state.identityNumberChanged, isPatientNotFoundSelected: false });

        HealthcareAPI
            .get('/patient', {
                params: {
                    identity_number: this.state.identityNumberChanged
                }
            })
            .then(response => {
                let tmp = this.state.referralForm;
                let patientFound = false;
                if (response.data.idPasien !== null) {
                    tmp.pasien = response.data;
                    patientFound = true;
                    this.setState({referralForm: tmp});
                } else {
                    this._newPatient();
                }
                this.setState({ spinner: false, isSearched: true, isFound: patientFound});
            })
    };

    _setSearchResultScreen() {
        if (this.state.isSearched) {
            return <View style={{ width: 100 + '%', minHeight: 150, backgroundColor: '#ffffff', marginTop: 10 }}>
                <View style={{ margin: 5 + '%' }}>
                    <Text style={{ color: '#000000', fontSize: 12, fontWeight: 'bold' }}>Hasil Pencarian</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        {
                            this.state.isFound
                                ?
                                <Image style={{ width: 80, height: 80, borderRadius: 4 }}
                                    source={require('../../assets/images/patient.jpg')} />
                                :
                                <View style={{ justifyContent: 'center', height: 80 }}>
                                    <Text style={{ color: '#000000', fontSize: 10 }}>Maaf, nomor identitas yang anda isi
                                        tidak ditemukan</Text>
                                </View>
                        }
                        {
                            this.state.isFound
                                ?
                                <View style={{ marginLeft: 20 }}>
                                    <Text style={{ color: '#000000', fontSize: 14, fontWeight: 'bold' }}>{this.state.referralForm.pasien.nama}</Text>
                                    <Text
                                        style={{ color: '#cacaca', fontSize: 10, marginTop: 10 }}>{this.state.referralForm.pasien.noIdentitas}</Text>
                                </View>
                                :
                                null
                        }
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({isSelected: true});
                                if (this.state.isFound) {
                                    this._submitNewPatient();
                                } else {
                                    this.setState({ isPatientNotFoundSelected: true, isSearched: false});
                                }
                            }}
                            style={{
                                position: 'absolute',
                                right: 0,
                                justifyContent: 'center',
                                alignItems: 'center',
                                minWidth: 65,
                                height: 40,
                                backgroundColor: '#28c667',
                                borderRadius: 5
                            }}
                        >
                            <Text style={{ color: '#ffffff', fontSize: 12, fontWeight: 'bold' }}>
                                {this.state.isFound ? 'Pilih' : 'Isi Manual'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>;
        }
    };

    _setPatientDataScreen() {
        let patient = this.state.patientSelected;

        if (this.state.isPatientNotFoundSelected) {
            return <View>
                <View style={{ width: 100 + '%', minHeight: 450, backgroundColor: '#ffffff', marginTop: 10 }}>
                    <View style={{ margin: 5 + '%' }}>
                        {!this.state.isPatientFound && <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: '#f05d5e', textAlign: 'center' }}>Pasien tidak ditemukan dalam sistem,
                                silakan isi data pasien secara manual.</Text>
                        </View>}
                        <View style={{ marginTop: 15 }}>
                            <Text style={{ color: '#cacaca' }}>
                                Nama
                                <Text style={{ color: '#f05d5e' }}> *</Text>
                            </Text>
                            <TextInput
                                ref={(input1) => {
                                    this.input1 = input1
                                }}
                                placeholder={'Nama'}
                                onChangeText={(text) => {
                                    let tmp = this.state.referralForm;
                                    tmp.pasien.nama = text;
                                    this.setState({ referralForm: tmp });
                                }}
                                style={{
                                    marginLeft: 4,
                                    borderBottomColor: (this._isError('nama') ? '#c4c4c4' : '#f05d5e'),
                                    borderBottomWidth: 1
                                }} />
                            {!this._isError('nama') &&
                                <Text style={{ color: '#f05d5e', fontSize: 12, marginLeft: 4 }}>Masukkan nama pasien</Text>}
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <Text style={{ color: '#cacaca' }}>
                                Jenis Kelamin
                                <Text style={{ color: '#f05d5e' }}> *</Text>
                            </Text>
                            <View style={{ width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1 }}>
                                <Picker
                                    selectedValue={this.state.referralForm.pasien.idJenisKelamin}
                                    onValueChange={(itemValue) => {
                                        let tmp = this.state.referralForm;
                                        tmp.pasien.idJenisKelamin = itemValue;
                                        this.setState({ referralForm: tmp })
                                    }}
                                >
                                    {
                                        this.state.gender.map(type =>
                                            <Picker.Item label={type.namaJenisKelamin} value={type.idJenisKelamin} key={type.idJenisKelamin} />
                                        )
                                    }
                                </Picker>
                            </View>
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <Text style={{ color: '#cacaca' }}>
                                Tempat Lahir
                                <Text style={{ color: '#f05d5e' }}> *</Text>
                            </Text>
                            <View style={{ width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1 }}>
                                <Picker
                                    selectedValue={this.state.referralForm.pasien.tempatLahir}
                                    onValueChange={(itemValue) => {
                                        let tmp = this.state.referralForm;
                                        tmp.pasien.tempatLahir = itemValue;
                                        this.setState({ referralForm: tmp });
                                    }}
                                >
                                    {
                                        this.state.city.map(type =>
                                            <Picker.Item label={type.namaKota} value={type.namaKota} key={type.idKota} />
                                        )
                                    }
                                </Picker>
                            </View>
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <Text style={{ color: '#cacaca' }}>
                                Tanggal Lahir
                                <Text style={{ color: '#f05d5e' }}> *</Text>
                            </Text>
                            <View style={{ borderBottomColor: '#c4c4c4', borderBottomWidth: 1 }}>
                                <TouchableOpacity onPress={this._showDateTimePicker}>
                                    <TextInput
                                        value={this.state.birthDate.getDate() + ' / ' + (this.state.birthDate.getMonth() + 1) + ' / ' + this.state.birthDate.getFullYear()}
                                        editable={false}
                                        selectTextOnFocus={false}
                                        style={{ color: '#000000', marginLeft: 5 }} />
                                </TouchableOpacity>
                            </View>
                            <DateTimePicker
                                date={this.state.birthDate}
                                isVisible={this.state.isDateTimePickerVisible}
                                onConfirm={(date) => {
                                    let tmp = this.state.birthDate;
                                    tmp = date;
                                    let tmp2 = this.state.referralForm;
                                    tmp2.pasien.tanggalLahir = tmp.getFullYear() + '-' + this._doubleDigit((tmp.getMonth() + 1)) + '-' + this._doubleDigit(tmp.getDate());
                                    this._hideDateTimePicker;
                                    this.setState({ isDateTimePickerVisible: false, birthDate: tmp, referralForm: tmp2 });
                                }}
                                onCancel={this._hideDateTimePicker}
                            />
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <Text style={{ color: '#cacaca' }}>Umur</Text>
                            <TextInput value={this._age(this.state.birthDate)} editable={false} selectTextOnFocus={false}
                                style={{ color: '#000000', marginLeft: 5 }} />
                        </View>
                    </View>
                </View>

                <View style={{ width: 100 + '%', minHeight: 200, backgroundColor: '#ffffff', marginTop: 10 }}>
                    <View style={{ margin: 5 + '%' }}>
                        <View>
                            <Text style={{ color: '#cacaca' }}>
                                Telepon Pribadi
                                <Text style={{ color: '#f05d5e' }}> *</Text>
                            </Text>
                            <TextInput
                                ref={(input2) => {
                                    this.input2 = input2
                                }}
                                keyboardType={'numeric'}
                                placeholder={'Contoh: 081234567890'}
                                onChangeText={(text) => {
                                    let tmp = this.state.referralForm;
                                    tmp.pasien.noHandphone = text;
                                    this.setState({ referralForm: tmp });
                                }}
                                style={{
                                    marginLeft: 4,
                                    borderBottomColor: (this._isError('noHandphone') ? '#c4c4c4' : '#f05d5e'),
                                    borderBottomWidth: 1
                                }}
                            />
                            {!this._isError('noHandphone') &&
                                <Text style={{ color: '#f05d5e', fontSize: 12, marginLeft: 4 }}>Masukkan nomor telepon pribadi
                                pasien atau keluarga/kerabat</Text>}
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <Text style={{ color: '#cacaca' }}>Telepon Rumah</Text>
                            <TextInput
                                keyboardType={'numeric'}
                                placeholder={'Contoh: 0217567890'}
                                onChangeText={(text) => {
                                    let tmp = this.state.referralForm;
                                    tmp.pasien.noTeleponRumah = text;
                                    this.setState({ referralForm: tmp });
                                }}
                                style={{ marginLeft: 4, borderBottomColor: '#c4c4c4', borderBottomWidth: 1 }} />
                        </View>
                    </View>
                </View>

                <View style={{ width: 100 + '%', height: 300, backgroundColor: '#ffffff', marginTop: 10 }}>
                    <View style={{ margin: 5 + '%' }}>
                        <View>
                            <Text style={{ color: '#cacaca' }}>
                                Agama
                                <Text style={{ color: '#f05d5e' }}> *</Text>
                            </Text>
                            <View style={{ width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1 }}>
                                <Picker
                                    selectedValue={this.state.referralForm.pasien.idAgama}
                                    onValueChange={(itemValue) => {
                                        let tmp = this.state.referralForm;
                                        tmp.pasien.idAgama = itemValue;
                                        this.setState({ referralForm: tmp });
                                    }}
                                >
                                    {
                                        this.state.religion.map(type =>
                                            <Picker.Item label={type.namaAgama} value={type.idAgama} key={type.idAgama} />
                                        )
                                    }
                                </Picker>
                            </View>
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <Text style={{ color: '#cacaca' }}>
                                Jenjang Pendidikan
                                <Text style={{ color: '#f05d5e' }}> *</Text>
                            </Text>
                            <View style={{ width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1 }}>
                                <Picker
                                    selectedValue={this.state.referralForm.pasien.idJenjangPendidikan}
                                    onValueChange={(itemValue) => {
                                        let tmp = this.state.referralForm;
                                        tmp.pasien.idJenjangPendidikan = itemValue;
                                        this.setState({ referralForm: tmp })
                                    }}
                                >
                                    {
                                        this.state.education.map(type =>
                                            <Picker.Item label={type.namaJenjangPendidikan} value={type.idJenjangPendidikan} key={type.idJenjangPendidikan} />
                                        )
                                    }
                                </Picker>
                            </View>
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <Text style={{ color: '#cacaca' }}>
                                Status Nikah
                                <Text style={{ color: '#f05d5e' }}> *</Text>
                            </Text>
                            <View style={{ width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1 }}>
                                <Picker
                                    selectedValue={this.state.referralForm.pasien.idStatusNikah}
                                    onValueChange={(itemValue) => {
                                        let tmp = this.state.referralForm;
                                        tmp.pasien.idStatusNikah = itemValue;
                                        this.setState({ referralForm: tmp });
                                    }}
                                >
                                    {
                                        this.state.marriage.map(type =>
                                            <Picker.Item label={type.namaStatusNikah} value={type.idStatusNikah} key={type.idStatusNikah} />
                                        )
                                    }
                                    <Picker.Item label={'Belum Menikah'} value={0} />
                                    <Picker.Item label={'Menikah'} value={1} />
                                </Picker>
                            </View>
                        </View>
                        {/* <View style={{ marginTop: 15 }}>
                            <Text style={{ color: '#cacaca' }}>
                                Negara Asal
                                <Text style={{ color: '#f05d5e' }}> *</Text>
                            </Text>
                            <View style={{ width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1 }}>
                                <Picker
                                    selectedValue={patient.nationality}
                                    onValueChange={(itemValue) => {
                                        patient.nationality = itemValue;
                                        this.setState({ patient: patient })
                                    }}
                                >
                                    <Picker.Item label={'Indonesia'} value={1} />
                                    <Picker.Item label={'Malaysia'} value={2} />
                                </Picker>
                            </View>
                        </View> */}
                    </View>
                </View>

                <View style={{ width: 100 + '%', minHeight: 350, backgroundColor: '#ffffff', marginTop: 10 }}>
                    <View style={{ margin: 5 + '%' }}>
                        <View>
                            <Text style={{ color: '#cacaca' }}>
                                Alamat
                                <Text style={{ color: '#f05d5e' }}> *</Text>
                            </Text>
                            <TextInput
                                ref={(input3) => {
                                    this.input3 = input3
                                }}
                                placeholder={'Alamat'}
                                onChangeText={(text) => {
                                    let tmp = this.state.referralForm;
                                    tmp.pasien.alamat = text;
                                    this.setState({ referralForm: tmp });
                                }}
                                style={{
                                    marginLeft: 4,
                                    borderBottomColor: (this.state.inputRequired[3] ? '#c4c4c4' : '#f05d5e'),
                                    borderBottomWidth: 1
                                }}
                            />
                            {!this._isError('alamat') &&
                                <Text style={{ color: '#f05d5e', fontSize: 12, marginLeft: 4 }}>Masukkan alamat tempat tinggal
                                pasien</Text>}
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <Text style={{ color: '#cacaca' }}>
                                Provinsi
                                <Text style={{ color: '#f05d5e' }}> *</Text>
                            </Text>
                            <View style={{ width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1 }}>
                                <Picker
                                    selectedValue={this.state.referralForm.pasien.idProvinsi}
                                    onValueChange={(itemValue) => {
                                        let tmp = this.state.referralForm;
                                        tmp.pasien.idProvinsi = itemValue;
                                        tmp.pasien.idKota = null;
                                        this.setState({ referralForm: tmp });
                                    }}
                                >
                                    {
                                        this.state.province.map(type =>
                                            <Picker.Item label={type.namaProvinsi} value={type.idProvinsi} key={type.idProvinsi} />
                                        )
                                    }
                                </Picker>
                            </View>
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <Text style={{ color: '#cacaca' }}>
                                Kota / Kabupaten
                                <Text style={{ color: '#f05d5e' }}> *</Text>
                            </Text>
                            <View style={{ width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1 }}>
                                <Picker
                                    selectedValue={this.state.referralForm.pasien.idKota}
                                    onValueChange={(itemValue) => {
                                        let tmp = this.state.referralForm;
                                        tmp.pasien.idKota = itemValue;
                                        this.setState({ referralForm: tmp });
                                    }}
                                >
                                    {
                                        this.state.city
                                            .filter(type => type.idKota.substr(0, 2) === this.state.referralForm.pasien.idProvinsi)
                                            .map(type =>
                                                <Picker.Item label={type.namaKota} value={type.idKota} key={type.idKota} />
                                            )
                                    }
                                </Picker>
                            </View>
                        </View>
                        {/* <View style={{marginTop: 15}}>
                            <Text style={{color: '#cacaca'}}>
                                Kecamatan
                                <Text style={{color: '#f05d5e'}}> *</Text>
                            </Text>
                            <View style={{width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1}}>
                                <Picker
                                    selectedValue={patient.district}
                                    onValueChange={(itemValue) => {
                                        patient.district = itemValue;
                                        this.setState({patient: patient});
                                    }}
                                >
                                    <Picker.Item label={'Serpong'} value={1}/>
                                    <Picker.Item label={'Cisauk'} value={2}/>
                                </Picker>
                            </View>
                        </View>
                        <View style={{marginTop: 15}}>
                            <Text style={{color: '#cacaca'}}>
                                Kelurahan
                                <Text style={{color: '#f05d5e'}}> *</Text>
                            </Text>
                            <View style={{width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1}}>
                                <Picker
                                    selectedValue={patient.sub_district}
                                    onValueChange={(itemValue) => {
                                        patient.sub_district = itemValue;
                                        this.setState({patient: patient})
                                    }}
                                >
                                    <Picker.Item label={'Rawa Mekar Jaya'} value={1}/>
                                    <Picker.Item label={'Rawa Buntu'} value={2}/>
                                </Picker>
                            </View>
                        </View> */}
                        <View style={{ marginTop: 15 }}>
                            <Text style={{ color: '#cacaca' }}>
                                Kode Pos
                                <Text style={{ color: '#f05d5e' }}> *</Text>
                            </Text>
                            <TextInput
                                ref={(input4) => {
                                    this.input4 = input4
                                }}
                                keyboardType={'numeric'}
                                placeholder={'Kode Pos'}
                                onChangeText={(text) => {
                                    let tmp = this.state.referralForm;
                                    tmp.pasien.kodePos = text;
                                    this.setState({ referralForm: tmp });
                                }}
                                style={{
                                    marginLeft: 4,
                                    borderBottomColor: (this._isError('kodePos') ? '#c4c4c4' : '#f05d5e'),
                                    borderBottomWidth: 1
                                }}
                            />
                            {!this._isError('kodePos') &&
                                <Text style={{ color: '#f05d5e', fontSize: 12, marginLeft: 4 }}>Masukkan kode pos dari alamat
                                pasien</Text>}
                        </View>
                    </View>
                </View>

                <View style={{ alignItems: 'center', width: 100 + '%', height: 100 }}>
                    <TouchableOpacity
                        onPress={() =>
                            this._submitNewPatient()
                        }
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 80 + '%',
                            height: 35,
                            borderRadius: 5,
                            backgroundColor: '#28c667',
                            marginTop: 20
                        }}>
                        <Text style={{ color: '#ffffff', fontSize: 12, fontWeight: 'bold' }}>Selanjutnya</Text>
                    </TouchableOpacity>
                </View>
            </View>
        }
    };

    _doubleDigit(number) {
        if (number < 10) {
            return '0' + number;
        }
        return number;
    }

    _age(birthDate) {
        let today = new Date();
        let year = today.getFullYear() - birthDate.getFullYear();
        let month = 0;
        if (today.getMonth() >= birthDate.getMonth()) {
            month = today.getMonth() - birthDate.getMonth();
        } else {
            year--;
            month = 12 - (birthDate.getMonth() - today.getMonth());
        }
        let day = 0;
        if (today.getDate() >= birthDate.getDate()) {
            day = today.getDate() - birthDate.getDate();
        } else {
            month--;
            day = 31 - (birthDate.getDate() - today.getDate());

            if (month < 0) {
                month = 11;
                year--;
            }
        }
        return year + ' tahun ' + month + ' bulan ' + day + ' hari';
    }

    _submitNewPatient() {
        let { navigate } = this.props.navigation;

        let required = {};
        let inputRequired = [];
        let inputRequiredData = [];
        let inputRequiredDataRead = [];
        if(this.state.referralForm.rujukan.statusBayar > 1) {
            inputRequired.push(true);
            inputRequiredDataRead.push('Nomor BPJS/Asuransi')
            if(this.state.referralForm.rujukan.statusBayar <= 2) {
                required['noBpjs'] = true;
                delete required['noAsuransiLain'];
                inputRequiredData.push('noBpjs');
            } else {
                required['noAsuransiLain'] = true;
                delete required['noBpjs'];
                inputRequiredData.push('noAsuransiLain');
            }
        }

        if(!this.state.isFound) {
            inputRequired = inputRequired.concat(this.state.inputRequired);
            inputRequiredData = inputRequiredData.concat(this.state.inputRequiredData);
            inputRequiredDataRead = inputRequiredDataRead.concat(this.state.inputRequiredDataRead);
        }

        let patient = this.state.referralForm.pasien;
        let result = true;

        let error = [];
        let errorCount = 0;

        inputRequired.map(function (input, index) {
            let tmp = true;
            if (!patient[inputRequiredData[index]]) {
                tmp = false;
                result = false;
                errorCount = errorCount + 1;

                if (errorCount <= 5) {
                    error.push(inputRequiredDataRead[index])
                }
            }

            required[inputRequiredData[index]] = tmp;
            inputRequired[index] = tmp;
        });        

        if (result) {
            navigate('ReferralCreateScheduleDestinationScreen', {
                referralType: this.state.referralType,
                city: this.state.city,
                referralForm: this.state.referralForm,
                insurancePatientType: this.state.insurancePatientType
            }
            );
        } else {
            let message = 'Pastikan seluruh kolom yang bertanda bintang (*) sudah terisi.';

            if (errorCount <= 5) {
                message = error.join(', ') + ' belum terisi.';
            }

            this.setState({required: required}, () => {});

            Alert.alert('Validasi Gagal', message)
        }
    };

    _isError(key) {

        let required = this.state.required;

        if(key in required) {
            return required[key];
        } else {
            return true;
        }

    }

    // _submitNewPatient() {
    //     let { navigate } = this.props.navigation;

    //     let inputRequired = [];
    //     let inputRequiredData = [];
    //     let inputRequiredDataRead = [];
    //     if(this.state.referralForm.rujukan.statusBayar > 1) {
    //         inputRequired.push(true);
    //         inputRequiredDataRead.push('Nomor BPJS/Asuransi')
    //         if(this.state.referralForm.rujukan.statusBayar <= 2) {
    //             inputRequiredData.push('noBpjs');
    //         } else {
    //             inputRequiredData.push('noAsuransiLain');
    //         }
    //     }
    //     let patient = this.state.referralForm.pasien;
    //     let result = true;

    //     let error = [];
    //     let errorCount = 0;

    //     inputRequired.map(function (input, index) {
    //         let tmp = true;
    //         if (!patient[inputRequiredData[index]]) {
    //             tmp = false;
    //             result = false;
    //             errorCount = errorCount + 1;

    //             if (errorCount < 5) {
    //                 error.push(inputRequiredDataRead[index])
    //             }
    //         }

    //         inputRequired[index] = tmp;
    //     });

    //     this.setState({ inputRequired: inputRequired });

    //     if (result) {
    //         navigate('ReferralCreateScheduleDestinationScreen', {
    //             referralType: this.state.referralType,
    //             referralForm: this.state.referralForm,
    //             city: this.state.city,
    //             insurancePatientType: this.state.insurancePatientType
    //         }
    //         );
    //     } else {
    //         let message = 'Pastikan seluruh kolom yang bertanda bintang (*) sudah terisi.';

    //         if (errorCount <= 5) {
    //             message = error.join(', ') + ' belum terisi.';
    //         }

    //         Alert.alert('Validasi Gagal', message)
    //     }
    // };

    render() {

        return (
            <View style={styles.firstLayer}>
                <Spinner
                    animation={'slide'}
                    visible={this.state.spinner}
                    textContent={'Mencari Data Pasien...'}
                    textStyle={{ color: '#ffffff' }}
                />
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#ffffff',
                    width: 100 + '%',
                    minHeight: 50
                }}>
                    {this._setFormWizardScreen(true, 1, 'Data Pasien', false)}
                    {this._setFormWizardScreen(false, 2, (this.state.referralType <= 1 ? 'Jadwal Rujukan' : 'Faskes Tujuan'), false)}
                    {this._setFormWizardScreen(false, 3, 'Data Rujukan', false)}
                    {this._setFormWizardScreen(false, 4, 'ICD-9 CM', false)}
                    {this._setFormWizardScreen(false, 5, 'ICD-10', true)}
                </View>
                <ScrollView>
                    <View style={{ width: 100 + '%', minHeight: 210, backgroundColor: '#ffffff' }}>
                        <View style={{ marginHorizontal: 5 + '%', marginBottom: 5 + '%' }}>
                            <Text style={{ color: '#cacaca' }}>
                                Jenis Identitas
                                <Text style={{ color: '#f05d5e' }}> *</Text>
                            </Text>
                            <View style={{ width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1 }}>
                                <Picker
                                    selectedValue={this.state.referralForm.pasien.idJenisIdentitas}
                                    onValueChange={(itemValue) => {
                                        let tmp = this.state.referralForm;
                                        tmp.pasien.idJenisIdentitas = itemValue;
                                        this.setState({ referralForm: tmp });
                                    }}
                                >
                                    {
                                        this.state.identityType.map(type =>
                                            <Picker.Item label={type.namaJenisIdentitas} value={type.idJenisIdentitas} key={type.idJenisIdentitas} />
                                        )
                                    }
                                </Picker>
                            </View>
                            <View style={{ marginTop: 15 }}>
                                <View>
                                    <Text style={{ color: '#cacaca' }}>
                                        Nomor Identitas (KTP / SIM / Paspor)
                                    <Text style={{ color: '#f05d5e' }}> *</Text>
                                    </Text>
                                    <TextInput
                                        returnKeyType={'search'}
                                        keyboardType={'numeric'}
                                        onChangeText={(text) => this.setState({ identityNumberChanged: text })}
                                        onSubmitEditing={() => this._searchPatient()}
                                        placeholder={'Nomor Identitas (KTP / SIM / Paspor)'}
                                        style={{ marginLeft: 4, borderBottomColor: '#c4c4c4', borderBottomWidth: 1 }} />
                                </View>
                            </View>
                            <View style={{ marginTop: 15 }}>
                                <Text style={{ color: '#cacaca' }}>
                                    Jenis Asuransi Pasien
                                    <Text style={{ color: '#f05d5e' }}> *</Text>
                                </Text>
                                <View style={{ width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1 }}>
                                    <Picker
                                        selectedValue={this.state.referralForm.rujukan.statusBayar}
                                        onValueChange={(itemValue) => {
                                            let tmp = this.state.referralForm;
                                            tmp.rujukan.statusBayar = itemValue;
                                            this.setState({ referralForm: tmp })
                                        }
                                        }
                                    >
                                        {
                                            this.state.insuranceType.map(type =>
                                                <Picker.Item label={type.namaJenisPasien} value={type.idJenisPasien} key={type.idJenisPasien} />
                                            )
                                        }
                                    </Picker>
                                </View>
                            </View>
                            {
                                 ((this.state.isSearched || this.state.isSelected) && this.state.referralForm.rujukan.statusBayar > 1)
                                    ?
                                    <View style={{ marginTop: 15 }}>
                                        <Text style={{ color: '#cacaca' }}>
                                            {this.state.referralForm.rujukan.statusBayar <= 2 ? 'Nomor BPJS' : 'Nomor Asuransi Lain'}
                                            <Text style={{ color: '#f05d5e' }}> *</Text>
                                        </Text>
                                        <TextInput
                                            ref={(input0) => {
                                                this.input0 = input0
                                            }}
                                            placeholder={this.state.referralForm.rujukan.statusBayar <= 2 ? 'Nomor BPJS' : 'Nomor Asuransi Lain'}
                                            value={
                                                this.state.referralForm.rujukan.statusBayar <=2 ? 
                                                this.state.referralForm.pasien.noBpjs : this.state.referralForm.pasien.noAsuransiLain
                                            }
                                            onChangeText={(text) => {
                                                let tmp = this.state.referralForm;
                                                if (tmp.rujukan.statusBayar <= 2) {
                                                    tmp.pasien.noBpjs = text;
                                                } else {
                                                    tmp.pasien.noAsuransiLain = text;
                                                }
                                                this.setState({ referralForm: tmp });
                                            }}
                                            style={{
                                                marginLeft: 4,
                                                borderBottomColor: 
                                                    (this._isError('noBpjs') && this._isError('noAsuransiLain')) ? 
                                                    '#c4c4c4' : '#f05d5e',
                                                borderBottomWidth: 1
                                            }}
                                        />
                                        {
                                            !(this._isError('noBpjs') && this._isError('noAsuransiLain')) &&
                                            <Text style={{ color: '#f05d5e', fontSize: 12, marginLeft: 4 }}>Masukkan nomor bpjs/asuransi
                                        pasien</Text>}
                                    </View>
                                    :
                                    null
                            }
                             <View style={{ marginTop: 15 }}>
                                    <Text style={{ color: '#cacaca', textAlign: 'center' }}>Jika terdapat di dalam sistem,
                                    data pasien akan terisi secara otomatis.</Text>
                                </View>
                                <View style={{ alignItems: 'center', width: 100 + '%', height: 55 }}>
                                    <TouchableOpacity
                                        onPress={() =>
                                            this._searchPatient()
                                        }
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: 80 + '%',
                                            height: 35,
                                            borderRadius: 5,
                                            backgroundColor: '#00a6fb',
                                            marginTop: 20
                                        }}>
                                        <Text style={{ color: '#ffffff', fontSize: 12, fontWeight: 'bold' }}>Cari
                                        Pasien</Text>
                                    </TouchableOpacity>
                                </View>
                        </View>
                    </View>

                    {this._setSearchResultScreen()}

                    {this._setPatientDataScreen()}


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

export default ReferralCreatePatientDataScreen;