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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DocumentPicker, DocumentPickerUtil} from 'react-native-document-picker';

class ReferralCreateReferralDataScreen extends Component {

    state = {
        isDateTimePickerVisible: false,
        referralType: this.props.navigation.getParam('referralType'),
        insurancePatientType: this.props.navigation.getParam('insurancePatientType'),
        selectedItems: [],
        items: [{id: '1', name: 'Rontgen'}, {id: '2', name: 'MRI'}],
        severitiesText: ['No Pain', 'Mild Pain', 'Moderate Pain', 'Severe Pain', 'Very Severe Pain', 'Worst Pain Possible'],
        severitiesEmoticon: ['emoticon-excited-outline', 'emoticon-happy-outline', 'emoticon-neutral-outline', 'emoticon-sad-outline', 'emoticon-cry-outline', 'emoticon-dead-outline'],
        severitiesColor: ['#28c667', '#6ad77a', '#e9d758', '#ff9d73', '#ff8552', '#f05d5e'],
        selectedSeverity: 6,
        file: '',
        inputRequired: [true, true, true, true, true, true, true, true],
        inputRequiredData: ['reasons', 'action_given', 'diagnosis', 'pulse', 'systole', 'diastole', 'weight', 'height'],
        inputRequiredDataRead: ['Alasan Merujuk', 'Tindakan yang Telah Diberikan', 'Diagnosis', 'Denyut Nadi', 'Tekanan Darah', 'Tekanan Darah', 'Berat Badan', 'Tinggi Badan'],
        inputRequiredEmergency: [true, true],
        inputRequiredDataEmergency: ['body_temperature', 'respiratory_rate'],
        inputRequiredDataEmergencyRead: ['Suhu Tubuh', 'Laju Pernapasan'],
        referralData: {
            case_type: 1,
            doctor: 1,
            reasons: '',
            action_given: '',
            diagnosis: '',
            pulse: '',
            systole: '',
            diastole: '',
            weight: '',
            height: '',
            body_temperature: '',
            respiratory_rate: ''
        }
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
        </View>;
    };

    _updateSelectedSeverity(id) {
        this.setState({selectedSeverity: id});
    };

    _setSeverityScreen(id) {
        let index = id - 1;
        let selectedSeverity = this.state.selectedSeverity;
        let severitiesColor = this.state.severitiesColor;

        return <TouchableOpacity
            key={id}
            onPress={() => this._updateSelectedSeverity(id)}
            style={{
                alignItems: 'center',
                width: (100 / 6) + '%',
                height: 100,
                backgroundColor: (selectedSeverity == id ? severitiesColor[index] : '#ffffff'),
                borderColor: severitiesColor[index],
                borderWidth: 1
            }}>
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 10
            }}>
                <Icon name={this.state.severitiesEmoticon[index]} size={20}
                      color={selectedSeverity == id ? '#ffffff' : severitiesColor[index]}/>
                <Text style={{
                    color: (selectedSeverity == id ? '#ffffff' : severitiesColor[index]),
                    fontSize: 12,
                    textAlign: 'center',
                    marginHorizontal: 5
                }}>{this.state.severitiesText[index]}</Text>
            </View>
        </TouchableOpacity>;
    };

    _setEmergencyScreen() {
        if (this.state.referralType >= 2) {
            return <View>
                <View>
                    <Text style={{color: '#cacaca'}}>
                        Kode Severity
                        <Text style={{color: '#f05d5e'}}> *</Text>
                    </Text>
                    <View style={{flexDirection: 'row', marginTop: 20}}>
                        {this.state.severitiesText.map((severity, index) =>
                            this._setSeverityScreen(index + 1)
                        )}
                    </View>
                </View>

                <View style={{marginTop: 15}}>
                    <Text style={{color: '#cacaca'}}>
                        Transportasi
                        <Text style={{color: '#f05d5e'}}> *</Text>
                    </Text>
                    <View style={{width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1}}>
                        <Picker
                            selectedValue={this.state.insurancePatientType}
                            onValueChange={(itemValue, itemIndex) => this.setState({insurancePatientType: itemValue})}
                        >
                            <Picker.Item label={'Ambulan'} value={1}/>
                            <Picker.Item label={'Kendaraan Pribadi'} value={2}/>
                        </Picker>
                    </View>
                </View>

                <View style={{marginTop: 15}}>
                    <Text style={{color: '#cacaca'}}>
                        Kesadaran Mata
                        <Text style={{color: '#f05d5e'}}> *</Text>
                    </Text>
                    <View style={{width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1}}>
                        <Picker
                            selectedValue={this.state.insurancePatientType}
                            onValueChange={(itemValue, itemIndex) => this.setState({insurancePatientType: itemValue})}
                        >
                            <Picker.Item label={'Tidak Membuka Mata (1+)'} value={1}/>
                            <Picker.Item label={'Terhadap Rasa Sakit (2+)'} value={2}/>
                            <Picker.Item label={'Terhadap Suara (3+)'} value={3}/>
                            <Picker.Item label={'Spontan (4+)'} value={4}/>
                        </Picker>
                    </View>
                </View>

                <View style={{marginTop: 15}}>
                    <Text style={{color: '#cacaca'}}>
                        Kesadaran Verbal
                        <Text style={{color: '#f05d5e'}}> *</Text>
                    </Text>
                    <View style={{width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1}}>
                        <Picker
                            selectedValue={this.state.insurancePatientType}
                            onValueChange={(itemValue, itemIndex) => this.setState({insurancePatientType: itemValue})}
                        >
                            <Picker.Item label={'Tidak Bersuara (1+)'} value={1}/>
                            <Picker.Item label={'Tidak Dimengerti (2+)'} value={2}/>
                            <Picker.Item label={'Tidak Nyambung (3+)'} value={3}/>
                            <Picker.Item label={'Bingung (4+)'} value={4}/>
                            <Picker.Item label={'Terarah (5+)'} value={5}/>
                        </Picker>
                    </View>
                </View>

                <View style={{marginTop: 15}}>
                    <Text style={{color: '#cacaca'}}>
                        Kesadaran Motorik
                        <Text style={{color: '#f05d5e'}}> *</Text>
                    </Text>
                    <View style={{width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1}}>
                        <Picker
                            selectedValue={this.state.insurancePatientType}
                            onValueChange={(itemValue, itemIndex) => this.setState({insurancePatientType: itemValue})}
                        >
                            <Picker.Item label={'Tidak Bergerak (1+)'} value={1}/>
                            <Picker.Item label={'Postur Ekstensor (2+)'} value={2}/>
                            <Picker.Item label={'Postur Fleksor (3+)'} value={3}/>
                            <Picker.Item label={'Menunjukkan Rasa Sakit (4+)'} value={4}/>
                            <Picker.Item label={'Menunjukkan Area yang Sakit (5+)'} value={5}/>
                            <Picker.Item label={'Mengikuti Perintah (6+)'} value={6}/>
                        </Picker>
                    </View>
                </View>

                <View style={{marginTop: 15}}>
                    <Text style={{color: '#cacaca'}}>
                        Suhu Tubuh (Celsius)
                        <Text style={{color: '#f05d5e'}}> *</Text>
                    </Text>
                    <TextInput keyboardType={'numeric'} placeHolder={'Suhu Tubuh'}
                               onChangeText={(text) => {
                                   let referralData = this.state.referralData;
                                   referralData.body_temperature = text;
                                   this.setState({referralData: referralData});
                               }}
                               style={{
                                   marginLeft: 4,
                                   borderBottomColor: (this.state.inputRequiredEmergency[0] ? '#c4c4c4' : '#f05d5e'),
                                   borderBottomWidth: 1
                               }}
                    />
                    {!this.state.inputRequiredEmergency[0] &&
                    <Text style={{color: '#f05d5e', fontSize: 12, marginLeft: 4}}>Masukkan suhu tubuh pasien</Text>}
                </View>

                <View style={{marginTop: 15}}>
                    <Text style={{color: '#cacaca'}}>
                        Laju Pernapasan (kali/menit)
                        <Text style={{color: '#f05d5e'}}> *</Text>
                    </Text>
                    <TextInput keyboardType={'numeric'} placeHolder={'Laju Pernapasan'}
                               onChangeText={(text) => {
                                   let referralData = this.state.referralData;
                                   referralData.respiratory_rate = text;
                                   this.setState({referralData: referralData});
                               }}
                               style={{
                                   marginLeft: 4,
                                   borderBottomColor: (this.state.inputRequiredEmergency[1] ? '#c4c4c4' : '#f05d5e'),
                                   borderBottomWidth: 1
                               }}
                    />
                    {!this.state.inputRequiredEmergency[1] &&
                    <Text style={{color: '#f05d5e', fontSize: 12, marginLeft: 4}}>Masukkan laju pernapasan
                        pasien</Text>}
                </View>
            </View>;
        }
    };

    _uploadFile() {
        DocumentPicker.show({
            filetype: [DocumentPickerUtil.pdf()],
        }, (error, res) => {
            // Android
            if (res) {
                console.log(
                    res.uri,
                    res.type, // mime type
                    res.fileName,
                    res.fileSize
                );
            }
        });
    };

    _submit() {
        let {navigate} = this.props.navigation;

        let inputRequired = this.state.inputRequired;
        let inputRequiredData = this.state.inputRequiredData;
        let inputRequiredDataRead = this.state.inputRequiredDataRead;

        let inputRequiredEmergency = this.state.inputRequiredEmergency;
        let inputRequiredDataEmergency = this.state.inputRequiredDataEmergency;
        let inputRequiredDataEmergencyRead = this.state.inputRequiredDataEmergencyRead;

        let referralData = this.state.referralData;
        let result = true;

        let error = [];
        let errorEmergency = [];
        let errorCount = 0;

        inputRequired.map(function (input, index) {
            let tmp = true;
            if (!referralData[inputRequiredData[index]]) {
                tmp = false;
                result = false;
                errorCount = errorCount + 1;

                if (errorCount < 5) {
                    error.push(inputRequiredDataRead[index])
                }
            }

            inputRequired[index] = tmp;
        });

        if (this.state.referralType > 1) {
            inputRequiredEmergency.map(function (input, index) {
                let tmp = true;
                if (!referralData[inputRequiredDataEmergency[index]]) {
                    tmp = false;
                    result = false;
                    errorCount = errorCount + 1;

                    if (errorCount < 5) {
                        errorEmergency.push(inputRequiredDataEmergencyRead[index])
                    }
                }

                inputRequiredEmergency[index] = tmp;
            });
        }

        this.setState({inputRequired: inputRequired, inputRequiredEmergency: inputRequiredEmergency});

        if (result) {
            navigate('ReferralCreateICD9Screen', {
                    referralType: this.state.referralType,
                    insurancePatientType: this.state.insurancePatientType
                }
            )
        } else {
            let message = 'Pastikan seluruh kolom yang bertanda bintang (*) sudah terisi.';

            if(errorCount <= 5) {
                message = error.join(', ') + errorEmergency.join(', ') + ' belum terisi.';
            }

            Alert.alert('Validasi Gagal', message)
        }
    };

    render() {
        return (
            <View style={styles.firstLayer}>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#ffffff',
                    width: 100 + '%',
                    minHeight: 50
                }}>
                    {this._setFormWizardScreen(true, 1, 'Data Pasien', false)}
                    {this._setFormWizardScreen(true, 2, (this.state.referralType <= 1 ? 'Jadwal Rujukan' : 'Faskes Tujuan'), false)}
                    {this._setFormWizardScreen(true, 3, 'Data Rujukan', false)}
                    {this._setFormWizardScreen(false, 4, 'ICD-9 CM', false)}
                    {this._setFormWizardScreen(false, 5, 'ICD-10', true)}
                </View>

                <ScrollView>
                    <View style={{width: 100 + '%', minHeight: 470, backgroundColor: '#ffffff'}}>
                        <View style={{margin: 5 + '%'}}>
                            <View>
                                <Text style={{color: '#cacaca'}}>
                                    Jenis Kasus
                                    <Text style={{color: '#f05d5e'}}> *</Text>
                                </Text>
                                <View style={{width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1}}>
                                    <Picker
                                        selectedValue={this.state.referralData.case_type}
                                        onValueChange={(itemValue, itemIndex) => {
                                            let referralData = this.state.referralData;
                                            referralData.case_type = itemValue;
                                            this.setState({referralData: referralData})
                                        }}
                                    >
                                        <Picker.Item label={'Kasus Baru'} value={1}/>
                                        <Picker.Item label={'Kasus Lama'} value={2}/>
                                    </Picker>
                                </View>
                            </View>

                            <View style={{marginTop: 15}}>
                                <Text style={{color: '#cacaca'}}>
                                    Dokter Perujuk
                                    <Text style={{color: '#f05d5e'}}> *</Text>
                                </Text>
                                <View style={{width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1}}>
                                    <Picker
                                        selectedValue={this.state.referralData.doctor}
                                        onValueChange={(itemValue, itemIndex) => {
                                            let referralData = this.state.referralData;
                                            referralData.doctor = itemValue;
                                            this.setState({referralData: referralData})
                                        }}
                                    >
                                        <Picker.Item label={'Anastasia'} value={1}/>
                                        <Picker.Item label={'Ricardo'} value={2}/>
                                    </Picker>
                                </View>
                            </View>

                            <View style={{marginTop: 15}}>
                                <Text style={{color: '#cacaca'}}>
                                    Alasan Merujuk
                                    <Text style={{color: '#f05d5e'}}> *</Text>
                                </Text>
                                <TextInput
                                    placeHolder={'Alasan Merujuk'}
                                    onChangeText={(text) => {
                                        let referralData = this.state.referralData;
                                        referralData.reasons = text;
                                        this.setState({referralData: referralData});
                                    }}
                                    style={{
                                        marginLeft: 4,
                                        borderBottomColor: (this.state.inputRequired[0] ? '#c4c4c4' : '#f05d5e'),
                                        borderBottomWidth: 1
                                    }}
                                    multiline={true}
                                />
                                {!this.state.inputRequired[0] &&
                                <Text style={{color: '#f05d5e', fontSize: 12, marginLeft: 4}}>Masukkan alasan merujuk
                                    pasien</Text>}
                            </View>

                            <View style={{marginTop: 15}}>
                                <Text style={{color: '#cacaca'}}>
                                    Tindakan yang Telah Diberikan
                                    <Text style={{color: '#f05d5e'}}> *</Text>
                                </Text>
                                <TextInput
                                    placeHolder={'Tindakan yang Telah Diberikan'}
                                    onChangeText={(text) => {
                                        let referralData = this.state.referralData;
                                        referralData.action_given = text;
                                        this.setState({referralData: referralData});
                                    }}
                                    style={{
                                        marginLeft: 4,
                                        borderBottomColor: (this.state.inputRequired[1] ? '#c4c4c4' : '#f05d5e'),
                                        borderBottomWidth: 1
                                    }}
                                    multiline={true}
                                />
                                {!this.state.inputRequired[1] &&
                                <Text style={{color: '#f05d5e', fontSize: 12, marginLeft: 4}}>Masukkan tindakan yang
                                    telah diberikan kepada pasien</Text>}
                            </View>

                            <View style={{marginTop: 15}}>
                                <Text style={{color: '#cacaca'}}>
                                    Diagnosis
                                    <Text style={{color: '#f05d5e'}}> *</Text>
                                </Text>
                                <TextInput
                                    placeHolder={'Diagnosis'}
                                    onChangeText={(text) => {
                                        let referralData = this.state.referralData;
                                        referralData.diagnosis = text;
                                        this.setState({referralData: referralData});
                                    }}
                                    style={{
                                        marginLeft: 4,
                                        borderBottomColor: (this.state.inputRequired[2] ? '#c4c4c4' : '#f05d5e'),
                                        borderBottomWidth: 1
                                    }}
                                    multiline={true}
                                />
                                {!this.state.inputRequired[2] &&
                                <Text style={{color: '#f05d5e', fontSize: 12, marginLeft: 4}}>Masukkan diagnosis
                                    terhadap kondisi pasien</Text>}
                            </View>
                        </View>
                    </View>

                    <View style={{width: 100 + '%', minHeight: 400, backgroundColor: '#ffffff', marginTop: 10}}>
                        <View style={{margin: 5 + '%'}}>

                            {this._setEmergencyScreen()}

                            <View style={{marginTop: (this.state.referralType <= 1 ? 0 : 15)}}>
                                <Text style={{color: '#cacaca'}}>
                                    Denyut Nadi (nadi/menit)
                                    <Text style={{color: '#f05d5e'}}> *</Text>
                                </Text>
                                <TextInput keyboardType={'numeric'} placeHolder={'Denyut Nadi'}
                                           onChangeText={(text) => {
                                               let referralData = this.state.referralData;
                                               referralData.pulse = text;
                                               this.setState({referralData: referralData});
                                           }}
                                           style={{
                                               marginLeft: 4,
                                               borderBottomColor: (this.state.inputRequired[3] ? '#c4c4c4' : '#f05d5e'),
                                               borderBottomWidth: 1
                                           }}
                                />
                                {!this.state.inputRequired[3] &&
                                <Text style={{color: '#f05d5e', fontSize: 12, marginLeft: 4}}>Masukkan denyut nadi
                                    pasien</Text>}
                            </View>

                            <View style={{marginTop: 15}}>
                                <Text style={{color: '#cacaca'}}>
                                    Tekanan Darah (mmHg)
                                    <Text style={{color: '#f05d5e'}}> *</Text>
                                </Text>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <TextInput keyboardType={'numeric'}
                                               onChangeText={(text) => {
                                                   let referralData = this.state.referralData;
                                                   referralData.systole = text;
                                                   this.setState({referralData: referralData});
                                               }}
                                               placeHolder={'Sistolik'} style={{
                                        width: 40 + '%',
                                        marginLeft: 4,
                                        borderBottomColor: (this.state.inputRequired[4] ? '#c4c4c4' : '#f05d5e'),
                                        borderBottomWidth: 1
                                    }}/>
                                    <View style={{
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: 10 + '%'
                                    }}>
                                        <Text style={{color: '#c4c4c4', fontSize: 30}}>/</Text>
                                    </View>
                                    <TextInput keyboardType={'numeric'}
                                               onChangeText={(text) => {
                                                   let referralData = this.state.referralData;
                                                   referralData.diastole = text;
                                                   this.setState({referralData: referralData});
                                               }}
                                               placeHolder={'Diastolik'} style={{
                                        width: 40 + '%',
                                        marginLeft: 4,
                                        borderBottomColor: (this.state.inputRequired[5] ? '#c4c4c4' : '#f05d5e'),
                                        borderBottomWidth: 1
                                    }}/>
                                </View>
                                {(!this.state.inputRequired[4] || !this.state.inputRequired[5]) &&
                                <Text style={{color: '#f05d5e', fontSize: 12, marginLeft: 4}}>Masukkan tekanan darah
                                    pasien</Text>}
                            </View>

                            <View style={{marginTop: 15}}>
                                <Text style={{color: '#cacaca'}}>
                                    Berat Badan (kg)
                                    <Text style={{color: '#f05d5e'}}> *</Text>
                                </Text>
                                <TextInput keyboardType={'numeric'} placeHolder={'Berat Badan'}
                                           onChangeText={(text) => {
                                               let referralData = this.state.referralData;
                                               referralData.weight = text;
                                               this.setState({referralData: referralData});
                                           }}
                                           style={{
                                               marginLeft: 4,
                                               borderBottomColor: (this.state.inputRequired[6] ? '#c4c4c4' : '#f05d5e'),
                                               borderBottomWidth: 1
                                           }}
                                />
                                {!this.state.inputRequired[6] &&
                                <Text style={{color: '#f05d5e', fontSize: 12, marginLeft: 4}}>Masukkan berat badan
                                    pasien</Text>}
                            </View>

                            <View style={{marginTop: 15}}>
                                <Text style={{color: '#cacaca'}}>
                                    Tinggi Badan (cm)
                                    <Text style={{color: '#f05d5e'}}> *</Text>
                                </Text>
                                <TextInput keyboardType={'numeric'} placeHolder={'Tinggi Badan'}
                                           onChangeText={(text) => {
                                               let referralData = this.state.referralData;
                                               referralData.height = text;
                                               this.setState({referralData: referralData});
                                           }}
                                           style={{
                                               marginLeft: 4,
                                               borderBottomColor: (this.state.inputRequired[7] ? '#c4c4c4' : '#f05d5e'),
                                               borderBottomWidth: 1
                                           }}
                                />
                                {!this.state.inputRequired[7] &&
                                <Text style={{color: '#f05d5e', fontSize: 12, marginLeft: 4}}>Masukkan tinggi badan
                                    pasien</Text>}
                            </View>

                            <View style={{marginTop: 15}}>
                                <Text style={{color: '#cacaca'}}>
                                    Skala Nyeri
                                    <Text style={{color: '#f05d5e'}}> *</Text>
                                </Text>
                                <View style={{width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1}}>
                                    <Picker
                                        selectedValue={this.state.insurancePatientType}
                                        onValueChange={(itemValue, itemIndex) => this.setState({insurancePatientType: itemValue})}
                                    >
                                        <Picker.Item label={'Nyeri'} value={1}/>
                                        <Picker.Item label={'Sangat Nyeri'} value={2}/>
                                    </Picker>
                                </View>
                            </View>

                            <View style={{marginTop: 15}}>
                                <Text style={{color: '#cacaca'}}>Keterangan Lain</Text>
                                <TextInput style={{marginLeft: 4, borderBottomColor: '#c4c4c4', borderBottomWidth: 1}}
                                           multiline={true}/>
                            </View>
                        </View>
                    </View>

                    <View style={{width: 100 + '%', minHeight: 230, backgroundColor: '#ffffff', marginTop: 10}}>
                        <View style={{margin: 5 + '%'}}>
                            <View style={{marginTop: 15}}>
                                <Text style={{color: '#cacaca'}}>Dokumen Hasil Pemeriksaan Darah</Text>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <TextInput value={'Hasil_Tes_Darah_Budi Sudrajat.pdf'} editable={false}
                                               selectTextOnFocus={false} style={{
                                        color: '#000000',
                                        width: 70 + '%',
                                        marginLeft: 4,
                                        borderBottomColor: '#c4c4c4',
                                        borderBottomWidth: 1
                                    }}/>
                                    <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                                        <TouchableOpacity onPress={() => this._uploadFile()} style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: 70,
                                            height: 25,
                                            backgroundColor: '#004e64',
                                            borderRadius: 3
                                        }}>
                                            <Text style={{color: '#ffffff', fontSize: 12}}>Unggah</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={{marginTop: 15}}>
                                <Text style={{color: '#cacaca'}}>Dokumen Riwayat Sakit Lainnya</Text>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <TextInput value={'Riawayat_Sakit_Budi Sudrajat.pdf'} editable={false}
                                               selectTextOnFocus={false} style={{
                                        color: '#000000',
                                        width: 70 + '%',
                                        marginLeft: 4,
                                        borderBottomColor: '#c4c4c4',
                                        borderBottomWidth: 1
                                    }}/>
                                    <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                                        <TouchableOpacity onPress={() => this._uploadFile()} style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: 70,
                                            height: 25,
                                            backgroundColor: '#004e64',
                                            borderRadius: 3
                                        }}>
                                            <Text style={{color: '#ffffff', fontSize: 12}}>Unggah</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{alignItems: 'center', width: 100 + '%', minHeight: 100}}>
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

export default ReferralCreateReferralDataScreen;