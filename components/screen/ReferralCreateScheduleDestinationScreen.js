import React, { Component } from 'react';
import { View, ScrollView, Picker, TouchableOpacity, TextInput, Image, Text, StyleSheet, StatusBar } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import MultiSelect from 'react-native-multiple-select';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from "@react-native-community/async-storage";
import HealthcareAPI from '../api/HealthcareAPI';

class ReferralCreateScheduleDestinationScreen extends Component {

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
        user: {},
        healthFacilities: [],
        polis: [],
        selectedCity: 1,
        referralForm: this.props.navigation.getParam('referralForm'),
        isDateTimePickerVisible: false,
        referralType: this.props.navigation.getParam('referralType'),
        insurancePatientType: this.props.navigation.getParam('insurancePatientType'),
        city: this.props.navigation.getParam('city'),
        referralDate: new Date(),
        selectedItems: [],
        items: [{ id: '1', name: 'Rontgen' }, { id: '2', name: 'MRI' }],
        bloods: [],
        selectedRoom: 1,
        isSearched: false,
        spinner: false,
    };

    componentWillMount() {
        AsyncStorage
            .getItem('user')
            .then(result => {
                this.setState({ user: JSON.parse(result) });
                let today = this.state.referralDate;
                let tmp = this.state.referralForm;
                tmp.rujukan.idFaskesAsal = this.state.user.idFaskes;
                tmp.rujukan.tanggalPasienDirujuk = today.getFullYear() + '-' + this._doubleDigit((today.getMonth() + 1)) + '-' + this._doubleDigit(today.getDate());
                if (this.state.referralType <= 1) {
                    this._polis();
                    if (this.state.referralForm.rujukan.statusBayar <= 2) {
                        this._cityOfHealthFacility(this.state.user.idFaskes);
                    } else {
                        this._cityOfHealthFacility(this.state.user.idFaskes);
                    }
                } else {
                    tmp.rujukan.idTipeRuangan = 1;
                }
                this._bloodType();
                this.setState({ referralForm: tmp });
            })
    }

    _cityOfHealthFacility(id) {
        HealthcareAPI
            .get('/city/health/facility', { params: { id: id } })
            .then(response => 
                {
                    this.setState({ selectedCity: response.data });
                    this._healthFacilityByCity(response.data);
                }
            );
    }

    _healthFacilityByCity(id) {
        HealthcareAPI
            .get('/health/facility/city', { params: { idKota: id } })
            .then(response => 
                {
                    let list = response.data;
                    let tmp = this.state.referralForm;
                    tmp.rujukan.idFaskesTujuan = list[0].idFaskes;
                    this.setState({ healthFacilities: list, referralForm: tmp });
                }
            )
    }

    _healthFacilityVertical(id) {
        HealthcareAPI
            .get('/health/facility/vertical', { params: {id: id} })
            .then(response => 
                {
                    let list = response.data;
                    let tmp = this.state.referralForm;
                    tmp.rujukan.idFaskesTujuan = list[0].idFaskes;
                    this.setState({ healthFacilities: list, referralForm: tmp });
                }
            )
    }

    _polis() {
        HealthcareAPI
            .get('/poli/type/list')
            .then(response => 
                {
                    let list = response.data;
                    let tmp = this.state.referralForm;
                    tmp.rujukan.idJenisPoli = list[0].idJenisPoli;
                    this.setState({ polis: list, referralForm: tmp });
                }
            )
    }

    _poliOfHealthFacility(id) {
        HealthcareAPI
            .get('/poli/health/facility/list', { params: { id: id } })
            .then(response => 
                {
                    let list = response.data;
                    let tmp = this.state.referralForm;
                    tmp.rujukan.idJenisPoli = list[0].idJenisPoli;
                    this.setState({ polis: list, referralForm: tmp });
                }
            )
    }

    _bloodType() {
        HealthcareAPI
            .get('/blood/type/list')
            .then(response => 
                {
                    let list = response.data;
                    let tmp = this.state.referralForm;
                    if(tmp.pasien.idGolonganDarah) {
                        tmp.pasien.idGolonganDarah = list[0].idGolonganDarah;
                    }
                    console.log(list)
                    this.setState({bloods: list, referralForm: tmp});
                }
            )
    }

    _doubleDigit(number) {
        if (number < 10) {
            return '0' + number;
        }
        return number;
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this._hideDateTimePicker();
    };

    _onSelectedItemsChange(selectedItems) {
        this.setState({ selectedItems: selectedItems })
    };

    _setFormWizardScreen(isActive, index, text, isLast) {
        return <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginRight: (isLast ? 10 : 0) }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: (isActive ? '#00818c' : '#c4c4c4'), width: 15, height: 15, borderRadius: 100 }}>
                <Text style={{ color: '#ffffff', fontSize: 8 }}>
                    {index}
                </Text>
            </View>
            <Text style={{ color: (isActive ? '#00818c' : '#c4c4c4'), fontSize: 8, fontWeight: 'bold', marginLeft: 5 }}>{text}</Text>
            {isLast ? null : <View style={{ backgroundColor: (isActive ? '#00818c' : '#c4c4c4'), width: 20, height: 2, marginLeft: 5 }} />}
        </View>
    };

    _setScreen() {
        let { navigate } = this.props.navigation;

        if (this.state.referralType <= 1) {
            return <View>
                <View style={{ width: 100 + '%', height: 370, backgroundColor: '#ffffff' }}>
                    <View style={{ margin: 5 + '%' }}>
                        {
                            this.state.referralForm
                            ?
                                <View>
                                    <Text style={{ color: '#cacaca' }}>Kota / Kabupaten</Text>
                                    <View style={{ width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1 }}>
                                        <Picker
                                            selectedValue={this.state.selectedCity}
                                            onValueChange={(itemValue, itemIndex) => {
                                                this.setState({ selectedCity: itemValue })
                                                this._healthFacilityByCity(itemValue);
                                            }
                                            }
                                        >
                                            {
                                                this.state.city.map(type =>
                                                    <Picker.Item label={type.namaKota} value={type.idKota} key={type.idKota} />
                                                )
                                            }
                                        </Picker>
                                    </View>
                                </View>
                                :
                                null
                        }
                        <View style={{ marginTop: 15 }}>
                            <Text style={{ color: '#cacaca' }}>Fasilitas Kesehatan Tujuan Rujukan</Text>
                            <View style={{ width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1 }}>
                                <Picker
                                    selectedValue={this.state.referralForm.rujukan.idFaskesTujuan}
                                    onValueChange={(itemValue, itemIndex) => {
                                        let tmp = this.state.referralForm;
                                        tmp.rujukan.idFaskesTujuan = itemValue;
                                        this.setState({ referralForm: tmp });
                                    }
                                    }
                                >
                                    {
                                        this.state.healthFacilities.map(healthFacility =>
                                            <Picker.Item label={healthFacility.nama} value={healthFacility.idFaskes} key={healthFacility.idFaskes} />
                                        )
                                    }
                                </Picker>
                            </View>
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <Text style={{ color: '#cacaca' }}>Poli Rujukan</Text>
                            <View style={{ width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1 }}>
                                <Picker
                                    selectedValue={this.state.referralForm.rujukan.idJenisPoli}
                                    onValueChange={(itemValue, itemIndex) => {
                                        let tmp = this.state.referralForm;
                                        tmp.rujukan.idJenisPoli = itemValue;
                                        this.setState({ referralForm: tmp });
                                    }
                                    }
                                >
                                    {
                                        this.state.polis.map(poli =>
                                            <Picker.Item label={poli.namaJenisPoli} value={poli.idJenisPoli} key={poli.idJenisPoli} />
                                        )
                                    }
                                </Picker>
                            </View>
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <Text style={{ color: '#cacaca' }}>Tanggal Rujukan</Text>
                            <View style={{ borderBottomColor: '#c4c4c4', borderBottomWidth: 1 }}>
                                <TouchableOpacity onPress={this._showDateTimePicker}>
                                    <TextInput
                                        value={this.state.referralDate.getDate() + ' / '
                                            + (this.state.referralDate.getMonth() + 1) + ' / '
                                            + this.state.referralDate.getFullYear()}
                                        editable={false}
                                        selectTextOnFocus={false}
                                        style={{ color: '#000000', marginLeft: 4 }} />
                                </TouchableOpacity>
                            </View>
                            <DateTimePicker
                                date={this.state.referralDate}
                                isVisible={this.state.isDateTimePickerVisible}
                                onConfirm={(date) => {
                                    let tmp = this.state.referralDate;
                                    tmp = date;
                                    let tmp2 = this.state.referralForm;
                                    tmp2.rujukan.tanggalPasienDirujuk = tmp.getFullYear() + '-' + this._doubleDigit((tmp.getMonth() + 1)) + '-' + this._doubleDigit(tmp.getDate());
                                    this._hideDateTimePicker;
                                    this.setState({ isDateTimePickerVisible: false, referralDate: tmp, referralForm: tmp2 });
                                }}
                                onCancel={this._hideDateTimePicker}
                            />
                        </View>
                    </View>
                </View>

                <View style={{ alignItems: 'center', width: 100 + '%', height: 100 }}>
                    <TouchableOpacity
                        onPress={() =>
                            navigate('ReferralCreateReferralDataScreen', {
                                user: this.state.user,
                                referralForm: this.state.referralForm,
                                referralType: this.state.referralType,
                                insurancePatientType: this.state.insurancePatientType
                            }
                            )}
                        style={{ justifyContent: 'center', alignItems: 'center', width: 80 + '%', height: 35, borderRadius: 5, backgroundColor: '#28c667', marginTop: 20 }}>
                        <Text style={{ color: '#ffffff', fontSize: 12, fontWeight: 'bold' }}>Selanjutnya</Text>
                    </TouchableOpacity>
                </View>
            </View>
        } else {
            return <View>
                <View style={{ width: 100 + '%', minHeight: 300, backgroundColor: '#ffffff' }}>
                    <View style={{ margin: 5 + '%' }}>
                        <View>
                            <Text style={{ color: '#cacaca' }}>Ruangan</Text>
                            <View style={{ width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1 }}>
                                <Picker
                                    selectedValue={this.state.referralForm.rujukan.idTipeRuangan}
                                    onValueChange={(itemValue, itemIndex) => 
                                        {
                                            let tmp = this.state.referralForm;
                                            tmp.rujukan.idTipeRuangan = itemValue;
                                            this.setState({ referralForm: tmp });
                                        }
                                    }
                                >
                                    <Picker.Item label={'ICU'} value={1} />
                                    <Picker.Item label={'IGD'} value={2} />
                                </Picker>
                            </View>
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <Text style={{ color: '#cacaca' }}>Golongan Darah</Text>
                            <View style={{ width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1 }}>
                                <Picker
                                    selectedValue={this.state.referralForm.pasien.idGolonganDarah}
                                    onValueChange={(itemValue, itemIndex) => {
                                        let tmp = this.state.referralForm;
                                        tmp.pasien.idGolonganDarah = itemValue;
                                        this.setState({ referralForm: tmp });
                                    }
                                }
                                >
                                    {
                                        this.state.bloods.map(blood => 
                                            <Picker.Item label={blood.namaGolonganDarah} value={blood.idGolonganDarah} key={blood.idGolonganDarah} />
                                        )
                                    }
                                </Picker>
                            </View>
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <Text style={{ color: '#cacaca' }}>Penunjang</Text>
                            <View style={{ marginTop: 5 }}>
                                <View styl={{ marginLeft: 4 }}>
                                    <MultiSelect
                                        hideTags
                                        items={this.state.items}
                                        uniqueKey="id"
                                        ref={(component) => { this.multiSelect = component }}
                                        onSelectedItemsChange={(selectedItems) => this._onSelectedItemsChange(selectedItems)}
                                        selectedItems={this.state.selectedItems}
                                        selectText="Pilih Penunjang"
                                        searchInputPlaceholderText="Cari Penunjang..."
                                        onChangeInput={(text) => console.log(text)}
                                        tagRemoveIconColor="#f05d5e"
                                        tagBorderColor="#00818c"
                                        tagTextColor="#000000"
                                        selectedItemTextColor="#00818c"
                                        selectedItemIconColor="#00818c"
                                        itemTextColor="#000"
                                        displayKey="name"
                                        searchInputStyle={{ color: '#c4c4c4' }}
                                        styleDropdownMenuSubsection={{ color: 'red' }}
                                        submitButtonColor="#00818c"
                                        submitButtonText="Pilih"
                                    />
                                </View>
                                <View>
                                    {this.multiSelect && this.multiSelect.getSelectedItemsExt(this.state.selectedItems)}
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ alignItems: 'center', width: 100 + '%', height: 55 }}>
                    <TouchableOpacity
                        onPress={() => this._searchHealthFacility()} style={{ justifyContent: 'center', alignItems: 'center', width: 80 + '%', height: 35, borderRadius: 5, backgroundColor: '#00a6fb', marginTop: 20 }}>
                        <Text style={{ color: '#ffffff', fontSize: 12, fontWeight: 'bold' }}>Cari</Text>
                    </TouchableOpacity>
                </View>

                {this._setSearchResultScreen()}
            </View>
        }
    };

    _setSearchResultScreen() {
        let { navigate } = this.props.navigation;

        if (this.state.isSearched) {
            return <View>
                <View style={{ width: 100 + '%', height: 40, marginTop: 20, backgroundColor: '#ffffff' }}>
                    <Text style={{ color: '#000000', fontSize: 12, fontWeight: 'bold', marginHorizontal: 5 + '%', marginVertical: 10 }}>Hasil Pencarian</Text>
                </View>
                <ScrollView style={{ width: 100 + '%', backgroundColor: '#ffffff', height: 300 }} nestedScrollEnabled={true}>
                    <View style={{ marginHorizontal: 5 + '%' }}>
                        {
                            this.state.healthFacilities.map(healthFacility => 
                                <View key={healthFacility.idFaskes}>
                                    <View style={{ flexDirection: 'row', height: 125, alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'column', width: 70 + '%' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ color: '#000000', fontSize: 14, fontWeight: 'bold' }}>{healthFacility.nama}</Text>
                                                <View style={{ backgroundColor: '#00818c', height: 20, marginLeft: 10, borderRadius: 2, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ color: '#ffffff', fontSize: 10, fontWeight: 'bold', marginHorizontal: 7 }}>A</Text>
                                                </View>
                                            </View>
                                            <Text style={{ color: '#cacaca', fontSize: 10 }}>Kamar Kosong:</Text>
                                            <Text style={{ color: '#000000', fontSize: 10, fontWeight: 'bold' }}>{healthFacility.jumlahBedTersedia}</Text>
                                            <Text style={{ color: '#cacaca', fontSize: 10 }}>Fasilitas Tersedia:</Text>
                                            {/* <Text style={{ color: '#000000', fontSize: 10, fontWeight: 'bold' }}>USG, Rontgen, MRI, Colonoscopy, Endoscopy</Text> */}
                                            {/* <Text style={{ color: '#cacaca', fontSize: 10 }}>Jarak Lokasi:</Text>
                                            <Text style={{ fontSize: 10 }}>
                                                <Text style={{ color: '#000000', fontWeight: 'bold' }}>30 menit </Text>
                                                <Text style={{ color: '#aeaeae', fontWeight: 'bold' }}>(5 km)</Text>
                                            </Text> */}
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: 30 + '%' }}>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    {
                                                        let tmp = this.state.referralForm;
                                                        tmp.rujukan.idFaskesTujuan = healthFacility.idFaskes;
                                                        navigate('ReferralCreateReferralDataScreen', {
                                                            user: this.state.user,
                                                            referralForm: tmp,
                                                            referralType: this.state.referralType,
                                                            insurancePatientType: this.state.insurancePatientType
                                                        })
                                                    }
                                                }
                                                style={{ justifyContent: 'center', alignItems: 'center', width: 65, height: 30, backgroundColor: '#28c667', borderRadius: 5 }}>
                                                <Text style={{ color: '#ffffff', fontSize: 12, fontWeight: 'bold' }}>Pilih</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{ backgroundColor: '#eeeeee', width: 100 + '%', height: 1 }} />
                                </View>       
                            )
                        }
                    </View>
                </ScrollView>
            </View>
        }
    };

    _searchHealthFacility() {
        this.setState({ spinner: !this.state.spinner });
        HealthcareAPI
            .get('/health/facility/room', {params: {idTipeRuangan: this.state.selectedRoom}})
            .then(response => 
                {
                    this.setState({healthFacilities: response.data});
                    this.setState({spinner: !this.state.spinner,isSearched: true});
                }
            )
    };

    render() {
        return (
            <View style={styles.firstLayer}>
                <Spinner
                    animation={'slide'}
                    visible={this.state.spinner}
                    textContent={'Mencari Fasilitas Kesehatan...'}
                    textStyle={{ color: '#ffffff' }}
                />

                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', width: 100 + '%', minHeight: 50 }}>
                    {this._setFormWizardScreen(true, 1, 'Data Pasien', false)}
                    {this._setFormWizardScreen(true, 2, (this.state.referralType <= 1 ? 'Jadwal Rujukan' : 'Faskes Tujuan'), false)}
                    {this._setFormWizardScreen(false, 3, 'Data Rujukan', false)}
                    {this._setFormWizardScreen(false, 4, 'ICD-9 CM', false)}
                    {this._setFormWizardScreen(false, 5, 'ICD-10', true)}
                </View>

                <ScrollView>
                    {this._setScreen()}
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

export default ReferralCreateScheduleDestinationScreen;