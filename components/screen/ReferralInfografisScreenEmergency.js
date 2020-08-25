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

class ReferralInfografisScreenEmergency extends React.PureComponent {
  // static navigationOptions = {
  //   title: "Statistik Rujukan per Faskes"
  // };
  static navigationOptions = {
    header: null,
  };

  state={
    items:[
      {name:"ICU",count:0},
      {name:"NICU",count:0},
      {name:"PICU",count:0},
      {name:"HICU",count:0},
      {name:"ICCU",count:0},
      {name:"PONEK",count:0},
      {name:"Kelas III",count:0},
      {name:"Kelas II",count:0},
      {name:"Kelas I",count:0},
      {name:"Kelas VIP",count:0},
      {name:"Poliklinik",count:0},
      {name:"IGD",count:0}
    ],
    sortedItems:[
      {name:"",count:0},
      {name:"",count:0},
      {name:"",count:0},
      {name:"",count:0},
      {name:"",count:0}]
  };

  componentWillMount(){
    for(i=0;i<3000;i++){
      HealthcareAPI.get('/referral/emergency/in?id='+i).then(response => {
        for(j=0;j<response.data.length;j++){
          var index=null;
          const tipeRuangan=response.data[j].ruangan.namaTipeRuangan
          this.state.items.some(function(item, n){
            if(item.name==tipeRuangan){
              index=n
              return true
            }
          })
          this.state.items[index].count+=1
          this.forceUpdate()
          this.sortIt()
        }
      })
    }
  }

  sortIt(){
    const sorting=this.state.items.sort(function(a,b){
      return parseInt(a.count)<parseInt(b.count);
    })
    this.setState({sortedItems:sorting})
  }

  render() {
    const data1 = [
      {
        value: this.state.sortedItems[0].count,
        label: this.state.sortedItems[0].name+" ("+this.state.sortedItems[0].count+")",
      },
      {
        value: this.state.sortedItems[1].count,
        label: this.state.sortedItems[1].name+" ("+this.state.sortedItems[1].count+")",
      },
      {
        value: this.state.sortedItems[2].count,
        label: this.state.sortedItems[2].name+" ("+this.state.sortedItems[2].count+")",
      },
      {
        value: this.state.sortedItems[3].count,
        label: this.state.sortedItems[3].name+" ("+this.state.sortedItems[3].count+")",
      },
      {
        value: this.state.sortedItems[4].count,
        label: this.state.sortedItems[4].name+" ("+this.state.sortedItems[4].count+")",
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
            <Text style={styles.titleText}>Rujuk Emergency Terbanyak</Text>
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

export default ReferralInfografisScreenEmergency;
