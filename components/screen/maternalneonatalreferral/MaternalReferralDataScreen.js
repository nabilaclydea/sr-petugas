import React, { Component } from "react";
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
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  DocumentPicker,
  DocumentPickerUtil
} from "react-native-document-picker";
import HealthcareAPI from "../../api/HealthcareAPI";

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        color: "#ffffff"
      },
      headerTintColor: "#000000",
      headerTitle: (
        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000000" }}>
            {navigation.getParam("referralType") <= 3
              ? "Rujuk Maternal"
              : "Rujuk Neonatal"}
          </Text>
        </View>
      )
    };
  };

  state = {
    user: this.props.navigation.getParam("user"),
    referralForm: this.props.navigation.getParam("referralForm"),
    isDateTimePickerVisible: false,
    referralType: this.props.navigation.getParam("referralType"),
    insurancePatientType: this.props.navigation.getParam(
      "insurancePatientType"
    ),
    selectedItems: [],
    items: [
      { id: "1", name: "ICU" },
      { id: "2", name: "NICU" }
    ],
    file: "",
    inputRequired: [true, true, true, true, true, true, true],
    inputRequiredData: [
      "alasanDirujuk",
      "tindakanYgTelahDilakukan",
      "heartRate",
      "sistole",
      "diastole",
      "beratBadan",
      "tinggiBadan"
    ],
    inputRequiredDataRead: [
      "Alasan Merujuk",
      "Tindakan yang Telah Diberikan",
      "Denyut Nadi",
      "Tekanan Darah",
      "Berat Badan",
      "Tinggi Badan"
    ],
    inputRequiredEmergency: [true, true],
    inputRequiredDataEmergency: ["suhuTubuh", "respirartoryRate"],
    inputRequiredDataEmergencyRead: ["Suhu Tubuh", "Laju Pernapasan"],
    healthPersonnels: [],
    transportations: [],
    docPemeriksaanDarah: {},
    docPemeriksaanLain: {}
  };

  _setFormWizardScreen(isActive, index, text, isLast) {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 10,
          marginRight: isLast ? 10 : 0
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: isActive ? "#00818c" : "#c4c4c4",
            width: 15,
            height: 15,
            borderRadius: 100
          }}
        >
          <Text style={{ color: "#ffffff", fontSize: 8 }}>{index}</Text>
        </View>
        <Text
          style={{
            color: isActive ? "#00818c" : "#c4c4c4",
            fontSize: 8,
            fontWeight: "bold",
            marginLeft: 5
          }}
        >
          {text}
        </Text>
        {isLast ? null : (
          <View
            style={{
              backgroundColor: isActive ? "#00818c" : "#c4c4c4",
              width: 20,
              height: 2,
              marginLeft: 5
            }}
          />
        )}
      </View>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.firstLayer}>
        <View style={styles.container}>
          {this._setFormWizardScreen(false, 1, "Data Pasien", false)}
          {this._setFormWizardScreen(false, 2, "Tujuan Rujukan", false)}
          {this._setFormWizardScreen(true, 3, "Data Rujukan", false)}
          {this._setFormWizardScreen(false, 4, "ICD-9 CM", false)}
          {this._setFormWizardScreen(false, 5, "ICD-10", true)}
        </View>

        <ScrollView>
          <View style={styles.rujukan}>
            <View style={{ margin: 5 + "%" }}>
              <View>
                <Text style={{ color: "#cacaca" }}>
                  Jenis Kasus
                  <Text style={{ color: "#f05d5e" }}> *</Text>
                </Text>
                <View style={styles.line}>
                  <Picker>
                    <Picker.Item label={"Kasus Baru"} value={1} />
                    <Picker.Item label={"Kasus Lama"} value={2} />
                  </Picker>
                </View>
              </View>

              <View style={{ marginTop: 15 }}>
                <Text style={{ color: "#cacaca" }}>
                  Tenaga Kesehatan Perujuk
                  <Text style={{ color: "#f05d5e" }}> *</Text>
                </Text>
                <View style={styles.line}>
                  <Picker>
                    <Picker.Item label={"Bidan A"} value={1} />
                    <Picker.Item label={"Bidan B"} value={2} />
                    <Picker.Item label={"Bidan C"} value={3} />
                    <Picker.Item label={"Dokter A"} value={4} />
                    <Picker.Item label={"Dokter B"} value={5} />
                    <Picker.Item label={"Dokter C"} value={6} />
                  </Picker>
                </View>
              </View>

              <View style={{ marginTop: 15 }}>
                <Text style={{ color: "#cacaca" }}>
                  Alasan Merujuk
                  <Text style={{ color: "#f05d5e" }}> *</Text>
                </Text>
                <TextInput
                  placeHolder={"Alasan Merujuk"}
                  style={{
                    marginLeft: 4,
                    borderBottomColor: this.state.inputRequired[0]
                      ? "#c4c4c4"
                      : "#f05d5e",
                    borderBottomWidth: 1
                  }}
                  multiline={true}
                />
                {!this.state.inputRequired[0] && (
                  <Text
                    style={{ color: "#f05d5e", fontSize: 12, marginLeft: 4 }}
                  >
                    Masukkan alasan merujuk pasien
                  </Text>
                )}
              </View>

              <View style={{ marginTop: 15 }}>
                <Text style={{ color: "#cacaca" }}>
                  Tindakan yang Telah Diberikan
                  <Text style={{ color: "#f05d5e" }}> *</Text>
                </Text>
                <TextInput
                  placeHolder={"Tindakan yang Telah Diberikan"}
                  style={{
                    marginLeft: 4,
                    borderBottomColor: this.state.inputRequired[1]
                      ? "#c4c4c4"
                      : "#f05d5e",
                    borderBottomWidth: 1
                  }}
                  multiline={true}
                />
                {!this.state.inputRequired[1] && (
                  <Text
                    style={{ color: "#f05d5e", fontSize: 12, marginLeft: 4 }}
                  >
                    Masukkan tindakan yang telah diberikan kepada pasien
                  </Text>
                )}
              </View>
            </View>
          </View>

          <View
            style={{
              width: 100 + "%",
              minHeight: 400,
              backgroundColor: "#ffffff",
              marginTop: 10
            }}
          >
            <View style={{ margin: 5 + "%" }}>
              <View
                style={{ marginTop: this.state.referralType <= 1 ? 0 : 15 }}
              >
                <Text style={{ color: "#cacaca" }}>
                  Denyut Nadi (nadi/menit)
                  <Text style={{ color: "#f05d5e" }}> *</Text>
                </Text>
                <TextInput
                  keyboardType={"numeric"}
                  placeHolder={"Denyut Nadi"}
                  style={{
                    marginLeft: 4,
                    borderBottomColor: this.state.inputRequired[2]
                      ? "#c4c4c4"
                      : "#f05d5e",
                    borderBottomWidth: 1
                  }}
                />
                {!this.state.inputRequired[2] && (
                  <Text
                    style={{ color: "#f05d5e", fontSize: 12, marginLeft: 4 }}
                  >
                    Masukkan denyut nadi pasien
                  </Text>
                )}
              </View>

              <View style={{ marginTop: 15 }}>
                <Text style={{ color: "#cacaca" }}>
                  Tekanan Darah (mmHg)
                  <Text style={{ color: "#f05d5e" }}> *</Text>
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <TextInput
                    keyboardType={"numeric"}
                    placeHolder={"Sistolik"}
                    style={{
                      width: 40 + "%",
                      marginLeft: 4,
                      borderBottomColor: this.state.inputRequired[3]
                        ? "#c4c4c4"
                        : "#f05d5e",
                      borderBottomWidth: 1
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 10 + "%"
                    }}
                  >
                    <Text style={{ color: "#c4c4c4", fontSize: 30 }}>/</Text>
                  </View>
                  <TextInput
                    keyboardType={"numeric"}
                    placeHolder={"Diastolik"}
                    style={{
                      width: 40 + "%",
                      marginLeft: 4,
                      borderBottomColor: this.state.inputRequired[4]
                        ? "#c4c4c4"
                        : "#f05d5e",
                      borderBottomWidth: 1
                    }}
                  />
                </View>
                {(!this.state.inputRequired[3] ||
                  !this.state.inputRequired[4]) && (
                  <Text
                    style={{ color: "#f05d5e", fontSize: 12, marginLeft: 4 }}
                  >
                    Masukkan tekanan darah pasien
                  </Text>
                )}
              </View>

              <View style={{ marginTop: 15 }}>
                <Text style={{ color: "#cacaca" }}>
                  Suhu Tubuh (Celsius)
                  <Text style={{ color: "#f05d5e" }}> *</Text>
                </Text>
                <TextInput
                  keyboardType={"numeric"}
                  placeHolder={"Suhu Tubuh"}
                  // onChangeText={text => {
                  //   let tmp = this.state.referralForm;
                  //   tmp.rekamMedis.suhuTubuh = text;
                  //   this.setState({ referralForm: tmp });
                  // }}
                  style={{
                    marginLeft: 4,
                    borderBottomColor: this.state.inputRequiredEmergency[0]
                      ? "#c4c4c4"
                      : "#f05d5e",
                    borderBottomWidth: 1
                  }}
                />
                {!this.state.inputRequiredEmergency[0] && (
                  <Text
                    style={{ color: "#f05d5e", fontSize: 12, marginLeft: 4 }}
                  >
                    Masukkan suhu tubuh pasien
                  </Text>
                )}
              </View>

              <View style={{ marginTop: 15 }}>
                <Text style={{ color: "#cacaca" }}>
                  Laju Pernapasan (kali/menit)
                  <Text style={{ color: "#f05d5e" }}> *</Text>
                </Text>
                <TextInput
                  keyboardType={"numeric"}
                  placeHolder={"Laju Pernapasan"}
                  // onChangeText={text => {
                  //   let tmp = this.state.referralForm;
                  //   tmp.rekamMedis.respirartoryRate = text;
                  //   this.setState({ referralForm: tmp });
                  // }}
                  style={{
                    marginLeft: 4,
                    borderBottomColor: this.state.inputRequiredEmergency[1]
                      ? "#c4c4c4"
                      : "#f05d5e",
                    borderBottomWidth: 1
                  }}
                />
                {!this.state.inputRequiredEmergency[1] && (
                  <Text
                    style={{ color: "#f05d5e", fontSize: 12, marginLeft: 4 }}
                  >
                    Masukkan laju pernapasan pasien
                  </Text>
                )}
              </View>

              <View style={{ marginTop: 15 }}>
                <Text style={{ color: "#cacaca" }}>
                  Berat Badan (kg)
                  <Text style={{ color: "#f05d5e" }}> *</Text>
                </Text>
                <TextInput
                  keyboardType={"numeric"}
                  placeHolder={"Berat Badan"}
                  style={{
                    marginLeft: 4,
                    borderBottomColor: this.state.inputRequired[5]
                      ? "#c4c4c4"
                      : "#f05d5e",
                    borderBottomWidth: 1
                  }}
                />
                {!this.state.inputRequired[5] && (
                  <Text
                    style={{ color: "#f05d5e", fontSize: 12, marginLeft: 4 }}
                  >
                    Masukkan berat badan pasien
                  </Text>
                )}
              </View>

              <View style={{ marginTop: 15 }}>
                <Text style={{ color: "#cacaca" }}>
                  Tinggi Badan (cm)
                  <Text style={{ color: "#f05d5e" }}> *</Text>
                </Text>
                <TextInput
                  keyboardType={"numeric"}
                  placeHolder={"Tinggi Badan"}
                  style={{
                    marginLeft: 4,
                    borderBottomColor: this.state.inputRequired[6]
                      ? "#c4c4c4"
                      : "#f05d5e",
                    borderBottomWidth: 1
                  }}
                />
                {!this.state.inputRequired[6] && (
                  <Text
                    style={{ color: "#f05d5e", fontSize: 12, marginLeft: 4 }}
                  >
                    Masukkan tinggi badan pasien
                  </Text>
                )}
              </View>

              <View style={{ marginTop: 15 }}>
                <Text style={{ color: "#cacaca" }}>Keterangan Lain</Text>
                <TextInput
                  style={{
                    marginLeft: 4,
                    borderBottomColor: "#c4c4c4",
                    borderBottomWidth: 1
                  }}
                  multiline={true}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              width: 100 + "%",
              minHeight: 400,
              backgroundColor: "#ffffff",
              marginTop: 10
            }}
          >
            <View style={{ marginTop: 15 }}>
              <Text style={{ color: "#cacaca" }}>
                Denyut Jantung Janin
                <Text style={{ color: "#f05d5e" }}> *</Text>
              </Text>
              <TextInput
                keyboardType={"numeric"}
                placeHolder={"Denyut Jantung Janin"}
                style={{
                  marginLeft: 4,
                  borderBottomColor: this.state.inputRequired[6]
                    ? "#c4c4c4"
                    : "#f05d5e",
                  borderBottomWidth: 1
                }}
              />
              {!this.state.inputRequired[6] && (
                <Text style={{ color: "#f05d5e", fontSize: 12, marginLeft: 4 }}>
                  Masukkan denyut jantung janin
                </Text>
              )}
            </View>

            <View style={{ marginTop: 15 }}>
              <Text style={{ color: "#cacaca" }}>
                Presentasi
                <Text style={{ color: "#f05d5e" }}> *</Text>
              </Text>
              <TextInput
                keyboardType={"numeric"}
                placeHolder={"Prsentasi"}
                style={{
                  marginLeft: 4,
                  borderBottomColor: this.state.inputRequired[6]
                    ? "#c4c4c4"
                    : "#f05d5e",
                  borderBottomWidth: 1
                }}
              />
              {!this.state.inputRequired[6] && (
                <Text style={{ color: "#f05d5e", fontSize: 12, marginLeft: 4 }}>
                  Masukkan presentasi
                </Text>
              )}
            </View>

            <View style={{ marginTop: 15 }}>
              <Text style={{ color: "#cacaca" }}>
                Dilatasi Serviks
                <Text style={{ color: "#f05d5e" }}> *</Text>
              </Text>
              <TextInput
                keyboardType={"numeric"}
                placeHolder={"Dilatasi Serviks"}
                style={{
                  marginLeft: 4,
                  borderBottomColor: this.state.inputRequired[6]
                    ? "#c4c4c4"
                    : "#f05d5e",
                  borderBottomWidth: 1
                }}
              />
              {!this.state.inputRequired[6] && (
                <Text style={{ color: "#f05d5e", fontSize: 12, marginLeft: 4 }}>
                  Masukkan dilatasi serviks
                </Text>
              )}
            </View>

            <View style={{ marginTop: 15 }}>
              <Text style={{ color: "#cacaca" }}>
                Letak Janin
                <Text style={{ color: "#f05d5e" }}> *</Text>
              </Text>
              <TextInput
                //keyboardType={"text"}
                placeHolder={"Letak janin"}
                style={{
                  marginLeft: 4,
                  borderBottomColor: this.state.inputRequired[6]
                    ? "#c4c4c4"
                    : "#f05d5e",
                  borderBottomWidth: 1
                }}
              />
              {!this.state.inputRequired[6] && (
                <Text style={{ color: "#f05d5e", fontSize: 12, marginLeft: 4 }}>
                  Masukkan letak janin
                </Text>
              )}
            </View>

            <View style={{ marginTop: 15 }}>
              <Text style={{ color: "#cacaca" }}>
                Kondisi Ketuban
                <Text style={{ color: "#f05d5e" }}> *</Text>
              </Text>
              <TextInput
                //keyboardType={"numeric"}
                placeHolder={"Kondisi Ketuban"}
                style={{
                  marginLeft: 4,
                  borderBottomColor: this.state.inputRequired[6]
                    ? "#c4c4c4"
                    : "#f05d5e",
                  borderBottomWidth: 1
                }}
              />
              {!this.state.inputRequired[6] && (
                <Text style={{ color: "#f05d5e", fontSize: 12, marginLeft: 4 }}>
                  Masukkan kondisi ketuban
                </Text>
              )}
            </View>

            <View style={{ marginTop: 15 }}>
              <Text style={{ color: "#cacaca" }}>
                Kontraksi Uterus
                <Text style={{ color: "#f05d5e" }}> *</Text>
              </Text>
              <TextInput
                keyboardType={"numeric"}
                placeHolder={"Kontraksi Uterus"}
                style={{
                  marginLeft: 4,
                  borderBottomColor: this.state.inputRequired[6]
                    ? "#c4c4c4"
                    : "#f05d5e",
                  borderBottomWidth: 1
                }}
              />
              {!this.state.inputRequired[6] && (
                <Text style={{ color: "#f05d5e", fontSize: 12, marginLeft: 4 }}>
                  Masukkan kontraksi uterus
                </Text>
              )}
            </View>
          </View>

          <View
            style={{ alignItems: "center", width: 100 + "%", minHeight: 100 }}
          >
            <TouchableOpacity
              onPress={() => navigate("MaternalNeonatalICD9Screen")}
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 80 + "%",
                height: 35,
                borderRadius: 5,
                backgroundColor: "#28c667",
                marginTop: 20
              }}
            >
              <Text
                style={{ color: "#ffffff", fontSize: 12, fontWeight: "bold" }}
              >
                Selanjutnya
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    width: 100 + "%",
    minHeight: 50
  },
  firstLayer: {
    width: 100 + "%",
    height: 100 + "%",
    backgroundColor: "#f2f5f7"
  },
  line: {
    width: 100 + "%",
    borderBottomColor: "#c4c4c4",
    borderBottomWidth: 1
  },
  rujukan: {
    width: 100 + "%",
    minHeight: 380,
    backgroundColor: "#ffffff"
  }
});
