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
    items:[
      {name:"",count:0},
      {name:"",count:0},
      {name:"",count:0},
      {name:"",count:0},
      {name:"",count:0}],
    items2:[
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
    sortedItems:[
      {name:"",count:0},
      {name:"",count:0},
      {name:"",count:0},
      {name:"",count:0},
      {name:"",count:0}],
    sortedItems2:[
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
      {name:"",count:0}],
  };

  componentDidMount(){
    const namaRujuk=['maternal', 'neonatal'];
    for(i=0;i<3000;i++){
      for(j=0;j<2;j++){
        HealthcareAPI.get('/referral/'+namaRujuk[j]+'/in?id='+i).then(response => {
          for(k=0;k<response.data.length;k++){
            var index=null;
            var index2=null;
            var indexDiagnosis=null;
            const namaRSout=response.data[k].faskesAsal.nama
            const namaRSin=response.data[k].faskesTujuan.nama
            const namaDiagnosis=response.data[k].rekamMedis.diagnosisText
            this.state.items.some(function(item, n){
              if(item.name==namaRSout){
                index=n
                return true
              }
            })
            this.state.items2.some(function(item, n){
              if(item.name==namaRSin){
                index2=n
                return true
              }
            })
            this.state.diagnosisItems.some(function(item, n){
              if(item.name==namaDiagnosis){
                indexDiagnosis=n
                return true
              }
            })
            if(index!=null){
              this.state.items[index].count+=1
              this.forceUpdate()
            }
            else{
              const addToItems=[{name:namaRSout, count:1}]
              this.setState({items:this.state.items.concat(addToItems)})
            }
            if(index2!=null){
              this.state.items2[index2].count+=1
              this.forceUpdate()
            }
            else{
              const addToItems=[{name:namaRSin, count:1}]
              this.setState({items2:this.state.items2.concat(addToItems)})
            }
            if(indexDiagnosis!=null){
              this.state.diagnosisItems[indexDiagnosis].count+=1
              this.forceUpdate()
            }
            else{
              const addToItems=[{name:namaDiagnosis, count:1}]
              this.setState({diagnosisItems:this.state.diagnosisItems.concat(addToItems)})
            }
            this.sortIt()
            this.sortIt2()
            this.sortItDiagnosis()
          }
        })
      }
    }
  }

  sortIt(){
    const sorting=this.state.items.sort(function(a,b){
      return parseInt(a.count)<parseInt(b.count);
    })
    this.setState({sortedItems:sorting})
  }
  sortIt2(){
    const sorting=this.state.items2.sort(function(a,b){
      return parseInt(a.count)<parseInt(b.count);
    })
    this.setState({sortedItems2:sorting})
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
        value: this.state.sortedItems2[0].count,
        label: this.state.sortedItems2[0].name+" ("+this.state.sortedItems2[0].count+")",
      },
      {
        value: this.state.sortedItems2[1].count,
        label: this.state.sortedItems2[1].name+" ("+this.state.sortedItems2[1].count+")",
      },
      {
        value: this.state.sortedItems2[2].count,
        label: this.state.sortedItems2[2].name+" ("+this.state.sortedItems2[2].count+")",
      },
      {
        value: this.state.sortedItems2[3].count,
        label: this.state.sortedItems2[3].name+" ("+this.state.sortedItems2[3].count+")",
      },
      {
        value: this.state.sortedItems2[4].count,
        label: this.state.sortedItems2[4].name+" ("+this.state.sortedItems2[4].count+")",
      },
    ];
    const data2 = [
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

export default ReferralInfografisScreenMaternalNeonatal;
