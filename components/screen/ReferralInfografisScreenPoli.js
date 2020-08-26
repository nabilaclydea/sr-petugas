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
    ],
    sortedItems:[
      {name:"",count:0},
      {name:"",count:0},
      {name:"",count:0},
      {name:"",count:0},
      {name:"",count:0}],
    itemsOut:[
      {name:"",count:0},
      {name:"",count:0},
      {name:"",count:0},
      {name:"",count:0},
      {name:"",count:0}],
    itemsIn:[
      {name:"",count:0},
      {name:"",count:0},
      {name:"",count:0},
      {name:"",count:0},
      {name:"",count:0}],
    diagnosisItems:[
      {name:"",count:0},
      {name:"",count:0},
      {name:"",count:0},
      {name:"",count:0},
      {name:"",count:0}],
    sortedItemsOut:[
      {name:"",count:0},
      {name:"",count:0},
      {name:"",count:0},
      {name:"",count:0},
      {name:"",count:0}],
    sortedItemsIn:[
      {name:"",count:0},
      {name:"",count:0},
      {name:"",count:0},
      {name:"",count:0},
      {name:"",count:0}],
    sortedDiagnosisItems:[
      {name:"",count:0},
      {name:"",count:0},
      {name:"",count:0},
      {name:"",count:0},
      {name:"",count:0}]
  };
  
  componentDidMount(){
    for(i=0;i<3000;i++){
      HealthcareAPI.get('/referral/poli/in?id='+i).then(response => {
        for(j=0;j<response.data.length;j++){
          var index=null;
          var indexOut=null;
          var indexIn=null;
          var indexDiagnosis=null;
          const jenisPoli=response.data[j].poli.namaJenisPoli
          const namaRSout=response.data[j].faskesAsal.nama
          const namaRSin=response.data[j].faskesTujuan.nama
          const namaDiagnosis=response.data[j].rekamMedis.diagnosisText
          this.state.items.some(function(item, n){
            if(item.name==jenisPoli){
              index=n
              return true
            }
          })
          this.state.itemsOut.some(function(item, n){
            if(item.name==namaRSout){
              indexOut=n
              return true
            }
          })
          this.state.itemsIn.some(function(item, n){
            if(item.name==namaRSin){
              indexIn=n
              return true
            }
          })
          this.state.diagnosisItems.some(function(item, n){
            if(item.name==namaDiagnosis){
              indexDiagnosis=n
              return true
            }
          })
          if(indexOut!=null){
            this.state.itemsOut[indexOut].count+=1
            this.forceUpdate()
          }
          else{
            const addToItems=[{name:namaRSout, count:1}]
            this.setState({itemsOut:this.state.itemsOut.concat(addToItems)})
          }
          if(indexIn!=null){
            this.state.itemsIn[indexIn].count+=1
            this.forceUpdate()
          }
          else{
            const addToItems=[{name:namaRSin, count:1}]
            this.setState({itemsIn:this.state.itemsIn.concat(addToItems)})
          }
          if(indexDiagnosis!=null){
            this.state.diagnosisItems[indexDiagnosis].count+=1
            this.forceUpdate()
          }
          else{
            const addToItems=[{name:namaDiagnosis, count:1}]
            this.setState({diagnosisItems:this.state.diagnosisItems.concat(addToItems)})
          }
          this.state.items[index].count+=1
          this.forceUpdate()
          this.sortIt()
          this.sortItOut()
          this.sortItIn()
          this.sortItDiagnosis()
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
  sortItOut(){
    const sorting=this.state.itemsOut.sort(function(a,b){
      return parseInt(a.count)<parseInt(b.count);
    })
    this.setState({sortedItemsOut:sorting})
  }
  sortItIn(){
    const sorting=this.state.itemsIn.sort(function(a,b){
      return parseInt(a.count)<parseInt(b.count);
    })
    this.setState({sortedItemsIn:sorting})
  }
  sortItDiagnosis(){
    const sorting=this.state.diagnosisItems.sort(function(a,b){
      return parseInt(a.count)<parseInt(b.count);
    })
    this.setState({sortedDiagnosisItems:sorting})
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
    const data2 = [
      {
        value: this.state.sortedItemsIn[0].count,
        label: this.state.sortedItemsIn[0].name+" ("+this.state.sortedItemsIn[0].count+")",
      },
      {
        value: this.state.sortedItemsIn[1].count,
        label: this.state.sortedItemsIn[1].name+" ("+this.state.sortedItemsIn[1].count+")",
      },
      {
        value: this.state.sortedItemsIn[2].count,
        label: this.state.sortedItemsIn[2].name+" ("+this.state.sortedItemsIn[2].count+")",
      },
      {
        value: this.state.sortedItemsIn[3].count,
        label: this.state.sortedItemsIn[3].name+" ("+this.state.sortedItemsIn[3].count+")",
      },
      {
        value: this.state.sortedItemsIn[4].count,
        label: this.state.sortedItemsIn[4].name+" ("+this.state.sortedItemsIn[4].count+")",
      },
    ];
    const data3 = [
      {
        value: this.state.sortedItemsOut[0].count,
        label: this.state.sortedItemsOut[0].name+" ("+this.state.sortedItemsOut[0].count+")",
      },
      {
        value: this.state.sortedItemsOut[1].count,
        label: this.state.sortedItemsOut[1].name+" ("+this.state.sortedItemsOut[1].count+")",
      },
      {
        value: this.state.sortedItemsOut[2].count,
        label: this.state.sortedItemsOut[2].name+" ("+this.state.sortedItemsOut[2].count+")",
      },
      {
        value: this.state.sortedItemsOut[3].count,
        label: this.state.sortedItemsOut[3].name+" ("+this.state.sortedItemsOut[3].count+")",
      },
      {
        value: this.state.sortedItemsOut[4].count,
        label: this.state.sortedItemsOut[4].name+" ("+this.state.sortedItemsOut[4].count+")",
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
                data={data3}
                yAccessor={({ index }) => index}
                scale={scale.scaleBand}
                contentInset={{ top: 10, bottom: 10 }}
                spacing={0.1}
                formatLabel={(_, index) => data3[index].label}
              />
              <BarChart
                style={{ flex: 1, marginLeft: 8 }}
                data={data3}
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
                  name: this.state.sortedDiagnosisItems[0].name,
                  population: this.state.sortedDiagnosisItems[0].count,
                  color: "rgba(131, 167, 234, 1)",
                  legendFontColor: "black",
                  legendFontSize: 11,
                  marginLeft: 5,
                },
                {
                  name: this.state.sortedDiagnosisItems[1].name,
                  population: this.state.sortedDiagnosisItems[1].count,
                  color: "red",
                  legendFontColor: "black",
                  legendFontSize: 11,
                  marginLeft: 5,
                },
                {
                  name: this.state.sortedDiagnosisItems[2].name,
                  population: this.state.sortedDiagnosisItems[2].count,
                  color: "yellow",
                  legendFontColor: "black",
                  legendFontSize: 11,
                  marginLeft: 5,
                },
                {
                  name: this.state.sortedDiagnosisItems[3].name,
                  population: this.state.sortedDiagnosisItems[3].count,
                  color: "orange",
                  legendFontColor: "black",
                  legendFontSize: 11,
                  marginLeft: 5,
                },
                {
                  name: this.state.sortedDiagnosisItems[4].name,
                  population: this.state.sortedDiagnosisItems[4].count,
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

export default ReferralInfografisScreenPoli;
