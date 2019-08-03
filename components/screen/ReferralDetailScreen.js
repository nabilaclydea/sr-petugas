import React, {Component} from 'react';
import {View, ScrollView, TouchableOpacity, Image, StyleSheet, Text, TextInput} from 'react-native';
import {StackActions} from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import HealthcareAPI from '../api/HealthcareAPI';

class ReferralDetailScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerStyle: {
                color: '#ffffff',
            },
            headerTintColor: '#000000',
            headerTitle:
                <View>
                    <Text style={{fontSize: 18, fontWeight: 'bold', color: '#000000'}}>{navigation.getParam('referral').noRujukan}</Text>
                    <Text style={{fontSize: 10, color: '#000000'}}>nomor rujukan</Text>
                </View>
            ,
        };
    };

    state = {
        day: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
        month: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
        referral: this.props.navigation.getParam('referral'),
        activeStatus: this.props.navigation.getParam('activeStatus'),
        referralDirection: this.props.navigation.getParam('referralDirection'),
        referralType: this.props.navigation.getParam('referralType'),
        spinner: false,
        actionType: 1,
        reasons: "",
    };

    _setReferralAcceptedScreen() {
        if(this.state.referralDirection <= 0) {
            if(this.state.activeStatus <= 1) {
                return <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20, marginHorizontal: 40}}>
                    <TouchableOpacity onPress={() => this._processReferral(4)} activeOpacity={0.7} style={{backgroundColor: '#f05d5e', justifyContent: 'center', alignItems: 'center', width: 45 + '%', height: 40, borderRadius: 4}}>
                        <Text style={{color: '#ffffff', fontSize: 12, fontWeight: 'bold'}}>Tolak Rujukan</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this._processReferral(3)} activeOpacity={0.7} style={{backgroundColor: '#28c667', justifyContent: 'center', alignItems: 'center', width: 45 + '%', height: 40, borderRadius: 4}}>
                        <Text style={{color: '#ffffff', fontSize: 12, fontWeight: 'bold'}}>Terima Rujukan</Text>
                    </TouchableOpacity>
                </View>
            } else if(this.state.activeStatus <= 2) {
                return <View>
                    <View style={{justifyContent: 'center', width: 100 + '%', height: 25}}>
                        <Text style={{color: '#000000', fontWeight: 'bold', marginLeft: 3 + '%'}}>Data Rujuk Balik</Text>
                    </View>
                    <View style={{backgroundColor: '#ffffff', width: 100 + '%', minHeight: 0, maxHeight: 200}}>
                        <View style={{margin: 5 + '%'}}>
                            <View style={{marginHorizontal: 5 + '%'}}>
                                <Text style={{color: '#c4c4c4', fontSize: 10}}>Alasan Rujuk Balik</Text>
                                <TextInput onChangeText={(text) => this.setState({reasons: text})} style={{marginLeft: 4, borderBottomColor: '#c4c4c4', borderBottomWidth: 1, height: 70}} multiline={true} />
                            </View>
                        </View>
                    </View>
                    <View style={{backgroundColor: '#f2f5f7', width: 100 + '%', minHeight: 80}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20, marginHorizontal: 40}}>
                            <TouchableOpacity onPress={() => this._processReferral(5)} activeOpacity={0.7} style={{backgroundColor: '#00a6fb', justifyContent: 'center', alignItems: 'center', width: 100 + '%', height: 40, borderRadius: 4}}>
                                <Text style={{color: '#ffffff', fontSize: 12, fontWeight: 'bold'}}>Rujuk Balik</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            }
        } else {
            if(this.state.activeStatus == 1) {
                return <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 20, marginHorizontal: 40}}>
                    <TouchableOpacity onPress={() => this._processReferral(2)} activeOpacity={0.7} style={{backgroundColor: '#e9d758', justifyContent: 'center', alignItems: 'center', width: 90 + '%', height: 40, borderRadius: 4}}>
                        <Text style={{color: '#ffffff', fontSize: 12, fontWeight: 'bold'}}>Batal Rujuk</Text>
                    </TouchableOpacity>
                </View>
            }
        }
    };

    _setReferralWaitingScreen() {
        if(this.state.activeStatus == 1) {
            if(this.state.referralDirection <= 0) {
                return <View style={{backgroundColor: '#f2f5f7', width: 100 + '%', minHeight: 120}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20, marginHorizontal: 40}}>
                        <TouchableOpacity onPress={() => this._processReferral(4)} activeOpacity={0.7} style={{backgroundColor: '#f05d5e', justifyContent: 'center', alignItems: 'center', width: 45 + '%', height: 40, borderRadius: 4}}>
                            <Text style={{color: '#ffffff', fontSize: 12, fontWeight: 'bold'}}>Tolak Rujukan</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._processReferral(3)} activeOpacity={0.7} style={{backgroundColor: '#28c667', justifyContent: 'center', alignItems: 'center', width: 45 + '%', height: 40, borderRadius: 4}}>
                            <Text style={{color: '#ffffff', fontSize: 12, fontWeight: 'bold'}}>Terima Rujukan</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            } else {
                return <View style={{backgroundColor: '#f2f5f7', width: 100 + '%', minHeight: 120}}>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 20, marginHorizontal: 40}}>
                        <TouchableOpacity onPress={() => this._processReferral(2)} activeOpacity={0.7} style={{backgroundColor: '#e9d758', justifyContent: 'center', alignItems: 'center', width: 90 + '%', height: 40, borderRadius: 4}}>
                            <Text style={{color: '#ffffff', fontSize: 12, fontWeight: 'bold'}}>Batal Rujuk</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        }
    };

    _processReferral(actionType) {
        this.setState({spinner: !this.state.spinner, actionType: actionType});

        HealthcareAPI
            .post(
                '/referral/update',
                {
                    id: this.state.referral.noRujukan,
                    status: actionType,
                    reasons: this.state.reasons,
                }
            )
            .then(() => {
                this.setState({spinner: !this.state.spinner});
                let popAction = StackActions.pop({
                    n: 1,
                });

                this.props.navigation.dispatch(popAction);
            })
            .catch(error => console.log(error.response));
    };

    _getAge(dateString) {
        let today = new Date();
        let birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    render () {
        return (
            <ScrollView style={styles.firstLayer}>
                <Spinner
                    animation={'slide'}
                    visible={this.state.spinner}
                    textContent={(
                        this.state.actionType <= 2 ? 'Membatalkan' :
                            this.state.actionType <= 3 ? 'Menerima' :
                                this.state.actionType <= 4 ? 'Menolak' : 'Merujuk Balik') + ' Rujukan...'}
                    textStyle={{color: '#ffffff'}}
                />
                <View style={{backgroundColor: '#ffffff', width: 100 + '%', minHeight: 310}}>
                    <View style={{margin: 5 + '%'}}>
                        <Text style={{color: '#c4c4c4', fontSize: 10}}>{this.state.referralDirection <= 0 ? 'Asal Rujukan' : 'Tujuan Rujukan'}</Text>
                        <View style={{flexDirection: 'row', width: 100 + '%', minHeight: 100, marginTop: 5}}>
                            <View style={{width: 27 + '%', aspectRatio: 1}}>
                                <Image style={{width: 100 + '%', height: 100 + '%', borderRadius: 5}} resizeMode={'cover'} source={require('../../assets/images/rspib.jpg')} />
                            </View>
                            <View style={{justifyContent: 'center', width: 50 + '%', marginLeft: 3 + '%'}}>
                                <Text style={{flexWrap: 'wrap', color: '#000000', fontSize: 12, fontWeight: 'bold', width: 100}}>{this.state.referralDirection <= 0 ? this.state.referral.faskesAsal.nama : this.state.referral.faskesTujuan.nama}</Text>
                                {/*<Text style={{color: '#cacaca', fontSize: 10}}>Pondok Aren</Text>*/}
                                <View style={{flexDirection: 'row', marginTop: 10 + '%'}}>
                                    <View style={{backgroundColor: '#00818c', height: 20, borderRadius: 2, justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={{color: '#ffffff', fontSize: 10, fontWeight: 'bold', marginHorizontal: 7}}>A</Text>
                                    </View>
                                    <Image style={{width: 100, height: 20, marginLeft: 7}} resizeMode={'contain'} source={require('../../assets/images/bpjs.png')} />
                                </View>
                            </View>
                            <View style={{width: 20 + '%'}}>
                                <View style={{justifyItems: 'center', width: 100 + '%'}}>
                                    <Text style={{color: '#019ca9', fontSize: 18, fontWeight: 'bold', textAlign: 'right'}}>{this.state.day[(new Date(this.state.referral.rekamMedis.tanggalPemeriksaan)).getDay()]}</Text>
                                    <Text style={{color: '#000000', fontSize: 10, textAlign: 'right'}}>
                                        {(new Date(this.state.referral.rekamMedis.tanggalPemeriksaan)).getDate() + ' ' +
                                        this.state.month[(new Date(this.state.referral.rekamMedis.tanggalPemeriksaan)).getMonth()] + ' ' +
                                        (new Date(this.state.referral.rekamMedis.tanggalPemeriksaan)).getFullYear()}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={{marginTop: 10}}>
                            <Text style={{color: '#c4c4c4', fontSize: 10}}>Pembuat Rujukan</Text>
                            <Text style={{color: '#000000', fontSize: 14, fontWeight: 'bold', marginTop: 5}}>{this.state.referral.tenagaKesehatan.nama}</Text>
                        </View>
                        <View style={{marginTop: 10}}>
                            <Text style={{color: '#c4c4c4', fontSize: 10}}>Nama Pasien</Text>
                            <Text style={{color: '#000000', fontSize: 14, fontWeight: 'bold', marginTop: 5}}>{this.state.referral.pasien.nama}</Text>
                        </View>
                        <View style={{marginTop: 10}}>
                            <Text style={{color: '#c4c4c4', fontSize: 10}}>Diagnosis</Text>
                            <Text style={{color: '#000000', fontSize: 14, fontWeight: 'bold', marginTop: 5}}>{this.state.referral.rekamMedis.diagnosisText}</Text>
                        </View>
                    </View>
                </View>
                {this._setReferralAcceptedScreen()}
                <View style={{justifyContent: 'center', width: 100 + '%', height: 25}}>
                    <Text style={{color: '#000000', fontWeight: 'bold', marginLeft: 3 + '%'}}>Deskripsi Rujukan</Text>
                </View>
                <View style={{backgroundColor: '#ffffff', width: 100 + '%', minHeight: 0, maxHeight: 200}}>
                    <View style={{margin: 5 + '%'}}>
                        <View style={{marginHorizontal: 5 + '%'}}>
                            <Text style={{color: '#c4c4c4', fontSize: 10}}>{this.state.referralType <= 1 ? 'Poli' : 'Ruang'} Rujukan</Text>
                            <Text style={{color: '#000000', fontSize: 14, fontWeight: 'bold', marginTop: 5}}>
                                {this.state.referralType <= 1 ? this.state.referral.poli.namaJenisPoli : this.state.referral.ruangan.namaTipeRuangan}
                            </Text>
                        </View>
                        <View style={{marginHorizontal: 5 + '%', marginTop: 10}}>
                            <Text style={{color: '#c4c4c4', fontSize: 10}}>Alasan Rujukan</Text>
                            <Text style={{color: '#000000', fontSize: 14, textAlign: 'justify', marginTop: 5}}>
                                {this.state.referral.alasanDirujuk}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{justifyContent: 'center', width: 100 + '%', height: 25}}>
                    <Text style={{color: '#000000', fontWeight: 'bold', marginLeft: 3 + '%'}}>Data Pasien</Text>
                </View>
                <View style={{backgroundColor: '#ffffff', width: 100 + '%', minHeight: 220}}>
                    <View style={{margin: 5 + '%'}}>
                        <View style={{marginHorizontal: 5 + '%'}}>
                            <Text style={{color: '#c4c4c4', fontSize: 10}}>Tanggal Lahir</Text>
                            <Text style={{color: '#000000', fontSize: 14, marginTop: 5}}>{
                                (new Date(this.state.referral.pasien.tanggalLahir)).getDate() + ' ' +
                                this.state.month[(new Date(this.state.referral.pasien.tanggalLahir)).getMonth()] + ' ' +
                                (new Date(this.state.referral.pasien.tanggalLahir)).getFullYear()
                            }</Text>
                        </View>
                        <View style={{marginHorizontal: 5 + '%', marginTop: 10}}>
                            <Text style={{color: '#c4c4c4', fontSize: 10}}>Umur</Text>
                            <Text style={{color: '#000000', fontSize: 14, textAlign: 'justify', marginTop: 5}}>{
                                this._getAge(this.state.referral.pasien.tanggalLahir)
                            }</Text>
                        </View>
                        <View style={{marginHorizontal: 5 + '%', marginTop: 10}}>
                            <Text style={{color: '#c4c4c4', fontSize: 10}}>Jenis Kelamin</Text>
                            <Text style={{color: '#000000', fontSize: 14, textAlign: 'justify', marginTop: 5}}>{
                                this.state.referral.pasien.idJenisKelamin <= 1 ? 'Laki-laki' : 'Perempuan'
                            }</Text>
                        </View>
                        <View style={{marginHorizontal: 5 + '%', marginTop: 10}}>
                            <Text style={{color: '#c4c4c4', fontSize: 10}}>Nomor Asuransi / BPJS</Text>
                            <Text style={{color: '#000000', fontSize: 14, textAlign: 'justify', marginTop: 5}}>{
                                this.state.referral.pasien.noBpjs ? this.state.referral.pasien.noBpjs : this.state.referral.pasien.noAsuransiLain
                            }</Text>
                        </View>
                    </View>
                </View>
                <View style={{justifyContent: 'center', width: 100 + '%', height: 25}}>
                    <Text style={{color: '#000000', fontWeight: 'bold', marginLeft: 3 + '%'}}>Tindakan Awal</Text>
                </View>
                <View style={{backgroundColor: '#ffffff', width: 100 + '%', minHeight: 0, maxHeight: 140}}>
                    <View style={{margin: 5 + '%'}}>
                        <View style={{marginHorizontal: 5 + '%'}}>
                            <Text style={{color: '#c4c4c4', fontSize: 10}}>Tindakan yang Diberikan</Text>
                            <Text style={{color: '#000000', fontSize: 14, textAlign: 'justify', marginTop: 5}}>
                                {this.state.referral.rekamMedis.tindakan}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{justifyContent: 'center', width: 100 + '%', height: 25}}>
                    <Text style={{color: '#000000', fontWeight: 'bold', marginLeft: 3 + '%'}}>Dokumen Pendukung</Text>
                </View>
                <View style={{width: 100 + '%', minHeight: 200}}>
                    <View style={{backgroundColor: '#ffffff', width: 100 + '%', maxHeight: 200}}>
                        <View style={{margin: 5 + '%'}}>
                            <View style={{marginHorizontal: 5 + '%'}}>
                                <Text style={{color: '#c4c4c4', fontSize: 10}}>Hasil Pemeriksaan Darah</Text>
                                <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center', height: 50}}>
                                    <View style={{justifyContent: 'center', width: 15 + '%', height: 100 + '%'}}>
                                        <Image style={{width: 30, height: 30}} source={require('../../assets/images/pdf.png')} />
                                    </View>
                                    <View style={{justifyContent: 'center', width: 70 + '%', height: 100 + '%'}}>
                                        <Text style={{color: '#000000', fontSize: 12}}>Hasil_Tes_Darah_Budi Sudrajat.pdf</Text>
                                    </View>
                                    <View style={{justifyContent: 'center', width: 15 + '%', height: 100 + '%'}}>
                                        <Image style={{position: 'absolute', right: 0, width: 15, height: 15}} source={require('../../assets/images/download.png')} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{marginHorizontal: 5 + '%', marginTop: 10}}>
                                <Text style={{color: '#c4c4c4', fontSize: 10}}>Riwayat Sakit Lainnya</Text>
                                <View style={{flexDirection: 'column', justifyContent: 'center', height: 50}}>
                                    <Text style={{color: '#000000', fontSize: 12}}>Berkas tidak ditemukan</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                {this._setReferralWaitingScreen()}
            </ScrollView>
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

export default ReferralDetailScreen;