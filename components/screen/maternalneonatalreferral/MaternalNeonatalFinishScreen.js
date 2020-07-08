import React, { Component } from "react";
import {
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
import { StackActions, NavigationActions } from "react-navigation";

class MaternalNeonatalFinishScreen extends Component {
  state = {
    isDateTimePickerVisible: false,
    referralType: this.props.navigation.getParam("referralType"),
    insurancePatientType: this.props.navigation.getParam("insurancePatientType")
  };

  static navigationOptions = {
    header: null
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView
        style={{
          width: 100 + "%",
          height: 100 + "%",
          backgroundColor: "#ffffff"
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 5 + "%",
            marginTop: 80
          }}
        >
          <View style={{ width: 80 + "%" }}>
            <Text style={{ fontSize: 18, textAlign: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Selamat! </Text>
              <Text>Dokumen rujukan anda telah </Text>
              <Text style={{ fontWeight: "bold" }}>berhasil </Text>
              <Text>dibuat dengan nomor </Text>
              <Text style={{ fontWeight: "bold" }}>
                {"#" + Math.floor(Math.random() * 100) + 1}
              </Text>
            </Text>
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 250,
              height: 250,
              borderColor: "#28c667",
              borderWidth: 3,
              borderRadius: 300,
              marginTop: 20
            }}
          >
            <Icon name={"check"} color={"#28c667"} size={200} />
          </View>

          <View
            style={{ alignItems: "center", width: 100 + "%", minHeight: 55 }}
          >
            <TouchableOpacity
              onPress={() =>
                navigate("ReferralCreatePatientDataScreen", {
                  referralType: this.state.referralType
                })
              }
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 80 + "%",
                height: 35,
                borderRadius: 5,
                backgroundColor: "#00818c",
                marginTop: 20
              }}
            >
              <Text
                style={{ color: "#ffffff", fontSize: 12, fontWeight: "bold" }}
              >
                Buat Rujukan{" "}
                {this.state.referralType <= 3 ? "Maternal" : "Neonatal"} Lainnya
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{ alignItems: "center", width: 100 + "%", minHeight: 55 }}
          >
            <TouchableOpacity
              onPress={() => navigate("HomeScreen")}
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 80 + "%",
                height: 35,
                borderRadius: 5,
                backgroundColor: "#ffffff",
                marginTop: 20
              }}
            >
              <Text
                style={{
                  color: "#00818c",
                  fontSize: 12,
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                  textDecorationColor: "#00818c"
                }}
              >
                Kembali ke Beranda
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default MaternalNeonatalFinishScreen;
