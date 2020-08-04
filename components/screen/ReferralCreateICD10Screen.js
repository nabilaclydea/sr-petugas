import React, { Component } from "react";
import {
  View,
  ScrollView,
  FlatList,
  Modal,
  TouchableOpacity,
  TextInput,
  Image,
  Text,
  StyleSheet,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import HealthcareAPI from "../api/HealthcareAPI";
import Spinner from "react-native-loading-spinner-overlay";

class ReferralCreateICD10Screen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        color: "#ffffff",
      },
      headerTintColor: "#000000",
      headerTitle: (
        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000000" }}>
            {navigation.getParam("referralType") <= 1
              ? "Rujuk Poli"
              : navigation.getParam("referralType") <= 2
              ? "Rujuk Emergency"
              : navigation.getParam("referralType") <= 3
              ? "Rujuk Maternal"
              : "Rujuk Neonatal"}
          </Text>
        </View>
      ),
    };
  };

  state = {
    isDateTimePickerVisible: false,
    referralType: this.props.navigation.getParam("referralType"),
    insurancePatientType: this.props.navigation.getParam(
      "insurancePatientType"
    ),
    selectedItems: [],
    items: [
      { id: "1", name: "Rontgen" },
      { id: "2", name: "MRI" },
    ],
    icd10: [],
    selectedICD10: [],
    visibleModal: false,
    spinner: false,
    search: "",
  };

  componentWillMount() {
    this._icd10();
  }

  _icd10() {
    this.setState({ spinner: true });
    HealthcareAPI.get("/diagnosis/icd/list", {
      params: { type: 10 },
    }).then((response) =>
      this.setState({ icd10: response.data, spinner: false })
    );
  }

  _setFormWizardScreen(isActive, index, text, isLast) {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 10,
          marginRight: isLast ? 10 : 0,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: isActive ? "#00818c" : "#c4c4c4",
            width: 15,
            height: 15,
            borderRadius: 100,
          }}
        >
          <Text style={{ color: "#ffffff", fontSize: 8 }}>{index}</Text>
        </View>
        <Text
          style={{
            color: isActive ? "#00818c" : "#c4c4c4",
            fontSize: 8,
            fontWeight: "bold",
            marginLeft: 5,
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
              marginLeft: 5,
            }}
          />
        )}
      </View>
    );
  }

  _updateSelectedICD10(icd10) {
    let current = this.state.selectedICD10;

    if (
      current.filter((item) => item.idDiagnosis === icd10.idDiagnosis).length >
      0
    ) {
      current = current.filter(
        (item) => item.idDiagnosis !== icd10.idDiagnosis
      );
    } else {
      current.push(icd10);
    }

    this.setState({ selectedICD10: current });
  }

  _renderICD10(item) {
    let isSelected =
      this.state.selectedICD10.filter(
        (icd10) => icd10.idDiagnosis === item.idDiagnosis
      ).length > 0;
    return (
      <TouchableOpacity
        onPress={() => this._updateSelectedICD10(item)}
        style={{
          width: 100 + "%",
          height: 80,
          backgroundColor: "#ffffff",
          backgroundColor: isSelected ? "#f8f8f8" : "#ffffff",
          borderBottomColor: "#f8f8f8",
          borderBottomWidth: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            height: 100 + "%",
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 5 + "%",
          }}
        >
          <View style={{ width: 20 + "%", justifyContent: "center" }}>
            <Text>{item.kodeDiagnosis}</Text>
          </View>
          <View style={{ width: 80 + "%", justifyContent: "center" }}>
            <Text>{item.namaDiagnosis}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  _setICD10Screen() {
    return (
      <FlatList
        data={this.state.icd10.filter((icd) =>
          icd.namaDiagnosis
            .toLowerCase()
            .includes(this.state.search.toLowerCase())
        )}
        renderItem={({ item }) => this._renderICD10(item)}
        keyExtractor={(item) => item.idDiagnosis}
      />
    );
  }

  _setSelectedICD10Screen() {
    return this.state.selectedICD10.map((icd10) => {
      return (
        <TouchableOpacity
          onPress={() => this._updateSelectedICD10(icd10)}
          key={icd10.idDiagnosis}
          style={{ justifyContent: "center", width: 100, height: 70 }}
        >
          <View style={{ justifyContent: "flex-end", width: 75, height: 35 }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 70,
                height: 30,
                borderRadius: 3,
                backgroundColor: "#ffffff",
              }}
            >
              <Text
                style={{
                  color: "#000000",
                  fontSize: 10,
                  fontWeight: "bold",
                }}
              >
                {icd10.kodeDiagnosis}
              </Text>
            </View>
            <View
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                justifyContent: "center",
                alignItems: "center",
                width: 10,
                height: 10,
                borderRadius: 100,
                backgroundColor: "#ffffff",
                borderColor: "#f05d5e",
                borderWidth: 1,
              }}
            >
              <Icon name={"close"} color={"#f05d5e"} size={8} />
            </View>
          </View>
        </TouchableOpacity>
      );
    });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.firstLayer}>
        <Spinner
          animation={"slide"}
          visible={this.state.spinner}
          textContent={"Mengambil Data ICD 10"}
          textStyle={{ color: "#ffffff" }}
        />
        <Modal
          transparent={true}
          visible={this.state.visibleModal}
          onRequestClose={() => {
            this.setState({ visibleModal: false });
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this.setState({ visibleModal: false })}
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            }}
          >
            <TouchableOpacity
              activeOpacity={1}
              style={{
                width: 80 + "%",
                height: 50 + "%",
                backgroundColor: "#ffffff",
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-around",
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: 100 + "%",
                  }}
                >
                  <Text style={{ fontSize: 20, textAlign: "center" }}>
                    Apakah anda yakin telah selesai membuat rujukan?
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    position: "absolute",
                    bottom: 0,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ visibleModal: false, spinner: true });
                      let poli = null;
                      let emergency = null;
                      let form = this.props.navigation.getParam("referralForm");
                      let docPemeriksaanDarah = this.props.navigation.getParam(
                        "docPemeriksaanDarah"
                      );
                      let docPemeriksaanLain = this.props.navigation.getParam(
                        "docPemeriksaanLain"
                      );

                      if (this.state.referralType <= 1) {
                        poli = form;
                      } else {
                        emergency = form;
                      }
                      HealthcareAPI.post("/referral/create", {
                        referralPoliForm: poli,
                        referralEmergencyForm: emergency,
                        icd9: this.props.navigation.getParam("icd9"),
                        icd10: this.state.selectedICD10,
                      })
                        .then((response) => {
                          console.log(Object.keys(docPemeriksaanDarah).length);
                          console.log(
                            Object.keys(docPemeriksaanDarah).length > 0
                          );
                          let referral = response.data;
                          if (
                            Object.keys(docPemeriksaanDarah).length > 0 ||
                            Object.keys(docPemeriksaanLain).length > 0
                          ) {
                            this.setState({ spinner: false });
                            let formData = new FormData();
                            if (Object.keys(docPemeriksaanDarah).length > 0) {
                              formData.append("docPemeriksaanDarah", {
                                name: docPemeriksaanDarah.fileName,
                                type: docPemeriksaanDarah.type,
                                uri: docPemeriksaanDarah.uri,
                              });
                            }
                            if (Object.keys(docPemeriksaanLain).length > 0) {
                              formData.append("docPemeriksaanLain", {
                                name: docPemeriksaanLain.fileName,
                                type: docPemeriksaanLain.type,
                                uri: docPemeriksaanLain.uri,
                              });
                            }

                            let noRekamMedis = referral.noRekamMedis;

                            let url = "/referral/upload/" + noRekamMedis;
                            let config = {
                              headers: {
                                "Content-type": "multipart/form-data",
                              },
                            };

                            HealthcareAPI.post(url, formData, config)
                              .then(() => {
                                this.setState({ spinner: false });
                                navigate("ReferralCreateFinish", {
                                  user: this.props.navigation.getParam("user"),
                                  referral: referral,
                                  referralType: this.state.referralType,
                                  insurancePatientType: this.state
                                    .insurancePatientType,
                                });
                              })
                              .catch((error) => console.log(error));
                          } else {
                            this.setState({ spinner: false });
                            navigate("ReferralCreateFinish", {
                              user: this.props.navigation.getParam("user"),
                              referral: referral,
                              referralType: this.state.referralType,
                              insurancePatientType: this.state
                                .insurancePatientType,
                            });
                          }
                        })
                        .catch((error) => console.log(error));
                    }}
                    style={{
                      width: 50 + "%",
                      backgroundColor: "#28c667",
                      borderBottomLeftRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        paddingVertical: 10,
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      Ya
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.setState({ visibleModal: false })}
                    style={{
                      width: 50 + "%",
                      backgroundColor: "grey",
                      borderBottomRightRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        paddingVertical: 10,
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      Tidak
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            backgroundColor: "#ffffff",
            width: 100 + "%",
            minHeight: 50,
          }}
        >
          {this._setFormWizardScreen(true, 1, "Data Pasien", false)}
          {this._setFormWizardScreen(
            true,
            2,
            this.state.referralType <= 1 ? "Jadwal Rujukan" : "Faskes Tujuan",
            false
          )}
          {this._setFormWizardScreen(true, 3, "Data Rujukan", false)}
          {this._setFormWizardScreen(true, 4, "ICD-9 CM", false)}
          {this._setFormWizardScreen(true, 5, "ICD-10", true)}
        </View>

        <View
          style={{ width: 100 + "%", height: 50, backgroundColor: "#ffffff" }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 5 + "%",
            }}
          >
            <Image
              style={{ width: 15, height: 15, marginRight: 25 }}
              source={require("../../assets/images/magnifier.png")}
            />
            <TextInput
              onChangeText={(search) => this.setState({ search })}
              placeholder={"Cari ICD-10"}
              style={{ color: "#cacaca", fontSize: 10, width: 90 + "%" }}
            />
          </View>
        </View>

        <ScrollView>
          <ScrollView style={{ height: 320 }} nestedScrollEnabled={true}>
            {this._setICD10Screen()}
          </ScrollView>

          <View
            style={{ width: 100 + "%", height: 70, backgroundColor: "#ebebeb" }}
          >
            <View style={{ marginHorizontal: 5 + "%" }}>
              <ScrollView horizontal={true} nestedScrollEnabled={true}>
                {this._setSelectedICD10Screen()}
              </ScrollView>
            </View>
          </View>

          <View
            style={{ alignItems: "center", width: 100 + "%", minHeight: 55 }}
          >
            <TouchableOpacity
              onPress={() => this.setState({ visibleModal: true })}
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 80 + "%",
                height: 35,
                borderRadius: 5,
                backgroundColor: "#28c667",
                marginTop: 20,
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
  firstLayer: {
    width: 100 + "%",
    height: 100 + "%",
    backgroundColor: "#f2f5f7",
  },
});

export default ReferralCreateICD10Screen;
