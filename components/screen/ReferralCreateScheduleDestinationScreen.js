import React, {Component} from 'react';
import {View, ScrollView, Picker, TouchableOpacity, TextInput, Image, Text, StyleSheet, StatusBar} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import MultiSelect from 'react-native-multiple-select';
import Spinner from 'react-native-loading-spinner-overlay';

class ReferralCreateScheduleDestinationScreen extends Component {

    state = {
        isDateTimePickerVisible: false,
        referralType: this.props.navigation.getParam('referralType'),
        insurancePatientType: this.props.navigation.getParam('insurancePatientType'),
        referralDate: new Date(),
        selectedItems: [],
        items: [{id: '1', name: 'Rontgen'}, {id: '2', name: 'MRI'}],
        isSearched: false,
        spinner: false,
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

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this._hideDateTimePicker();
    };

    _onSelectedItemsChange(selectedItems) {
        this.setState({selectedItems: selectedItems})
    };

    _setFormWizardScreen(isActive, index, text, isLast) {
        return <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginRight: (isLast ? 10 : 0)}}>
            <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: (isActive ? '#00818c': '#c4c4c4'), width: 15, height: 15, borderRadius: 100}}>
                <Text style={{color: '#ffffff', fontSize: 8}}>
                    {index}
                </Text>
            </View>
            <Text style={{color: (isActive ? '#00818c': '#c4c4c4'), fontSize: 8, fontWeight: 'bold', marginLeft: 5}}>{text}</Text>
            {isLast ? null : <View style={{backgroundColor: (isActive ? '#00818c': '#c4c4c4'), width: 20, height: 2, marginLeft: 5}} />}
        </View>
    };

    _setScreen() {
        let {navigate} = this.props.navigation;

        if(this.state.referralType <= 1) {
            return <View>
                <View style={{width: 100 + '%', height: 370, backgroundColor: '#ffffff'}}>
                    <View style={{margin: 5 + '%'}}>
                        <View>
                            <Text style={{color: '#cacaca'}}>Kota / Kabupaten</Text>
                            <View style={{width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1}}>
                                <Picker
                                    selectedValue={this.state.insurancePatientType}
                                    onValueChange={(itemValue, itemIndex) => this.setState({insurancePatientType: itemValue})}
                                >
                                    <Picker.Item label={'Tangerang Selatan'} value={1}/>
                                    <Picker.Item label={'Kota Tangerang'} value={2}/>
                                </Picker>
                            </View>
                        </View>
                        <View style={{marginTop: 15}}>
                            <Text style={{color: '#cacaca'}}>Fasilitas Kesehatan Tujuan Rujukan</Text>
                            <View style={{width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1}}>
                                <Picker
                                    selectedValue={this.state.insurancePatientType}
                                    onValueChange={(itemValue, itemIndex) => this.setState({insurancePatientType: itemValue})}
                                >
                                    <Picker.Item label={'RS Pondok Indah'} value={1}/>
                                    <Picker.Item label={'RS Medika'} value={2}/>
                                </Picker>
                            </View>
                        </View>
                        <View style={{marginTop: 15}}>
                            <Text style={{color: '#cacaca'}}>Poli Rujukan</Text>
                            <View style={{width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1}}>
                                <Picker
                                    selectedValue={this.state.insurancePatientType}
                                    onValueChange={(itemValue, itemIndex) => this.setState({insurancePatientType: itemValue})}
                                >
                                    <Picker.Item label={'Anak'} value={1}/>
                                    <Picker.Item label={'Bedah Dalam'} value={2}/>
                                </Picker>
                            </View>
                        </View>
                        <View style={{marginTop: 15}}>
                            <Text style={{color: '#cacaca'}}>Tanggal Rujukan</Text>
                            <View style={{borderBottomColor: '#c4c4c4', borderBottomWidth: 1}}>
                                <TouchableOpacity onPress={this._showDateTimePicker}>
                                    <TextInput
                                        value={this.state.referralDate.getDate() + ' / '
                                        + (this.state.referralDate.getMonth() + 1) + ' / '
                                        + this.state.referralDate.getFullYear()}
                                        editable={false}
                                        selectTextOnFocus={false}
                                        style={{color: '#000000', marginLeft: 4}} />
                                </TouchableOpacity>
                            </View>
                            <DateTimePicker
                                date={this.state.referralDate}
                                isVisible={this.state.isDateTimePickerVisible}
                                onConfirm={(date) => {
                                    this.setState({referralDate: date})
                                }}
                                onCancel={this._hideDateTimePicker}
                            />
                        </View>
                    </View>
                </View>

                <View style={{alignItems: 'center', width: 100 + '%', height: 100}}>
                    <TouchableOpacity
                        onPress={() =>
                            navigate('ReferralCreateReferralDataScreen', {
                                    referralType: this.state.referralType,
                                    insurancePatientType: this.state.insurancePatientType
                                }
                            )}
                        style={{justifyContent: 'center', alignItems: 'center', width: 80 + '%', height: 35, borderRadius: 5, backgroundColor: '#28c667', marginTop: 20}}>
                        <Text style={{color: '#ffffff', fontSize: 12, fontWeight: 'bold'}}>Selanjutnya</Text>
                    </TouchableOpacity>
                </View>
            </View>
        } else {
            return <View>
                <View style={{width: 100 + '%', minHeight: 300, backgroundColor: '#ffffff'}}>
                    <View style={{margin: 5 + '%'}}>
                        <View>
                            <Text style={{color: '#cacaca'}}>Ruangan</Text>
                            <View style={{width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1}}>
                                <Picker
                                    selectedValue={this.state.insurancePatientType}
                                    onValueChange={(itemValue, itemIndex) => this.setState({insurancePatientType: itemValue})}
                                >
                                    <Picker.Item label={'ICU'} value={1}/>
                                    <Picker.Item label={'IGD'} value={2}/>
                                </Picker>
                            </View>
                        </View>
                        <View style={{marginTop: 15}}>
                            <Text style={{color: '#cacaca'}}>Golongan Darah</Text>
                            <View style={{width: 100 + '%', borderBottomColor: '#c4c4c4', borderBottomWidth: 1}}>
                                <Picker
                                    selectedValue={this.state.insurancePatientType}
                                    onValueChange={(itemValue, itemIndex) => this.setState({insurancePatientType: itemValue})}
                                >
                                    <Picker.Item label={'A'} value={1}/>
                                    <Picker.Item label={'B'} value={2}/>
                                    <Picker.Item label={'AB'} value={3}/>
                                    <Picker.Item label={'O'} value={4}/>
                                </Picker>
                            </View>
                        </View>
                        <View style={{marginTop: 15}}>
                            <Text style={{color: '#cacaca'}}>Penunjang</Text>
                            <View style={{marginTop: 5}}>
                                <View styl={{marginLeft: 4}}>
                                    <MultiSelect
                                        hideTags
                                        items={this.state.items}
                                        uniqueKey="id"
                                        ref={(component) => { this.multiSelect = component }}
                                        onSelectedItemsChange={(selectedItems) => this._onSelectedItemsChange(selectedItems)}
                                        selectedItems={this.state.selectedItems}
                                        selectText="Pilih Penunjang"
                                        searchInputPlaceholderText="Cari Penunjang..."
                                        onChangeInput={ (text)=> console.log(text)}
                                        tagRemoveIconColor="#f05d5e"
                                        tagBorderColor="#00818c"
                                        tagTextColor="#000000"
                                        selectedItemTextColor="#00818c"
                                        selectedItemIconColor="#00818c"
                                        itemTextColor="#000"
                                        displayKey="name"
                                        searchInputStyle={{ color: '#c4c4c4'}}
                                        styleDropdownMenuSubsection={{color: 'red'}}
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

                <View style={{alignItems: 'center', width: 100 + '%', height: 55}}>
                    <TouchableOpacity
                        onPress={() => this._searchHealthFacility()} style={{justifyContent: 'center', alignItems: 'center', width: 80 + '%', height: 35, borderRadius: 5, backgroundColor: '#00a6fb', marginTop: 20}}>
                        <Text style={{color: '#ffffff', fontSize: 12, fontWeight: 'bold'}}>Cari</Text>
                    </TouchableOpacity>
                </View>

                {this._setSearchResultScreen()}
            </View>
        }
    };

    _setSearchResultScreen() {
        let {navigate} = this.props.navigation;

        if(this.state.isSearched) {
            return <View>
                <View style={{width: 100 + '%', height: 40, marginTop: 20, backgroundColor: '#ffffff'}}>
                    <Text style={{color: '#000000', fontSize:12, fontWeight: 'bold', marginHorizontal: 5 + '%', marginVertical: 10}}>Hasil Pencarian</Text>
                </View>
                <ScrollView style={{width: 100 + '%', backgroundColor: '#ffffff', height: 300}} nestedScrollEnabled={true}>
                    <View style={{marginHorizontal: 5 + '%'}}>
                        <View>
                            <View style={{flexDirection: 'row', height: 125, alignItems: 'center'}}>
                                <View style={{flexDirection: 'column', width: 70 + '%'}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{color: '#000000', fontSize: 14, fontWeight: 'bold'}}>RS Pondok Indah</Text>
                                        <View style={{backgroundColor: '#00818c', height: 20, marginLeft: 10, borderRadius: 2, justifyContent: 'center', alignItems: 'center'}}>
                                            <Text style={{color: '#ffffff', fontSize: 10, fontWeight: 'bold', marginHorizontal: 7}}>A</Text>
                                        </View>
                                    </View>
                                    <Text style={{color: '#cacaca', fontSize: 10}}>Kamar Kosong:</Text>
                                    <Text style={{color: '#000000', fontSize: 10, fontWeight: 'bold'}}>5</Text>
                                    <Text style={{color: '#cacaca', fontSize: 10}}>Fasilitas Tersedia:</Text>
                                    <Text style={{color: '#000000', fontSize: 10, fontWeight: 'bold'}}>USG, Rontgen, MRI, Colonoscopy, Endoscopy</Text>
                                    <Text style={{color: '#cacaca', fontSize: 10}}>Jarak Lokasi:</Text>
                                    <Text style={{fontSize: 10}}>
                                        <Text style={{color: '#000000', fontWeight: 'bold'}}>30 menit </Text>
                                        <Text style={{color: '#aeaeae', fontWeight: 'bold'}}>(5 km)</Text>
                                    </Text>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'flex-end', width: 30 + '%'}}>
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigate('ReferralCreateReferralDataScreen', {
                                                    referralType: this.state.referralType,
                                                    insurancePatientType: this.state.insurancePatientType
                                                }
                                            )}
                                        style={{justifyContent: 'center', alignItems: 'center', width: 65, height: 30, backgroundColor: '#28c667', borderRadius: 5}}>
                                        <Text style={{color: '#ffffff', fontSize: 12, fontWeight: 'bold'}}>Pilih</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{backgroundColor: '#eeeeee', width: 100 + '%', height: 1}}/>
                        </View>
                        <View>
                            <View style={{flexDirection: 'row', height: 125, alignItems: 'center'}}>
                                <View style={{flexDirection: 'column', width: 70 + '%'}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{color: '#000000', fontSize: 14, fontWeight: 'bold'}}>RS Sari Asih Ciputat</Text>
                                        <View style={{backgroundColor: '#00818c', height: 20, marginLeft: 10, borderRadius: 2, justifyContent: 'center', alignItems: 'center'}}>
                                            <Text style={{color: '#ffffff', fontSize: 10, fontWeight: 'bold', marginHorizontal: 7}}>A</Text>
                                        </View>
                                    </View>
                                    <Text style={{color: '#cacaca', fontSize: 10}}>Kamar Kosong:</Text>
                                    <Text style={{color: '#000000', fontSize: 10, fontWeight: 'bold'}}>5</Text>
                                    <Text style={{color: '#cacaca', fontSize: 10}}>Fasilitas Tersedia:</Text>
                                    <Text style={{color: '#000000', fontSize: 10, fontWeight: 'bold'}}>USG, Rontgen, MRI, Colonoscopy, Endoscopy</Text>
                                    <Text style={{color: '#cacaca', fontSize: 10}}>Jarak Lokasi:</Text>
                                    <Text style={{fontSize: 10}}>
                                        <Text style={{color: '#000000', fontWeight: 'bold'}}>1 jam 45 menit </Text>
                                        <Text style={{color: '#aeaeae', fontWeight: 'bold'}}>(15 km)</Text>
                                    </Text>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'flex-end', width: 30 + '%'}}>
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigate('ReferralCreateReferralDataScreen', {
                                                    referralType: this.state.referralType,
                                                    insurancePatientType: this.state.insurancePatientType
                                                }
                                            )}
                                        style={{justifyContent: 'center', alignItems: 'center', width: 65, height: 30, backgroundColor: '#28c667', borderRadius: 5}}>
                                        <Text style={{color: '#ffffff', fontSize: 12, fontWeight: 'bold'}}>Pilih</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{backgroundColor: '#eeeeee', width: 100 + '%', height: 1}}/>
                        </View>
                        <View>
                            <View style={{flexDirection: 'row', height: 125, alignItems: 'center'}}>
                                <View style={{flexDirection: 'column', width: 70 + '%'}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{color: '#000000', fontSize: 14, fontWeight: 'bold'}}>RS Eka Hospital</Text>
                                        <View style={{backgroundColor: '#00818c', height: 20, marginLeft: 10, borderRadius: 2, justifyContent: 'center', alignItems: 'center'}}>
                                            <Text style={{color: '#ffffff', fontSize: 10, fontWeight: 'bold', marginHorizontal: 7}}>A</Text>
                                        </View>
                                    </View>
                                    <Text style={{color: '#cacaca', fontSize: 10}}>Kamar Kosong:</Text>
                                    <Text style={{color: '#000000', fontSize: 10, fontWeight: 'bold'}}>5</Text>
                                    <Text style={{color: '#cacaca', fontSize: 10}}>Fasilitas Tersedia:</Text>
                                    <Text style={{color: '#000000', fontSize: 10, fontWeight: 'bold'}}>USG, Rontgen, MRI, Colonoscopy, Endoscopy</Text>
                                    <Text style={{color: '#cacaca', fontSize: 10}}>Jarak Lokasi:</Text>
                                    <Text style={{fontSize: 10}}>
                                        <Text style={{color: '#000000', fontWeight: 'bold'}}>1 jam </Text>
                                        <Text style={{color: '#aeaeae', fontWeight: 'bold'}}>(10 km)</Text>
                                    </Text>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'flex-end', width: 30 + '%'}}>
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigate('ReferralCreateReferralDataScreen', {
                                                    referralType: this.state.referralType,
                                                    insurancePatientType: this.state.insurancePatientType
                                                }
                                            )}
                                        style={{justifyContent: 'center', alignItems: 'center', width: 65, height: 30, backgroundColor: '#28c667', borderRadius: 5}}>
                                        <Text style={{color: '#ffffff', fontSize: 12, fontWeight: 'bold'}}>Pilih</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{backgroundColor: '#eeeeee', width: 100 + '%', height: 1}}/>
                        </View>
                        <View>
                            <View style={{flexDirection: 'row', height: 125, alignItems: 'center'}}>
                                <View style={{flexDirection: 'column', width: 70 + '%'}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{color: '#000000', fontSize: 14, fontWeight: 'bold'}}>RS Buah Hati Pamulang</Text>
                                        <View style={{backgroundColor: '#00818c', height: 20, marginLeft: 10, borderRadius: 2, justifyContent: 'center', alignItems: 'center'}}>
                                            <Text style={{color: '#ffffff', fontSize: 10, fontWeight: 'bold', marginHorizontal: 7}}>A</Text>
                                        </View>
                                    </View>
                                    <Text style={{color: '#cacaca', fontSize: 10}}>Kamar Kosong:</Text>
                                    <Text style={{color: '#000000', fontSize: 10, fontWeight: 'bold'}}>5</Text>
                                    <Text style={{color: '#cacaca', fontSize: 10}}>Fasilitas Tersedia:</Text>
                                    <Text style={{color: '#000000', fontSize: 10, fontWeight: 'bold'}}>USG, Rontgen, MRI, Colonoscopy, Endoscopy</Text>
                                    <Text style={{color: '#cacaca', fontSize: 10}}>Jarak Lokasi:</Text>
                                    <Text style={{fontSize: 10}}>
                                        <Text style={{color: '#000000', fontWeight: 'bold'}}>20 menit </Text>
                                        <Text style={{color: '#aeaeae', fontWeight: 'bold'}}>(4 km)</Text>
                                    </Text>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'flex-end', width: 30 + '%'}}>
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigate('ReferralCreateReferralDataScreen', {
                                                    referralType: this.state.referralType,
                                                    insurancePatientType: this.state.insurancePatientType
                                                }
                                            )}
                                        style={{justifyContent: 'center', alignItems: 'center', width: 65, height: 30, backgroundColor: '#28c667', borderRadius: 5}}>
                                        <Text style={{color: '#ffffff', fontSize: 12, fontWeight: 'bold'}}>Pilih</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{backgroundColor: '#eeeeee', width: 100 + '%', height: 1}}/>
                        </View>
                    </View>
                </ScrollView>
            </View>
        }
    };

    _searchHealthFacility() {
        this.setState({spinner: !this.state.spinner});
        setTimeout(() => {
            this.setState({
                spinner: !this.state.spinner,
                isSearched: true
            });
        }, 3000);
    };

    render() {
        return(
            <View style={styles.firstLayer}>
                <Spinner
                    animation={'slide'}
                    visible={this.state.spinner}
                    textContent={'Mencari Fasilitas Kesehatan...'}
                    textStyle={{color: '#ffffff'}}
                />

                <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', width: 100 + '%', minHeight: 50}}>
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