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
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#ffffff",
            width: 100 + "%",
            minHeight: 50
          }}
        >
          {this._setFormWizardScreen(false, 1, "Data Pasien", false)}
          {this._setFormWizardScreen(true, 2, "Tujuan Rujukan", false)}
          {this._setFormWizardScreen(false, 3, "Data Rujukan", false)}
          {this._setFormWizardScreen(false, 4, "ICD-9 CM", false)}
          {this._setFormWizardScreen(false, 5, "ICD-10", true)}
        </View>

        <View style={{ alignItems: "center", width: 100 + "%", height: 100 }}>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around"
  }
});
