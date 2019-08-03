import React, {Component} from 'react';
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

class ReferralCreatePatientDataScreen extends Component {
    state = {
        isDateTimePickerVisible: false,
        referralType: this.props.navigation.getParam('referralType'),
        insurancePatientType: 1,
        isSearched: false,
        isSelected: false,
        spinner: false,
        identityNumberChanged: '',
        identityNumber: '',
        patientSearchResult: {},
        patientSelected: {},
        isPatientFound: false,
        inputRequired: [true, true, true, true, true],
        inputRequiredData: ['insurance_number', 'name', 'mobile_phone', 'address', 'postal_code'],
        inputRequiredDataRead: ['Nomor BPJS/Asuransi', 'Nama', 'Nomor Telepon Pribadi', 'Alamat', 'Kode Pos'],
        patients: [
            {identity_number: '1011121314151617', insurance_number: '7502193810123', identity_type: 1, name: 'Budi Sudrajat', gender: 1, birth_place: 1, birth_date: new Date(1996, 9, 11), mobile_phone: '081345678910', home_phone: '0215378765', religion: 1, education_level: 1, married_status: 1, nationality: 1, address: 'Jl Jawa sektor 14', province: 1, city: 1, district: 1, sub_district: 1, postal_code: '1214'},
            {identity_number: '1234567890', insurance_number: '7402163210345', identity_type: 1, name: 'Budi', gender: 1, birth_place: 1, birth_date: new Date(1996, 9, 11), mobile_phone: '081345678910', home_phone: '0215378765', religion: 1, education_level: 1, married_status: 1, nationality: 1, address: 'Jl Jawa sektor 14', province: 1, city: 1, district: 1, sub_district: 1, postal_code: '1214'},
            {identity_number: '123123123123', insurance_number: '7623155810166', identity_type: 1, name: 'Sudrajat', gender: 1, birth_place: 1, birth_date: new Date(1996, 9, 11), mobile_phone: '081345678910', home_phone: '0215378765', religion: 1, education_level: 1, married_status: 1, nationality: 1, address: 'Jl Jawa sektor 14', province: 1, city: 1, district: 1, sub_district: 1, postal_code: '1214'}
        ],
    };

    static navigationOptions = ({navigation}) => {
        return {
            headerStyle: {
                color: '#ffffff',
            },
            headerTintColor: '#000000',
            headerTitle:
                <View>
                    <Text style={{fontSize: 18, fontWeight: 'bold', color: '#000000'}}>
                        {navigation.getParam('referralType') <= 1 ? 'Rujuk Poli' : 'Rujuk Emergency'}
                    </Text>
                </View>
            ,
        };
    };

    _showDateTimePicker = () => this.setState({isDateTimePickerVisible: true});

    _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});

    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this._hideDateTimePicker();
    };

    _setFormWizardScreen(isActive, index, text, isLast) {
        return <View
            style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginRight: (isLast ? 10 : 0)}}>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: (isActive ? '#00818c' : '#c4c4c4'),
                width: 15,
                height: 15,
                borderRadius: 100
            }}>
                <Text style={{color: '#ffffff', fontSize: 8}}>
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
                style={{backgroundColor: (isActive ? '#00818c' : '#c4c4c4'), width: 20, height: 2, marginLeft: 5}}/>}
        </View>
    };

    _searchPatient() {
        this.setState({spinner: !this.state.spinner, identityNumber: this.state.identityNumberChanged});

        setTimeout(() => {
            let patient = {
                insuranceNumber: '',
                identity_type: 1,
                name: '',
                gender: 1,
                birth_place: 1,
                birth_date: new Date(),
                mobile_phone: '',
                home_phone: '',
                religion: 1,
                education_level: 1,
                married_status: 1,
                nationality: 1,
                address: '',
                province: 1,
                city: 1,
                district: 1,
                sub_district: 1,
                postal_code: '',
            };

            let isPatientFound = false;
            let identityNumber = this.state.identityNumberChanged;

            let getPatient = this.state.patients.filter(function (patient) {
                return patient.identity_number == identityNumber;
            });

            if (getPatient.length > 0) {
                patient = getPatient[0];
                isPatientFound = true;
            }

            this.setState({
                patientSelected: patient,
                isPatientFound: isPatientFound,
                spinner: !this.state.spinner,
                isSelected: true,
                // isSearched: true
            });
        }, 3000);
    };

    _setSearchResultScreen() {
        if (this.state.isSearched) {
            return <View style={{width: 100 + '%', minHeight: 150, backgroundColor: '#ffffff', marginTop: 10}}>
                <View style={{margin: 5 + '%'}}>
                    <Text style={{color: '#000000', fontSize: 12, fontWeight: 'bold'}}>Hasil Pencarian</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                        {
                            this.state.isPatientFound
                                ?
                                <Image style={{width: 80, height: 80, borderRadius: 4}}
                                       source={require('../../assets/images/patient.jpg')}/>
                                :
                                <View style={{justifyContent: 'center', height: 80}}>
                                    <Text style={{color: '#000000', fontSize: 10}}>Maaf, nomor identitas yang anda isi
                                        tidak ditemukan</Text>
                                </View>
                        }
                        {
                            this.state.isPatientFound
                                ?
                                <View style={{marginLeft: 20}}>
                                    <Text style={{color: '#000000', fontSize: 14, fontWeight: 'bold'}}>Budi
                                        Sudrajat</Text>
                                    <Text
                                        style={{color: '#cacaca', fontSize: 10, marginTop: 10}}>1011121314151617</Text>
                                </View>
                                :
                                null
                        }
                        <TouchableOpacity
                            onPress={() => this.setState({
                                isSearched: !this.state.isSearched,
                                isSelected: true,
                                patientSelected: this.state.patientSearchResult
                            })}
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
                            <Text style={{color: '#ffffff', fontSize: 12, fontWeight: 'bold'}}>
                                {this.state.isPatientFound ? 'Pilih' : 'Isi Manual'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>;
        }
    };

    _setPatientDataScreen() {
        let patient = this.state.patientSelected;

        if (this.state.isSelected) {
            return <View>
                <View style={{width: 100 + '%', minHeight: 610, backgroundColor: '#ffffff', marginTop: 10}}>
                    <View style={{margin: 5 + '%'}}>
                        {!this.state.isPatientFound && <View style={{alignItems: 'center'}}>
                            <Text style={{color: '#f05d5e', textAlign: 'center'}}>Pasien tidak ditemukan dalam sistem,
                                silakan isi data pasien secara manual.</Text>
                        </View>}
                        <View style={{marginTop: (this.state.isPatientFound ? 0 : 15)}}>
                            <Text style={{color: '#cacaca'}}>
                                Nomor BPJS
                                <Text style={{color: '#f05d5e'}}> *</Text>
                            </Text>
                            <TextInput
                                ref={(input0) => {
                                    this.input0 = input0
                                }}
                                keyboardType={'numeric'}
                                placeholder={'Nomor BPJS'}
                                value={patient.insurance_number}
                                onChangeText={(text) => {
                                    patient.insurance_number = text;
                                    this.setState({patient: patient});
                                }}
                                style={{
                                    marginLeft: 4,
                                    borderBottomColor: (this.state.inputRequired[0] ? '#c4c4c4' : '#f05d5e'),
                                    borderBottomWidth: 1
                                }}
                            />
                            {!this.state.inputRequired[0] &&
                            <Text style={{color: '#f05d5e', fontSize: 12, marginLeft: 4}}>Masukkan nomor bpjs/asuransi
                                pasien</Text>}
                        </View>
                        <View style={{marginTop: 15}}>
                            <Text style={{color: '#cacaca'}}>
                                Jenis Identitas
                                <Text style={{color: '#f05d5e'}}> *</Text>
                            </Text>
                            <View style={{width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1}}>
                                <Picker
                                    selectedValue={patient.identity_type}
                                    onValueChange={(itemValue) => {
                                        patient.identity_type = itemValue;
                                        this.setState({patient: patient});
                                    }}
                                >
                                    <Picker.Item label={'KTP'} value={1}/>
                                    <Picker.Item label={'SIM'} value={2}/>
                                    <Picker.Item label={'Paspor'} value={3}/>
                                </Picker>
                            </View>
                        </View>
                        <View style={{marginTop: 15}}>
                            <Text style={{color: '#cacaca'}}>
                                Nama
                                <Text style={{color: '#f05d5e'}}> *</Text>
                            </Text>
                            <TextInput
                                ref={(input1) => {
                                    this.input1 = input1
                                }}
                                placeholder={'Nama'}
                                value={patient.name}
                                onChangeText={(text) => {
                                    patient.name = text;
                                    this.setState({patient: patient});
                                }}
                                style={{
                                    marginLeft: 4,
                                    borderBottomColor: (this.state.inputRequired[1] ? '#c4c4c4' : '#f05d5e'),
                                    borderBottomWidth: 1
                                }}/>
                            {!this.state.inputRequired[1] &&
                            <Text style={{color: '#f05d5e', fontSize: 12, marginLeft: 4}}>Masukkan nama pasien</Text>}
                        </View>
                        <View style={{marginTop: 15}}>
                            <Text style={{color: '#cacaca'}}>
                                Jenis Kelamin
                                <Text style={{color: '#f05d5e'}}> *</Text>
                            </Text>
                            <View style={{width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1}}>
                                <Picker
                                    selectedValue={patient.gender}
                                    onValueChange={(itemValue) => {
                                        patient.gender = itemValue;
                                        this.setState({patient: patient})
                                    }}
                                >
                                    <Picker.Item label={'Perempuan'} value={0}/>
                                    <Picker.Item label={'Laki-laki'} value={1}/>
                                </Picker>
                            </View>
                        </View>
                        <View style={{marginTop: 15}}>
                            <Text style={{color: '#cacaca'}}>
                                Tempat Lahir
                                <Text style={{color: '#f05d5e'}}> *</Text>
                            </Text>
                            <View style={{width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1}}>
                                <Picker
                                    selectedValue={patient.birth_place}
                                    onValueChange={(itemValue) => {
                                        patient.birth_place = itemValue;
                                        this.setState({patent: patient});
                                    }}
                                >
                                    <Picker.Item label={'Jakarta Barat'} value={0}/>
                                    <Picker.Item label={'Tangerang Selatan'} value={1}/>
                                </Picker>
                            </View>
                        </View>
                        <View style={{marginTop: 15}}>
                            <Text style={{color: '#cacaca'}}>
                                Tanggal Lahir
                                <Text style={{color: '#f05d5e'}}> *</Text>
                            </Text>
                            <View style={{borderBottomColor: '#c4c4c4', borderBottomWidth: 1}}>
                                <TouchableOpacity onPress={this._showDateTimePicker}>
                                    <TextInput
                                        value={patient.birth_date.getDate() + ' / ' + (patient.birth_date.getMonth() + 1) + ' / ' + patient.birth_date.getFullYear()}
                                        editable={false}
                                        selectTextOnFocus={false}
                                        style={{color: '#000000', marginLeft: 5}}/>
                                </TouchableOpacity>
                            </View>
                            <DateTimePicker
                                date={patient.birth_date}
                                isVisible={this.state.isDateTimePickerVisible}
                                onConfirm={(date) => {
                                    patient.birth_date = date;
                                    this.setState({patent: patient});
                                    this._hideDateTimePicker;
                                    this.setState({isDateTimePickerVisible: false});
                                }}
                                onCancel={this._hideDateTimePicker}
                            />
                        </View>
                        <View style={{marginTop: 15}}>
                            <Text style={{color: '#cacaca'}}>Umur</Text>
                            <TextInput value={'29 tahun 1 bulan 6 hari'} editable={false} selectTextOnFocus={false}
                                       style={{color: '#000000', marginLeft: 5}}/>
                        </View>
                    </View>
                </View>

                <View style={{width: 100 + '%', minHeight: 200, backgroundColor: '#ffffff', marginTop: 10}}>
                    <View style={{margin: 5 + '%'}}>
                        <View>
                            <Text style={{color: '#cacaca'}}>
                                Telepon Pribadi
                                <Text style={{color: '#f05d5e'}}> *</Text>
                            </Text>
                            <TextInput
                                ref={(input2) => {
                                    this.input2 = input2
                                }}
                                keyboardType={'numeric'}
                                placeholder={'Contoh: 081234567890'}
                                value={patient.mobile_phone}
                                onChangeText={(text) => {
                                    patient.mobile_phone = text;
                                    this.setState({patient: patient});
                                }}
                                style={{
                                    marginLeft: 4,
                                    borderBottomColor: (this.state.inputRequired[2] ? '#c4c4c4' : '#f05d5e'),
                                    borderBottomWidth: 1
                                }}
                            />
                            {!this.state.inputRequired[2] &&
                            <Text style={{color: '#f05d5e', fontSize: 12, marginLeft: 4}}>Masukkan nomor telepon pribadi
                                pasien atau keluarga/kerabat</Text>}
                        </View>
                        <View style={{marginTop: 15}}>
                            <Text style={{color: '#cacaca'}}>Telepon Rumah</Text>
                            <TextInput
                                keyboardType={'numeric'}
                                placeholder={'Contoh: 0217567890'}
                                value={patient.home_phone}
                                onChangeText={(text) => {
                                    patient.home_phone = text;
                                    this.setState({patient: patient});
                                }}
                                style={{marginLeft: 4, borderBottomColor: '#c4c4c4', borderBottomWidth: 1}}/>
                        </View>
                    </View>
                </View>

                <View style={{width: 100 + '%', height: 370, backgroundColor: '#ffffff', marginTop: 10}}>
                    <View style={{margin: 5 + '%'}}>
                        <View>
                            <Text style={{color: '#cacaca'}}>
                                Agama
                                <Text style={{color: '#f05d5e'}}> *</Text>
                            </Text>
                            <View style={{width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1}}>
                                <Picker
                                    selectedValue={patient.religion}
                                    onValueChange={(itemValue) => {
                                        patient.religion = itemValue
                                        this.setState({patient: patient});
                                    }}
                                >
                                    <Picker.Item label={'Islam'} value={1}/>
                                    <Picker.Item label={'Kristen'} value={2}/>
                                    <Picker.Item label={'Hindu'} value={3}/>
                                    <Picker.Item label={'Budha'} value={4}/>
                                    <Picker.Item label={'Katolik'} value={5}/>
                                    <Picker.Item label={'Konghucu'} value={6}/>
                                </Picker>
                            </View>
                        </View>
                        <View style={{marginTop: 15}}>
                            <Text style={{color: '#cacaca'}}>
                                Jenjang Pendidikan
                                <Text style={{color: '#f05d5e'}}> *</Text>
                            </Text>
                            <View style={{width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1}}>
                                <Picker
                                    selectedValue={patient.education_level}
                                    onValueChange={(itemValue) => {
                                        patient.education_level = itemValue;
                                        this.setState({patient: patient})
                                    }}
                                >
                                    <Picker.Item label={'SD'} value={1}/>
                                    <Picker.Item label={'SMP'} value={2}/>
                                    <Picker.Item label={'SMA'} value={3}/>
                                    <Picker.Item label={'D1/D2/D3'} value={4}/>
                                    <Picker.Item label={'D4/S1'} value={5}/>
                                    <Picker.Item label={'S2'} value={6}/>
                                    <Picker.Item label={'S3'} value={7}/>
                                </Picker>
                            </View>
                        </View>
                        <View style={{marginTop: 15}}>
                            <Text style={{color: '#cacaca'}}>
                                Status Nikah
                                <Text style={{color: '#f05d5e'}}> *</Text>
                            </Text>
                            <View style={{width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1}}>
                                <Picker
                                    selectedValue={patient.married_status}
                                    onValueChange={(itemValue) => {
                                        patient.married_status = itemValue;
                                        this.setState({patient: patient});
                                    }}
                                >
                                    <Picker.Item label={'Belum Menikah'} value={0}/>
                                    <Picker.Item label={'Menikah'} value={1}/>
                                </Picker>
                            </View>
                        </View>
                        <View style={{marginTop: 15}}>
                            <Text style={{color: '#cacaca'}}>
                                Negara Asal
                                <Text style={{color: '#f05d5e'}}> *</Text>
                            </Text>
                            <View style={{width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1}}>
                                <Picker
                                    selectedValue={patient.nationality}
                                    onValueChange={(itemValue) => {
                                        patient.nationality = itemValue;
                                        this.setState({patient: patient})
                                    }}
                                >
                                    <Picker.Item label={'Indonesia'} value={1}/>
                                    <Picker.Item label={'Malaysia'} value={2}/>
                                </Picker>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{width: 100 + '%', minHeight: 540, backgroundColor: '#ffffff', marginTop: 10}}>
                    <View style={{margin: 5 + '%'}}>
                        <View>
                            <Text style={{color: '#cacaca'}}>
                                Alamat
                                <Text style={{color: '#f05d5e'}}> *</Text>
                            </Text>
                            <TextInput
                                ref={(input3) => {
                                    this.input3 = input3
                                }}
                                placeholder={'Alamat'}
                                value={patient.address}
                                onChangeText={(text) => {
                                    patient.address = text;
                                    this.setState({patient: patient});
                                }}
                                style={{
                                    marginLeft: 4,
                                    borderBottomColor: (this.state.inputRequired[3] ? '#c4c4c4' : '#f05d5e'),
                                    borderBottomWidth: 1
                                }}
                            />
                            {!this.state.inputRequired[3] &&
                            <Text style={{color: '#f05d5e', fontSize: 12, marginLeft: 4}}>Masukkan alamat tempat tinggal
                                pasien</Text>}
                        </View>
                        <View style={{marginTop: 15}}>
                            <Text style={{color: '#cacaca'}}>
                                Provinsi
                                <Text style={{color: '#f05d5e'}}> *</Text>
                            </Text>
                            <View style={{width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1}}>
                                <Picker
                                    selectedValue={patient.province}
                                    onValueChange={(itemValue) => {
                                        patient.province = itemValue;
                                        this.setState({patient: patient});
                                    }}
                                >
                                    <Picker.Item label={'Indonesia'} value={1}/>
                                    <Picker.Item label={'Malaysia'} value={2}/>
                                </Picker>
                            </View>
                        </View>
                        <View style={{marginTop: 15}}>
                            <Text style={{color: '#cacaca'}}>
                                Kota / Kabupaten
                                <Text style={{color: '#f05d5e'}}> *</Text>
                            </Text>
                            <View style={{width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1}}>
                                <Picker
                                    selectedValue={patient.city}
                                    onValueChange={(itemValue) => {
                                        patient.city = itemValue;
                                        this.setState({patient: patient});
                                    }}
                                >
                                    <Picker.Item label={'Tangerang Selatan'} value={1}/>
                                    <Picker.Item label={'Tangerang'} value={2}/>
                                </Picker>
                            </View>
                        </View>
                        <View style={{marginTop: 15}}>
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
                        </View>
                        <View style={{marginTop: 15}}>
                            <Text style={{color: '#cacaca'}}>
                                Kode Pos
                                <Text style={{color: '#f05d5e'}}> *</Text>
                            </Text>
                            <TextInput
                                ref={(input4) => {
                                    this.input4 = input4
                                }}
                                keyboardType={'numeric'}
                                placeholder={'Kode Pos'}
                                value={patient.postal_code}
                                onChangeText={(text) => {
                                    patient.postal_code = text;
                                    this.setState({patient: patient});
                                }}
                                style={{
                                    marginLeft: 4,
                                    borderBottomColor: (this.state.inputRequired[4] ? '#c4c4c4' : '#f05d5e'),
                                    borderBottomWidth: 1
                                }}
                            />
                            {!this.state.inputRequired[4] &&
                            <Text style={{color: '#f05d5e', fontSize: 12, marginLeft: 4}}>Masukkan kode pos dari alamat
                                pasien</Text>}
                        </View>
                    </View>
                </View>

                <View style={{alignItems: 'center', width: 100 + '%', height: 100}}>
                    <TouchableOpacity
                        onPress={() =>
                            this._submit()
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
                        <Text style={{color: '#ffffff', fontSize: 12, fontWeight: 'bold'}}>Selanjutnya</Text>
                    </TouchableOpacity>
                </View>
            </View>
        }
    };

    _submit() {
        let {navigate} = this.props.navigation;

        let inputRequired = this.state.inputRequired;
        let inputRequiredData = this.state.inputRequiredData;
        let inputRequiredDataRead = this.state.inputRequiredDataRead;
        let patient = this.state.patientSelected;
        let result = true;

        let error = [];
        let errorCount = 0;

        inputRequired.map(function (input, index) {
            let tmp = true;
            if (!patient[inputRequiredData[index]]) {
                tmp = false;
                result = false;
                errorCount = errorCount + 1;

                if (errorCount < 5) {
                    error.push(inputRequiredDataRead[index])
                }
            }

            inputRequired[index] = tmp;
        });

        this.setState({inputRequired: inputRequired});

        if (result) {
            navigate('ReferralCreateScheduleDestinationScreen', {
                    referralType: this.state.referralType,
                    insurancePatientType: this.state.insurancePatientType
                }
            );
        } else {
            let message = 'Pastikan seluruh kolom yang bertanda bintang (*) sudah terisi.';

            if (errorCount <= 5) {
                message = error.join(', ') + ' belum terisi.';
            }

            Alert.alert('Validasi Gagal', message)
        }
    };

    render() {

        return (
            <View style={styles.firstLayer}>
                <Spinner
                    animation={'slide'}
                    visible={this.state.spinner}
                    textContent={'Mencari Data Pasien...'}
                    textStyle={{color: '#ffffff'}}
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
                    <View style={{width: 100 + '%', minHeight: 210, backgroundColor: '#ffffff'}}>
                        <View style={{margin: 5 + '%'}}>
                            <View>
                                <Text style={{color: '#cacaca'}}>
                                    Nomor Identitas (KTP / SIM / Paspor)
                                    <Text style={{color: '#f05d5e'}}> *</Text>
                                </Text>
                                <TextInput
                                    returnKeyType={'search'}
                                    keyboardType={'numeric'}
                                    onChangeText={(text) => this.setState({identityNumberChanged: text})}
                                    onSubmitEditing={() => this._searchPatient()}
                                    placeholder={'Nomor Identitas (KTP / SIM / Paspor)'}
                                    style={{marginLeft: 4, borderBottomColor: '#c4c4c4', borderBottomWidth: 1}}/>
                            </View>
                            <View style={{marginTop: 15}}>
                                <Text style={{color: '#cacaca'}}>
                                    Jenis Asuransi Pasien
                                    <Text style={{color: '#f05d5e'}}> *</Text>
                                </Text>
                                <View style={{width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1}}>
                                    <Picker
                                        selectedValue={this.state.insurancePatientType}
                                        onValueChange={(itemValue, itemIndex) => this.setState({insurancePatientType: itemValue})}
                                    >
                                        <Picker.Item label={'BPJS'} value={1}/>
                                        <Picker.Item label={'Non BPJS (Asuransi Lain)'} value={2}/>
                                        <Picker.Item label={'Umum (Bayar Sendiri)'} value={3}/>
                                    </Picker>
                                </View>
                            </View>
                            <View style={{marginTop: 15}}>
                                <Text style={{color: '#cacaca', textAlign: 'center'}}>Jika terdapat di dalam sistem,
                                    data pasien akan terisi secara otomatis.</Text>
                            </View>
                            <View style={{alignItems: 'center', width: 100 + '%', height: 55}}>
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
                                    <Text style={{color: '#ffffff', fontSize: 12, fontWeight: 'bold'}}>Cari
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