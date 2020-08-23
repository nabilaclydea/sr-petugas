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

class ReferralInfografisScreenPoli extends React.PureComponent {
  // static navigationOptions = {
  //   title: "Statistik Rujukan per Faskes"
  // };
  static navigationOptions = {
    header: null,
  };

  state={
    items:[
      {name:"Poli Akupunktur",count:0},
      {name:"Poli Anak",count:0},
      {name:"Poli Anestesi",count:0},
      {name:"Poli Bedah",count:0},
      {name:"Poli Bedah Orthopaedi",count:0},
      {name:"Poli Bedah Plastik",count:0},
      {name:"Poli Bedah Saraf",count:0},
      {name:"Poli Gigi dan Mulut",count:0},
      {name:"Poli Gizi",count:0},
      {name:"Poli Jantung",count:0},
      {name:"Poli Kebidanan dan Kandungan",count:0},
      {name:"Poli Kulit dan Kelamin",count:0},
      {name:"Poli Mata",count:0},
      {name:"Poli Medik Dasar",count:0},
      {name:"Poli Paru",count:0},
      {name:"Poli Penyakit Dalam",count:0},
      {name:"Poli PPKT",count:0},
      {name:"Poli Rehabilitasi Medik",count:0},
      {name:"Poli Saraf",count:0},
      {name:"Poli THT",count:0},
      {name:"Poli Umum",count:0}
    ]
  };

  countInc(n){
    this.state.items[n].count+=1
    this.forceUpdate()
  }

  componentDidMount(){
    for(i=0;i<3000;i++){
      HealthcareAPI.get('/referral/poli/in?id='+i).then(response => {
        for(j=0;j<response.data.length;j++){
          const jenisPoli=response.data[j].poli.namaJenisPoli
          if(jenisPoli=="Poli Akupunktur"){
            this.countInc(0)
          }
          else if(jenisPoli=="Poli Anak"){
            this.countInc(1)
          }
          else if(jenisPoli=="Poli Anestesi"){
            this.countInc(2)
          }
          else if(jenisPoli=="Poli Bedah"){
            this.countInc(3)
          }
          else if(jenisPoli=="Poli Bedah Orthopaedi"){
            this.countInc(4)
          }
          else if(jenisPoli=="Poli Bedah Plastik"){
            this.countInc(5)
          }
          else if(jenisPoli=="Poli Bedah Saraf"){
            this.countInc(6)
          }
          else if(jenisPoli=="Poli Gigi dan Mulut"){
            this.countInc(7)
          }
          else if(jenisPoli=="Poli Gizi"){
            this.countInc(8)
          }
          else if(jenisPoli=="Poli Jantung"){
            this.countInc(9)
          }
          else if(jenisPoli=="Poli Kebidanan dan Kandungan"){
            this.countInc(10)
          }
          else if(jenisPoli=="Poli Kulit dan Kelamin"){
            this.countInc(11)
          }
          else if(jenisPoli=="Poli Mata"){
            this.countInc(12)
          }
          else if(jenisPoli=="Poli Medik Dasar"){
            this.countInc(13)
          }
          else if(jenisPoli=="Poli Paru"){
            this.countInc(14)
          }
          else if(jenisPoli=="Poli Penyakit Dalam"){
            this.countInc(15)
          }
          else if(jenisPoli=="Poli PPKT"){
            this.countInc(16)
          }
          else if(jenisPoli=="Poli Rehabilitasi Medik"){
            this.countInc(17)
          }
          else if(jenisPoli=="Poli Saraf"){
            this.countInc(18)
          }
          else if(jenisPoli=="Poli THT"){
            this.countInc(19)
          }
          else if(jenisPoli=="Poli Umum"){
            this.countInc(20)
          }
        }
      })
    }
  }

  render() {
    const data1 = [
      {
        value: this.state.items[0].count,
        label: this.state.items[0].name,
      },
      {
        value: this.state.items[1].count,
        label: this.state.items[1].name,
      },
      {
        value: this.state.items[2].count,
        label: this.state.items[2].name,
      },
      {
        value: this.state.items[3].count,
        label: this.state.items[3].name,
      },
      {
        value: this.state.items[4].count,
        label: this.state.items[4].name,
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
            <Text style={styles.titleText}>Poli Rujukan Terbanyak</Text>
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

export default ReferralInfografisScreenPoli;
