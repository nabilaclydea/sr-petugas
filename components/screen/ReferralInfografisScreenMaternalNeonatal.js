import React, { Component } from "react";
import {
  View,
  ScrollView,
  Modal,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import { BarChart, Grid, YAxis } from "react-native-svg-charts";
import * as scale from "d3-scale";
import HealthcareAPI from "../api/HealthcareAPI";

class ReferralInfografisScreenMaternalNeonatal extends React.PureComponent {
  // static navigationOptions = {
  //   title: "Statistik Rujukan per Faskes"
  // };
  static navigationOptions = {
    header: null,
  };

  state={
    
    // topItems:[],
    counter:0
    // counter1:""
  };

  // countInc(n){
  //   this.state.items[n].count+=1
  //   this.forceUpdate()
  // }

  componentDidMount(){
    const namaRujuk=['poli', 'emergency', 'maternal', 'neonatal'];
    for(i=2346;i<2347;i++){
      for(j=0;j<4;j++){
        HealthcareAPI.get('/referral/'+namaRujuk[j]+'/in?id='+i).then(response => {
          this.state.counter+=response.data.length
          this.forceUpdate()
        })
      }
    }

    // const myData = [].concat(this.state.items).sort((a, b) => a.count > b.count ? 1 : -1);
    // this.setState({
    //   topItems: myData
    // });
  }

  render() {
    const data1 = [
      {
        value: this.state.counter,
        label: "11",
      },
      {
        value: 21,
        label: "11",
      },
      {
        value: 31,
        label: "11",
      },
      {
        value: 41,
        label: "11",
      },
      {
        value: 60,
        label: "11",
      },
    ];
    const data2 = [
      {
        value: 50,
        label: "RSU Tangsel",
      },
      {
        value: 40,
        label: "RS Hermina",
      },
      {
        value: 30,
        label: "RS Sari Asih",
      },
      {
        value: 20,
        label: "RS Buah Hati",
      },
      {
        value: 10,
        label: "RS Vitalaya",
      },
    ];
    return (
      <View style={styles.firstLayer}>
        {/* <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ffffff",
              width: 33 + "%",
              height: 75
            }}
          >
            <Text style={{ color: "#019ca9", fontSize: 15 }}>POLI</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ffffff",
              width: 33 + "%",
              height: 75
            }}
          >
            <Text style={{ color: "#019ca9", fontSize: 15 }}>EMERGENSI</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ffffff",
              width: 34 + "%",
              height: 75
            }}
          >
            <Text style={{ color: "#019ca9", fontSize: 15 }}>
              MATERNAL{"\n"}NEONATAL
            </Text>
          </TouchableOpacity>
        </View> */}
        <ScrollView>
          <View style={styles.title}>
            <Text style={styles.titleText}>Rujukan Masuk Terbanyak</Text>
          </View>
          <View
            style={{
              width: 100 + "%",
              minHeight: 200,
              backgroundColor: "#ffffff",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                height: 200,
                paddingVertical: 16,
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              <YAxis
                data={data1}
                yAccessor={({ index }) => index}
                scale={scale.scaleBand}
                contentInset={{ top: 10, bottom: 10 }}
                spacing={0.2}
                formatLabel={(_, index) => data1[index].label}
              />
              <BarChart
                style={{ flex: 1, marginLeft: 8 }}
                data={data1}
                horizontal={true}
                yAccessor={({ item }) => item.value}
                svg={{ fill: "rgba(134, 65, 244, 0.8)" }}
                contentInset={{ top: 10, bottom: 10 }}
                spacing={0.2}
                gridMin={0}
              >
                <Grid direction={Grid.Direction.VERTICAL} />
              </BarChart>
            </View>
          </View>

          <View style={styles.title}>
            <Text style={styles.titleText}>Rujukan Keluar Terbanyak</Text>
          </View>
          <View
            style={{
              width: 100 + "%",
              minHeight: 200,
              backgroundColor: "#ffffff",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                height: 200,
                paddingVertical: 16,
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              <YAxis
                data={data2}
                yAccessor={({ index }) => index}
                scale={scale.scaleBand}
                contentInset={{ top: 10, bottom: 10 }}
                spacing={0.1}
                formatLabel={(_, index) => data2[index].label}
              />
              <BarChart
                style={{ flex: 1, marginLeft: 8 }}
                data={data2}
                horizontal={true}
                yAccessor={({ item }) => item.value}
                svg={{ fill: "rgba(134, 65, 244, 0.8)" }}
                contentInset={{ top: 10, bottom: 10 }}
                spacing={0.1}
                gridMin={0}
              >
                <Grid direction={Grid.Direction.VERTICAL} />
              </BarChart>
            </View>
          </View>

          <View style={styles.title}>
            <Text style={styles.titleText}>Kasus Rujukan Terbanyak</Text>
          </View>
          <View
            style={{
              width: 100 + "%",
              minHeight: 200,
              backgroundColor: "#ffffff",
            }}
          >
            <PieChart
              data={[
                {
                  name: "Hemorrhage",
                  population: 48.0,
                  color: "rgba(131, 167, 234, 1)",
                  legendFontColor: "black",
                  legendFontSize: 11,
                  marginLeft: 5,
                },
                {
                  name: "Preterm labor",
                  population: 39.2,
                  color: "red",
                  legendFontColor: "black",
                  legendFontSize: 11,
                  marginLeft: 5,
                },
                {
                  name: "Long labor",
                  population: 34.2,
                  color: "yellow",
                  legendFontColor: "black",
                  legendFontSize: 11,
                  marginLeft: 5,
                },
                {
                  name: "Sepsis",
                  population: 14.2,
                  color: "orange",
                  legendFontColor: "black",
                  legendFontSize: 11,
                  marginLeft: 5,
                },
                {
                  name: "Birth trauma",
                  population: 12.4,
                  color: "green",
                  legendFontColor: "black",
                  legendFontSize: 11,
                  marginLeft: 5,
                },
              ]}
              backgroundColor="#ffffff"
              width={Dimensions.get("window").width} // from react-native
              height={220}
              chartConfig={{
                color: (opacity = 1) => `white`,
                labelColor: (opacity = 1) => `white`,
                style: {
                  borderRadius: 16,
                },
              }}
              accessor="population"
              paddingLeft="5"
              absolute
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
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
  title: { justifyContent: "center", width: 100 + "%", height: 25 },
  titleText: {
    color: "#000000",
    fontWeight: "bold",
    marginLeft: 3 + "%",
  },
});

export default ReferralInfografisScreenMaternalNeonatal;
