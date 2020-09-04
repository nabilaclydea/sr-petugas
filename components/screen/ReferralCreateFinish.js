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
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StackActions, NavigationActions } from "react-navigation";

class ReferralCreateFinish extends Component {
  state = {
    isDateTimePickerVisible: false,
    referralType: this.props.navigation.getParam("referralType"),
    insurancePatientType: this.props.navigation.getParam(
      "insurancePatientType"
    ),
  };

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <ScrollView
        style={{
          width: 100 + "%",
          height: 100 + "%",
          backgroundColor: "#ffffff",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 5 + "%",
            marginTop: 80,
          }}
        >
          <View style={{ width: 80 + "%" }}>
            <Text style={{ fontSize: 18, textAlign: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Selamat! </Text>
              <Text>Dokumen rujukan anda telah </Text>
              <Text style={{ fontWeight: "bold" }}>berhasil </Text>
              <Text>dibuat dengan nomor </Text>
              <Text style={{ fontWeight: "bold" }}>
                {"#" + this.props.navigation.getParam("referral").noRujukan}
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
              marginTop: 20,
            }}
          >
            <Icon name={"check"} color={"#28c667"} size={200} />
          </View>

          <View
            style={{ alignItems: "center", width: 100 + "%", minHeight: 55 }}
          >
            <TouchableOpacity
              onPress={() => {
                AsyncStorage.getItem("user").then((result) => {
                  let user = JSON.parse(result);
                  let nama = user.nama;
                  const resetAction = StackActions.reset({
                    index: 1,
                    actions: [
                      NavigationActions.navigate({
                        routeName: "HomeScreen",
                        params: { nama: nama },
                      }),
                      NavigationActions.navigate({
                        routeName: "ReferralCreatePatientDataScreen",
                        params: { referralType: this.state.referralType },
                      }),
                    ],
                  });
                  this.props.navigation.dispatch(resetAction);
                });
              }}
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 80 + "%",
                height: 35,
                borderRadius: 5,
                backgroundColor: "#00818c",
                marginTop: 20,
              }}
            >
              <Text
                style={{ color: "#ffffff", fontSize: 12, fontWeight: "bold" }}
              >
                Buat Rujukan{" "}
                {this.state.referralType <= 1
                  ? "Poli"
                  : this.state.referralType <= 2
                  ? "Emergency"
                  : this.state.referralType <= 3
                  ? "Maternal"
                  : "Neonatal"}{" "}
                Lainnya
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{ alignItems: "center", width: 100 + "%", minHeight: 55 }}
          >
            <TouchableOpacity
              onPress={() => {
                AsyncStorage.getItem("user").then((result) => {
                  let user = JSON.parse(result);
                  let routeName = "";
                  let nama = "";
                  if (user) {
                    routeName = "HomeScreen";
                    nama = user.nama;
                  } else {
                    routeName = "LoginScreen";
                  }
                  const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                      NavigationActions.navigate({
                        routeName: routeName,
                        params: {
                          nama: nama,
                        },
                      }),
                    ],
                  });
                  this.props.navigation.dispatch(resetAction);
                });
              }}
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 80 + "%",
                height: 35,
                borderRadius: 5,
                backgroundColor: "#ffffff",
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  color: "#00818c",
                  fontSize: 12,
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                  textDecorationColor: "#00818c",
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

export default ReferralCreateFinish;
