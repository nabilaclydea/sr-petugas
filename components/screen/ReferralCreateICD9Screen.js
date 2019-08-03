import React, {Component} from 'react';
import {
    View,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
    Text,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class ReferralCreateICD9Screen extends Component {

    state = {
        isDateTimePickerVisible: false,
        referralType: this.props.navigation.getParam('referralType'),
        insurancePatientType: this.props.navigation.getParam('insurancePatientType'),
        selectedItems: [],
        items: [{id: '1', name: 'Rontgen'}, {id: '2', name: 'MRI'}],
        icd9: [
            {code: '00.01', name: 'Terapi ultrasound kapal kepala dan leher'},
            {code: '00.02', name: 'Terapi USG hati'},
            {code: '00.03', name: 'Terapi USG kapal pembuluh darah perifer'},
            {code: '00.09', name: 'USG terapeutik lainnya'},
            {code: '00.10', name: 'Implantasi agen kemoterapi'},
            {code: '00.11', name: 'Infusion dari alfa drotrecogin (diaktifkan)'},
            {code: '00.12', name: 'Administrasi oksida nitrat dihirup'},
            {code: '00.13', name: 'Injeksi atau infus nesiritide'},
            {code: '00.14', name: 'Injeksi atau infus kelas oksazolidinon antibiotik'},
        ],
        selectedICD9: [],
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

    _updateSelectedICD9(code, isSelected) {
        let current = this.state.selectedICD9;

        if (isSelected) {
            current = current.filter(icd9 => icd9 !== code)
        } else {
            current.push(code);
        }

        this.setState({selectedICD9: current});
    };

    _setICD9Screen() {
        return this.state.icd9.map(icd => {
            let code = icd.code;
            let isSelected = this.state.selectedICD9.includes(code);

            return <TouchableOpacity
                key={code}
                onPress={() => this._updateSelectedICD9(code, isSelected)}
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

    _setSelectedICD9Screen() {
        return this.state.selectedICD9.map(icd9 => {
            return <TouchableOpacity onPress={() => this._updateSelectedICD9(icd9, true)} key={icd9}
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
                        }}>{icd9}</Text>
                    </View>
                    <View style={{
                        position: 'absolute',
                        justifyContent: 'center',
                        alignItems: 'center',
                        right: 0,
                        top: 0,
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
                    {this._setFormWizardScreen(false, 5, 'ICD-10', true)}
                </View>

                <View style={{width: 100 + '%', height: 50, backgroundColor: '#ffffff'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 5 + '%'}}>
                        <Image style={{width: 15, height: 15, marginRight: 25}}
                               source={require('../../assets/images/magnifier.png')}/>
                        <TextInput placeholder={'Cari ICD-9 CM'}
                                   style={{color: '#cacaca', fontSize: 10, width: 90 + '%'}}/>
                    </View>
                </View>

                <ScrollView>
                    <ScrollView style={{height: 320}} nestedScrollEnabled={true}>
                        {this._setICD9Screen()}
                    </ScrollView>

                    <View style={{width: 100 + '%', height: 70, backgroundColor: '#ebebeb'}}>
                        <View style={{marginHorizontal: 5 + '%'}}>
                            <ScrollView horizontal={true} nestedScrollEnabled={true}>
                                {this._setSelectedICD9Screen()}
                            </ScrollView>
                        </View>
                    </View>

                    <View style={{alignItems: 'center', width: 100 + '%', minHeight: 55}}>
                        <TouchableOpacity
                            onPress={() =>
                                navigate('ReferralCreateICD10Screen', {
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

export default ReferralCreateICD9Screen;