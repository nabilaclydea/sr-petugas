import React, { Component } from "react";
import {
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  TextInput
} from "react-native";
import { StackActions } from "react-navigation";
import Spinner from "react-native-loading-spinner-overlay";
import HealthcareAPI from "../../api/HealthcareAPI";
import AsyncStorage from "@react-native-community/async-storage";
import RNFetchBlob from "rn-fetch-blob";
import PDFLib, { PDFDocument, PDFPage } from "react-native-pdf-lib";

class MaternalReferralDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        color: "#ffffff"
      },
      headerTintColor: "#000000",
      headerTitle: (
        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000000" }}>
            1
          </Text>
          <Text style={{ fontSize: 10, color: "#000000" }}>nomor rujukan</Text>
        </View>
      )
    };
  };

  state = {
    user: {},
    day: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
    month: [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember"
    ],
    referral: this.props.navigation.getParam("referral"),
    activeStatus: this.props.navigation.getParam("activeStatus"),
    referralDirection: this.props.navigation.getParam("referralDirection"),
    referralType: this.props.navigation.getParam("referralType"),
    spinner: false,
    actionType: 1,
    reasons: "",
    visibleModal: false,
    confirmationMessage: "Apakah Anda Yakin?",
    buttonColor: "#28c667",
    buttonText: "Terima",
    processReferralSelected: 1,
    creatingPdf: false,
    pdfCreated: false
  };

  _setReferralAcceptedScreen() {
    const { navigate } = this.props.navigation;
    if (this.state.referralDirection <= 0) {
      if (this.state.activeStatus <= 1) {
        return (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 20,
              marginHorizontal: 40
            }}
          >
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  visibleModal: true,
                  buttonColor: "#f05d5e",
                  buttonText: "Tolak Rujukan",
                  confirmationMessage: "Anda yakin ingin menolak rujukan?",
                  processReferralSelected: 4
                })
              }
              activeOpacity={0.7}
              style={{
                backgroundColor: "#f05d5e",
                justifyContent: "center",
                alignItems: "center",
                width: 45 + "%",
                height: 40,
                borderRadius: 4
              }}
            >
              <Text
                style={{ color: "#ffffff", fontSize: 12, fontWeight: "bold" }}
              >
                Tolak Rujukan
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  visibleModal: true,
                  buttonColor: "#28c667",
                  buttonText: "Terima Rujukan",
                  confirmationMessage: "Anda yakin ingin menerima rujukan?",
                  processReferralSelected: 3
                })
              }
              activeOpacity={0.7}
              style={{
                backgroundColor: "#28c667",
                justifyContent: "center",
                alignItems: "center",
                width: 45 + "%",
                height: 40,
                borderRadius: 4
              }}
            >
              <Text
                style={{ color: "#ffffff", fontSize: 12, fontWeight: "bold" }}
              >
                Terima Rujukan
              </Text>
            </TouchableOpacity>
          </View>
        );
      } else if (this.state.activeStatus <= 2) {
        return (
          <View>
            <View
              style={{ justifyContent: "center", width: 100 + "%", height: 25 }}
            >
              <Text
                style={{
                  color: "#000000",
                  fontWeight: "bold",
                  marginLeft: 3 + "%"
                }}
              >
                Data Rujuk Balik
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#ffffff",
                width: 100 + "%",
                minHeight: 0,
                maxHeight: 200
              }}
            >
              <View style={{ margin: 5 + "%" }}>
                <View style={{ marginHorizontal: 5 + "%" }}>
                  <Text style={{ color: "#c4c4c4", fontSize: 10 }}>
                    Alasan Rujuk Balik
                  </Text>
                  <TextInput
                    onChangeText={text => this.setState({ reasons: text })}
                    style={{
                      marginLeft: 4,
                      borderBottomColor: "#c4c4c4",
                      borderBottomWidth: 1,
                      height: 70
                    }}
                    multiline={true}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: "#f2f5f7",
                width: 100 + "%",
                minHeight: 80
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginVertical: 20,
                  marginHorizontal: 40
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      visibleModal: true,
                      buttonColor: "#00a6fb",
                      buttonText: "Rujuk Balik",
                      confirmationMessage: "Anda yakin ingin merujuk balik?",
                      processReferralSelected: 5
                    })
                  }
                  activeOpacity={0.7}
                  style={{
                    backgroundColor: "#00a6fb",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 100 + "%",
                    height: 40,
                    borderRadius: 4
                  }}
                >
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 12,
                      fontWeight: "bold"
                    }}
                  >
                    Rujuk Balik
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      }
    } else {
      if (this.state.activeStatus == 1) {
        return (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 20,
              marginHorizontal: 40
            }}
          >
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  visibleModal: true,
                  buttonColor: "#e9d758",
                  buttonText: "Batal Rujuk",
                  confirmationMessage: "Anda yakin ingin membatalkan rujukan?",
                  processReferralSelected: 2
                })
              }
              activeOpacity={0.7}
              style={{
                backgroundColor: "#e9d758",
                justifyContent: "center",
                alignItems: "center",
                width: 90 + "%",
                height: 40,
                borderRadius: 4
              }}
            >
              <Text
                style={{ color: "#ffffff", fontSize: 12, fontWeight: "bold" }}
              >
                Batal Rujuk
              </Text>
            </TouchableOpacity>
          </View>
        );
      }
    }
  }

  _setReferralWaitingScreen() {
    const { navigate } = this.props.navigation;
    if (this.state.activeStatus == 1) {
      if (this.state.referralDirection <= 0) {
        return (
          <View
            style={{
              backgroundColor: "#f2f5f7",
              width: 100 + "%",
              minHeight: 120
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 20,
                marginHorizontal: 40
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    visibleModal: true,
                    buttonColor: "#f05d5e",
                    buttonText: "Tolak Rujukan",
                    confirmationMessage: "Anda yakin ingin menolak rujukan?",
                    processReferralSelected: 4
                  });
                  if (this.referralDirection == 0) {
                    navigate("ReferralInMaternalNeonatalScreen", {
                      //referral: referral,
                      activeStatus: this.state.activeStatus,
                      referralDirection: this.state.referralDirection,
                      referralType: this.state.referralType
                    });
                  } else {
                    navigate("ReferralOutMaternalNeonatalScreen", {
                      //referral: referral,
                      activeStatus: this.state.activeStatus,
                      referralDirection: this.state.referralDirection,
                      referralType: this.state.referralType
                    });
                  }
                }}
                activeOpacity={0.7}
                style={{
                  backgroundColor: "#f05d5e",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 45 + "%",
                  height: 40,
                  borderRadius: 4
                }}
              >
                <Text
                  style={{ color: "#ffffff", fontSize: 12, fontWeight: "bold" }}
                >
                  Tolak Rujukan
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    visibleModal: true,
                    buttonColor: "#28c667",
                    buttonText: "Terima Rujukan",
                    confirmationMessage: "Anda yakin ingin menerima rujukan?",
                    processReferralSelected: 3
                  });
                  if (this.referralDirection == 0) {
                    navigate("ReferralInMaternalNeonatalScreen", {
                      //referral: referral,
                      activeStatus: this.state.activeStatus,
                      referralDirection: this.state.referralDirection,
                      referralType: this.state.referralType
                    });
                  } else {
                    navigate("ReferralOutMaternalNeonatalScreen", {
                      //referral: referral,
                      activeStatus: this.state.activeStatus,
                      referralDirection: this.state.referralDirection,
                      referralType: this.state.referralType
                    });
                  }
                }}
                activeOpacity={0.7}
                style={{
                  backgroundColor: "#28c667",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 45 + "%",
                  height: 40,
                  borderRadius: 4
                }}
              >
                <Text
                  style={{ color: "#ffffff", fontSize: 12, fontWeight: "bold" }}
                >
                  Terima Rujukan
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      } else {
        return (
          <View
            style={{
              backgroundColor: "#f2f5f7",
              width: 100 + "%",
              minHeight: 120
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 20,
                marginHorizontal: 40
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    visibleModal: true,
                    buttonColor: "#e9d758",
                    buttonText: "Batal Rujuk",
                    confirmationMessage:
                      "Anda yakin ingin membatalkan rujukan?",
                    processReferralSelected: 2
                  })
                }
                style={{
                  backgroundColor: "#e9d758",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 90 + "%",
                  height: 40,
                  borderRadius: 4
                }}
              >
                <Text
                  style={{ color: "#ffffff", fontSize: 12, fontWeight: "bold" }}
                >
                  Batal Rujuk
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
    }
  }

  render() {
    return (
      <ScrollView style={styles.firstLayer}>
        <Spinner
          animation={"slide"}
          visible={this.state.spinner}
          textContent={
            (this.state.creatingPdf
              ? "Membuat Form"
              : this.state.actionType <= 2
              ? "Membatalkan"
              : this.state.actionType <= 3
              ? "Menerima"
              : this.state.actionType <= 4
              ? "Menolak"
              : "Merujuk Balik") + " Rujukan..."
          }
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
            style={styles.container}
          >
            <TouchableOpacity
              activeOpacity={1}
              style={{
                width: 80 + "%",
                height: 50 + "%",
                backgroundColor: "#ffffff",
                borderRadius: 10
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-around"
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: 100 + "%"
                  }}
                >
                  <Text style={{ fontSize: 20, textAlign: "center" }}>
                    {this.state.confirmationMessage}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    position: "absolute",
                    bottom: 0
                  }}
                >
                  <TouchableOpacity
                    // onPress={() =>
                    //   this._processReferral(this.state.processReferralSelected)
                    // }
                    style={{
                      width: 50 + "%",
                      backgroundColor: this.state.buttonColor,
                      borderBottomLeftRadius: 10
                    }}
                  >
                    <Text
                      style={{
                        paddingVertical: 10,
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "white"
                      }}
                    >
                      {this.state.buttonText}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.setState({ visibleModal: false })}
                    style={{
                      width: 50 + "%",
                      backgroundColor: "grey",
                      borderBottomRightRadius: 10
                    }}
                  >
                    <Text
                      style={{
                        paddingVertical: 10,
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "white"
                      }}
                    >
                      Tutup
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
        <Modal
          transparent={true}
          visible={this.state.pdfCreated}
          onRequestClose={() => {
            this.setState({ visibleModal: false });
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this.setState({ visibleModal: false })}
            style={styles.container}
          >
            <TouchableOpacity
              activeOpacity={1}
              style={{
                width: 80 + "%",
                height: 50 + "%",
                backgroundColor: "#ffffff",
                borderRadius: 10
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-around"
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: 100 + "%"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      textAlign: "center",
                      color: "#28c667",
                      marginHorizontal: 10
                    }}
                  >
                    Dokumen rujukan telah berhasil diunduh dan terdapat pada
                    folder Download
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    position: "absolute",
                    bottom: 0
                  }}
                >
                  <TouchableOpacity
                    onPress={() => this.setState({ pdfCreated: false })}
                    style={{
                      width: 100 + "%",
                      backgroundColor: "grey",
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10
                    }}
                  >
                    <Text
                      style={{
                        paddingVertical: 10,
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "white"
                      }}
                    >
                      Tutup
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>

        <View
          style={{
            backgroundColor: "#ffffff",
            width: 100 + "%",
            minHeight: 310
          }}
        >
          <View style={{ margin: 5 + "%" }}>
            <Text style={{ color: "#c4c4c4", fontSize: 10 }}>
              {this.state.referralDirection <= 0
                ? "Asal Rujukan"
                : "Tujuan Rujukan"}
            </Text>
            <View
              style={{
                flexDirection: "row",
                width: 100 + "%",
                minHeight: 100,
                marginTop: 5
              }}
            >
              <View style={{ width: 27 + "%", aspectRatio: 1 }}>
                <Image
                  style={{
                    width: 100 + "%",
                    height: 100 + "%",
                    borderRadius: 5
                  }}
                  resizeMode={"cover"}
                  source={require("../../../assets/images/rspib.jpg")}
                />
              </View>
              <View
                style={{
                  justifyContent: "center",
                  width: 50 + "%",
                  marginLeft: 3 + "%"
                }}
              >
                <Text
                  style={{
                    flexWrap: "wrap",
                    color: "#000000",
                    fontSize: 12,
                    fontWeight: "bold",
                    width: 100
                  }}
                >
                  Puskesmas Pondok Benda
                </Text>
                {/*<Text style={{color: '#cacaca', fontSize: 10}}>Pondok Aren</Text>*/}
                <View style={{ flexDirection: "row", marginTop: 10 + "%" }}>
                  <View
                    style={{
                      backgroundColor: "#00818c",
                      height: 20,
                      borderRadius: 2,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        color: "#ffffff",
                        fontSize: 10,
                        fontWeight: "bold",
                        marginHorizontal: 7
                      }}
                    >
                      A
                    </Text>
                  </View>
                  <Image
                    style={{ width: 100, height: 20, marginLeft: 7 }}
                    resizeMode={"contain"}
                    source={require("../../../assets/images/bpjs.png")}
                  />
                </View>
              </View>
              <View style={{ width: 20 + "%" }}>
                <View style={{ justifyItems: "center", width: 100 + "%" }}>
                  <Text
                    style={{
                      color: "#019ca9",
                      fontSize: 18,
                      fontWeight: "bold",
                      textAlign: "right"
                    }}
                  >
                    Kamis
                  </Text>
                  <Text
                    style={{
                      color: "#000000",
                      fontSize: 10,
                      textAlign: "right"
                    }}
                  >
                    5 Desember 2019
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ color: "#c4c4c4", fontSize: 10 }}>
                Pembuat Rujukan
              </Text>
              <Text
                style={{
                  color: "#000000",
                  fontSize: 14,
                  fontWeight: "bold",
                  marginTop: 5
                }}
              >
                Kania Mandasari
              </Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ color: "#c4c4c4", fontSize: 10 }}>
                Nama Pasien
              </Text>
              <Text
                style={{
                  color: "#000000",
                  fontSize: 14,
                  fontWeight: "bold",
                  marginTop: 5
                }}
              >
                Maria Lestari
              </Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ color: "#c4c4c4", fontSize: 10 }}>Diagnosis</Text>
              <Text
                style={{
                  color: "#000000",
                  fontSize: 14,
                  fontWeight: "bold",
                  marginTop: 5
                }}
              >
                Ectopic pregnancy
              </Text>
            </View>
          </View>
        </View>
        {this._setReferralAcceptedScreen()}
        <View
          style={{ justifyContent: "center", width: 100 + "%", height: 25 }}
        >
          <Text
            style={{
              color: "#000000",
              fontWeight: "bold",
              marginLeft: 3 + "%"
            }}
          >
            Deskripsi Rujukan
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#ffffff",
            width: 100 + "%",
            minHeight: 0,
            maxHeight: 200
          }}
        >
          <View style={{ margin: 5 + "%" }}>
            <View style={{ marginHorizontal: 5 + "%" }}>
              <Text style={{ color: "#c4c4c4", fontSize: 10 }}>
                Tujuan Rujukan
              </Text>
              <Text
                style={{
                  color: "#000000",
                  fontSize: 14,
                  fontWeight: "bold",
                  marginTop: 5
                }}
              >
                ICU
              </Text>
            </View>
            <View style={{ marginHorizontal: 5 + "%", marginTop: 10 }}>
              <Text style={{ color: "#c4c4c4", fontSize: 10 }}>
                Alasan Rujukan
              </Text>
              <Text
                style={{
                  color: "#000000",
                  fontSize: 14,
                  textAlign: "justify",
                  marginTop: 5
                }}
              >
                Rasa sakit di abdomen, dan terjadi pendarahan yang cukup banyak
                setelah 6 jam melahirkan
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{ justifyContent: "center", width: 100 + "%", height: 25 }}
        >
          <Text
            style={{
              color: "#000000",
              fontWeight: "bold",
              marginLeft: 3 + "%"
            }}
          >
            Data Pasien
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#ffffff",
            width: 100 + "%",
            minHeight: 220
          }}
        >
          <View style={{ margin: 5 + "%" }}>
            <View style={{ marginHorizontal: 5 + "%" }}>
              <Text style={{ color: "#c4c4c4", fontSize: 10 }}>
                Tanggal Lahir
              </Text>
              <Text style={{ color: "#000000", fontSize: 14, marginTop: 5 }}>
                5 September 1988
              </Text>
            </View>
            <View style={{ marginHorizontal: 5 + "%", marginTop: 10 }}>
              <Text style={{ color: "#c4c4c4", fontSize: 10 }}>Umur</Text>
              <Text
                style={{
                  color: "#000000",
                  fontSize: 14,
                  textAlign: "justify",
                  marginTop: 5
                }}
              >
                31
              </Text>
            </View>
            <View style={{ marginHorizontal: 5 + "%", marginTop: 10 }}>
              <Text style={{ color: "#c4c4c4", fontSize: 10 }}>
                Jenis Kelamin
              </Text>
              <Text
                style={{
                  color: "#000000",
                  fontSize: 14,
                  textAlign: "justify",
                  marginTop: 5
                }}
              >
                Perempuan
              </Text>
            </View>
            <View style={{ marginHorizontal: 5 + "%", marginTop: 10 }}>
              <Text style={{ color: "#c4c4c4", fontSize: 10 }}>
                Nomor Asuransi / BPJS
              </Text>
              <Text
                style={{
                  color: "#000000",
                  fontSize: 14,
                  textAlign: "justify",
                  marginTop: 5
                }}
              >
                1234567890123
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{ justifyContent: "center", width: 100 + "%", height: 25 }}
        >
          <Text
            style={{
              color: "#000000",
              fontWeight: "bold",
              marginLeft: 3 + "%"
            }}
          >
            Tindakan Awal
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#ffffff",
            width: 100 + "%",
            minHeight: 0,
            maxHeight: 140
          }}
        >
          <View style={{ margin: 5 + "%" }}>
            <View style={{ marginHorizontal: 5 + "%" }}>
              <Text style={{ color: "#c4c4c4", fontSize: 10 }}>
                Tindakan yang Diberikan
              </Text>
              <Text
                style={{
                  color: "#000000",
                  fontSize: 14,
                  textAlign: "justify",
                  marginTop: 5
                }}
              >
                Pemberian obat sementara cairan Ringer Laktat melalui akses
                intravena perifer 3 L
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{ justifyContent: "center", width: 100 + "%", height: 25 }}
        >
          <Text
            style={{
              color: "#000000",
              fontWeight: "bold",
              marginLeft: 3 + "%"
            }}
          >
            Dokumen Penunjang
          </Text>
        </View>
        <View style={{ width: 100 + "%", minHeight: 200 }}>
          <View
            style={{
              backgroundColor: "#ffffff",
              width: 100 + "%",
              maxHeight: 200
            }}
          >
            <View style={{ margin: 5 + "%" }}>
              <View style={{ marginHorizontal: 5 + "%" }}>
                <Text style={{ color: "#c4c4c4", fontSize: 10 }}>
                  Dokumen Hasil Pemeriksaan Lab
                </Text>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    height: 50
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      width: 15 + "%",
                      height: 100 + "%"
                    }}
                  >
                    <Image
                      style={{ width: 30, height: 30 }}
                      source={require("../../../assets/images/pdf.png")}
                    />
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      width: 70 + "%",
                      height: 100 + "%"
                    }}
                  >
                    <Text style={{ color: "#000000", fontSize: 12 }}>
                      Dokumen Pemeriksaan Lab
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      width: 15 + "%",
                      height: 100 + "%"
                    }}
                  >
                    <Image
                      style={{
                        position: "absolute",
                        right: 0,
                        width: 15,
                        height: 15
                      }}
                      source={require("../../../assets/images/download.png")}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ marginHorizontal: 5 + "%", marginTop: 10 }}>
                <Text style={{ color: "#c4c4c4", fontSize: 10 }}>
                  Dokumen Penunjang Lainnya
                </Text>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    height: 50
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      width: 15 + "%",
                      height: 100 + "%"
                    }}
                  >
                    <Image
                      style={{ width: 30, height: 30 }}
                      source={require("../../../assets/images/pdf.png")}
                    />
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      width: 70 + "%",
                      height: 100 + "%"
                    }}
                  >
                    <Text style={{ color: "#000000", fontSize: 12 }}>
                      Dokumen Pemeriksaan Lain
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      width: 15 + "%",
                      height: 100 + "%"
                    }}
                  >
                    <Image
                      style={{
                        position: "absolute",
                        right: 0,
                        width: 15,
                        height: 15
                      }}
                      source={require("../../../assets/images/download.png")}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#f2f5f7",
            width: 100 + "%",
            minHeight: 80
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 20,
              marginHorizontal: 40
            }}
          >
            <TouchableOpacity
              // onPress={() => this._print()}
              style={{
                backgroundColor: "grey",
                justifyContent: "center",
                alignItems: "center",
                width: 90 + "%",
                height: 40,
                borderRadius: 4
              }}
            >
              <Text
                style={{ color: "#ffffff", fontSize: 12, fontWeight: "bold" }}
              >
                Unduh Rujukan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {this._setReferralWaitingScreen()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  firstLayer: {
    width: 100 + "%",
    height: 100 + "%",
    backgroundColor: "#f2f5f7"
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)"
  }
});

export default MaternalReferralDetailScreen;
