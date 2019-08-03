import React, {Component} from 'react';
import {View, ScrollView, Picker, TouchableOpacity, TextInput, Image, Text, StyleSheet, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class ReferralCreateICD10Screen extends Component {

    state = {
        isDateTimePickerVisible: false,
        referralType: this.props.navigation.getParam('referralType'),
        insurancePatientType: this.props.navigation.getParam('insurancePatientType'),
        selectedItems: [],
        items: [{id: '1', name: 'Rontgen'}, {id: '2', name: 'MRI'}],
        icd10: [
            {code: 'A00', name: 'Kolera'},
            {code: 'A01.0', name: 'Tifus'},
            {code: 'A01.1', name: 'Demam Paratipus A'},
            {code: 'A01.2', name: 'Demam Paratipus B'},
            {code: 'A01.3', name: 'Demam Paratipus C'},
            {code: 'A01.4', name: 'Demam Paratipus yang tidak ditentukan'},
            {code: 'A02', name: 'Infeksi Lain dari Salmonela'},
            {code: 'A03.0', name: 'Infeksi Shigella Akibat Shigella Disentri'},
            {code: 'A03.1', name: 'Infeksi Shigella Akibat Shigella Flexneri'},
        ],
        selectedICD10: [],
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
        </View>
    };

    _updateSelectedICD10(code, isSelected) {
        let current = this.state.selectedICD10;

        if (isSelected) {
            current = current.filter(icd10 => icd10 !== code)
        } else {
            current.push(code);
        }

        this.setState({selectedICD10: current});
    };

    _setICD10Screen() {
        return this.state.icd10.map(icd => {
            let code = icd.code;
            let isSelected = this.state.selectedICD10.includes(code);

            return <TouchableOpacity
                key={code}
                onPress={() => this._updateSelectedICD10(code, isSelected)}
                style={{
                    width: 100 + '%',
                    height: 80,
                    backgroundColor: (isSelected ? '#f8f8f8' : '#ffffff'),
                    borderBottomColor: '#f8f8f8',
                    borderBottomWidth: 1
                }}>
                <View style={{
                    flexDirection: 'row',
                    height: 100 + '%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 5 + '%'
                }}>
                    <View style={{width: 20 + '%', justifyContent: 'center'}}>
                        <Text>{code}</Text>
                    </View>
                    <View style={{width: 70 + '%', justifyContent: 'center'}}>
                        <Text>{icd.name}</Text>
                    </View>
                    <View style={{width: 10 + '%', justifyContent: 'center'}}>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 20,
                                height: 20,
                                backgroundColor: (isSelected ? '#00818c' : '#ffffff'),
                                borderColor: (isSelected ? '#00818c' : '#cacaca'),
                                borderRadius: 3,
                                borderWidth: 2
                            }}>
                                {isSelected ?
                                    <Image style={{width: 10, height: 10}}
                                           source={require('../../assets/images/tick.png')}/> : null}
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        });
    };

    _setSelectedICD10Screen() {
        return this.state.selectedICD10.map(icd10 => {
            return <TouchableOpacity onPress={() => this._updateSelectedICD10(icd10, true)} key={icd10}
                                     style={{justifyContent: 'center', width: 100, height: 70}}>
                <View style={{justifyContent: 'flex-end', width: 75, height: 35}}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 70,
                        height: 30,
                        borderRadius: 3,
                        backgroundColor: '#ffffff'
                    }}>
                        <Text style={{
                            color: '#000000',
                            fontSize: 10,
                            fontWeight: 'bold'
                        }}>{icd10}</Text>
                    </View>
                    <View style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 10,
                        height: 10,
                        borderRadius: 100,
                        backgroundColor: '#ffffff',
                        borderColor: '#f05d5e',
                        borderWidth: 1
                    }}>
                        <Icon name={'close'} color={'#f05d5e'} size={8} />
                    </View>
                </View>
            </TouchableOpacity>
        });
    };

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.firstLayer}>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: '#ffffff',
                    width: 100 + '%',
                    minHeight: 50
                }}>
                    {this._setFormWizardScreen(true, 1, 'Data Pasien', false)}
                    {this._setFormWizardScreen(true, 2, (this.state.referralType <= 1 ? 'Jadwal Rujukan' : 'Faskes Tujuan'), false)}
                    {this._setFormWizardScreen(true, 3, 'Data Rujukan', false)}
                    {this._setFormWizardScreen(true, 4, 'ICD-9 CM', false)}
                    {this._setFormWizardScreen(true, 5, 'ICD-10', true)}
                </View>

                <View style={{width: 100 + '%', height: 50, backgroundColor: '#ffffff'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 5 + '%'}}>
                        <Image style={{width: 15, height: 15, marginRight: 25}}
                               source={require('../../assets/images/magnifier.png')}/>
                        <TextInput placeholder={'Cari ICD-10'}
                                   style={{color: '#cacaca', fontSize: 10, width: 90 + '%'}}/>
                    </View>
                </View>

                <ScrollView>
                    <ScrollView style={{height: 320}} nestedScrollEnabled={true}>
                        {this._setICD10Screen()}
                    </ScrollView>

                    <View style={{width: 100 + '%', height: 70, backgroundColor: '#ebebeb'}}>
                        <View style={{marginHorizontal: 5 + '%'}}>
                            <ScrollView horizontal={true} nestedScrollEnabled={true}>
                                {this._setSelectedICD10Screen()}
                            </ScrollView>
                        </View>
                    </View>

                    <View style={{alignItems: 'center', width: 100 + '%', minHeight: 55}}>
                        <TouchableOpacity
                            onPress={() =>
                                navigate('ReferralCreateFinish', {
                                        referralType: this.state.referralType,
                                        insurancePatientType: this.state.insurancePatientType
                                    }
                                )}
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

export default ReferralCreateICD10Screen;