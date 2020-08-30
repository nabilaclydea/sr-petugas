import React, { Component } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  StatusBar,
  StyleSheet,
} from "react-native";
import HealthcareAPI from "../api/HealthcareAPI";
import AsyncStorage from "@react-native-community/async-storage";
import Spinner from "react-native-loading-spinner-overlay";

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <View style={{ alignItems: "center", flexDirection: "row", height: 45 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 3 + "%",
          }}
        >
          <Image
            style={{ width: 24, height: 24 }}
            source={require("../../assets/images/logo.png")}
          />
          <View style={{ flexDirection: "row", paddingLeft: 6 + "%" }}>
            <Text style={{ fontWeight: "bold" }}>Si</Text>
            <Text>Rujuk</Text>
          </View>
        </View>
        <View
          style={{ position: "absolute", right: 3 + "%", alignItems: "center" }}
        >
          <Text style={{ fontWeight: "bold" }}>
            {navigation.state.params.nama.split(" ").slice(0, 2).join(" ")}
          </Text>
        </View>
      </View>
    ),
  });

  state = {
    user: {},
    spinner: false,
  };

  componentWillMount() {
    this.setState({ spinner: true });
    AsyncStorage.getItem("user").then((result) => {
      this.setState({ user: JSON.parse(result) });
      HealthcareAPI.get("/referral/poli/in", {
        params: {
          id: this.state.user.idFaskes,
        },
      }).then(
        (response) =>
          AsyncStorage.setItem("referralPoliIn", JSON.stringify(response.data)),
        HealthcareAPI.get("/referral/emergency/in", {
          params: {
            id: this.state.user.idFaskes,
          },
        }).then(
          (response) =>
            AsyncStorage.setItem(
              "referralEmergencyIn",
              JSON.stringify(response.data)
            ),
          HealthcareAPI.get("/referral/poli/out", {
            params: {
              id: this.state.user.idFaskes,
            },
          }).then(
            (response) =>
              AsyncStorage.setItem(
                "referralPoliOut",
                JSON.stringify(response.data)
              ),
            HealthcareAPI.get("/referral/emergency/out", {
              params: {
                id: this.state.user.idFaskes,
              },
            }).then(
              (response) =>
                AsyncStorage.setItem(
                  "referralEmergencyOut",
                  JSON.stringify(response.data)
                ),
              HealthcareAPI.get("/referral/maternal/out", {
                params: {
                  id: this.state.user.idFaskes,
                },
              }).then(
                (response) =>
                  AsyncStorage.setItem(
                    "referralMaternalOut",
                    JSON.stringify(response.data)
                  ),
                HealthcareAPI.get("/referral/neonatal/out", {
                  params: {
                    id: this.state.user.idFaskes,
                  },
                }).then(
                  (response) =>
                    AsyncStorage.setItem(
                      "referralNeonatalOut",
                      JSON.stringify(response.data)
                    ),
                   // this.setState({ spinner: false }
                    HealthcareAPI.get("/referral/maternal/in", {
                      params: {
                        id: this.state.user.idFaskes,
                      },
                    }).then(
                      (response) =>
                        AsyncStorage.setItem(
                          "referralMaternalIn",
                          JSON.stringify(response.data)
                        ),
                      HealthcareAPI.get("/referral/neonatal/in", {
                        params: {
                          id: this.state.user.idFaskes,
                        },
                      }).then(
                        (response) =>{
                          AsyncStorage.setItem(
                            "referralNeonatalIn",
                            JSON.stringify(response.data)
                          )
                        },
                        this.setState({ spinner: false }
                      )
                    )
                  )
                )
              )
            )
          )
        )
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
          textContent={"Memuat Data Rujukan..."}
          textStyle={{ color: "#ffffff" }}
        />
        <StatusBar backgroundColor={"#00818c"} />
        <ScrollView contentContainerStyle={styles.contents}>
          <View style={styles.content}>
            <View style={styles.button}>
              <Image
                style={styles.buttonImage}
                resizeMode={"cover"}
                source={require("../../assets/images/poliklinik.jpg")}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  navigate("ReferralCreatePatientDataScreen", {
                    referralType: 1,
                  })
                }
                style={styles.buttonLayer}
              >
                <View style={styles.buttonIcon}>
                  <Image
                    style={{ width: 20, height: 20, marginLeft: 5 + "%" }}
                    source={require("../../assets/images/capsule.png")}
                  />
                </View>
                <View style={styles.buttonInfo}>
                  <View style={{ marginLeft: 5 + "%" }}>
                    <Text
                      style={{
                        color: "#ffffff",
                        fontSize: 15,
                        fontWeight: "bold",
                      }}
                    >
                      Rujuk
                    </Text>
                    <Text
                      style={{
                        color: "#00a6fb",
                        fontSize: 15,
                        fontWeight: "bold",
                      }}
                    >
                      Poliklinik
                    </Text>
                  </View>
                  <View style={styles.buttonTrigger}>
                    <Text
                      style={{
                        color: "#ffffff",
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      Buat Rujukan
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.lineDivider}></View>
          <View style={styles.content}>
            <View style={styles.button}>
              <Image
                style={styles.buttonImage}
                resizeMode={"cover"}
                source={require("../../assets/images/emergency.jpg")}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  navigate("ReferralCreatePatientDataScreen", {
                    referralType: 2,
                  })
                }
                style={styles.buttonLayer}
              >
                <View style={styles.buttonIcon}>
                  <Image
                    style={{ width: 20, height: 20, marginLeft: 5 + "%" }}
                    source={require("../../assets/images/ambulance.png")}
                  />
                </View>
                <View style={styles.buttonInfo}>
                  <View style={{ marginLeft: 5 + "%" }}>
                    <Text
                      style={{
                        color: "#ffffff",
                        fontSize: 15,
                        fontWeight: "bold",
                      }}
                    >
                      Rujuk
                    </Text>
                    <Text
                      style={{
                        color: "#f05d5e",
                        fontSize: 15,
                        fontWeight: "bold",
                      }}
                    >
                      Emergency
                    </Text>
                  </View>
                  <View style={styles.buttonTrigger}>
                    <Text
                      style={{
                        color: "#ffffff",
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      Buat Rujukan
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.lineDivider}></View>

          <View style={styles.content}>
            <View style={styles.button}>
              <Image
                style={styles.buttonImage}
                resizeMode={"cover"}
                source={require("../../assets/images/maternal.jpg")}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  navigate("ReferralCreatePatientDataScreen", {
                    referralType: 3,
                  })
                }
                style={styles.buttonLayer}
              >
                <View style={styles.buttonIcon}>
                  <Image
                    style={{ width: 20, height: 20, marginLeft: 5 + "%" }}
                    source={require("../../assets/images/pregnancy.png")}
                  />
                </View>
                <View style={styles.buttonInfo}>
                  <View style={{ marginLeft: 5 + "%" }}>
                    <Text
                      style={{
                        color: "#ffffff",
                        fontSize: 15,
                        fontWeight: "bold",
                      }}
                    >
                      Rujuk
                    </Text>
                    <Text
                      style={{
                        color: "#EC407A",
                        fontSize: 15,
                        fontWeight: "bold",
                      }}
                    >
                      Maternal
                    </Text>
                  </View>
                  <View style={styles.buttonTrigger}>
                    <Text
                      style={{
                        color: "#ffffff",
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      Buat Rujukan
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.lineDivider}></View>

          <View style={styles.content}>
            <View style={styles.button}>
              <Image
                style={styles.buttonImage}
                resizeMode={"cover"}
                source={require("../../assets/images/neonatal.jpg")}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  navigate("ReferralCreatePatientDataScreen", {
                    referralType: 4,
                  })
                }
                style={styles.buttonLayer}
              >
                <View style={styles.buttonIcon}>
                  <Image
                    style={{ width: 20, height: 20, marginLeft: 5 + "%" }}
                    source={require("../../assets/images/ultrasound.png")}
                  />
                </View>
                <View style={styles.buttonInfo}>
                  <View style={{ marginLeft: 5 + "%" }}>
                    <Text
                      style={{
                        color: "#ffffff",
                        fontSize: 15,
                        fontWeight: "bold",
                      }}
                    >
                      Rujuk
                    </Text>
                    <Text
                      style={{
                        color: "#36CAB4",
                        fontSize: 15,
                        fontWeight: "bold",
                      }}
                    >
                      Neonatal
                    </Text>
                  </View>
                  <View style={styles.buttonTrigger}>
                    <Text
                      style={{
                        color: "#ffffff",
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      Buat Rujukan
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
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
  contents: {
    alignItems: "center",
    flexDirection: "column",
    width: 100 + "%",
    height: 500,
    backgroundColor: "#ffffff",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    width: 100 + "%",
    height: 25 + "%",
  },
  lineDivider: {
    justifyContent: "center",
    alignItems: "center",
    width: 100 + "%",
    height: 1,
    backgroundColor: "#eeeeee",
  },
  button: {
    width: 90 + "%",
    height: 80 + "%",
  },
  buttonImage: {
    width: 100 + "%",
    height: 100 + "%",
    borderRadius: 4,
  },
  buttonLayer: {
    position: "absolute",
    backgroundColor: "#000000",
    opacity: 0.8,
    width: 100 + "%",
    height: 100 + "%",
    borderRadius: 4,
  },
  buttonIcon: {
    justifyContent: "center",
    width: 100 + "%",
    height: 50 + "%",
  },
  buttonInfo: {
    flexDirection: "row",
    alignItems: "center",
    width: 100 + "%",
    height: 50 + "%",
  },
  buttonTrigger: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    right: 5 + "%",
    backgroundColor: "#28c667",
    width: 35 + "%",
    height: 40 + "%",
  },
});

export default HomeScreen;
