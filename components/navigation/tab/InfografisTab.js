import React from "react";
import { createMaterialTopTabNavigator } from "react-navigation";
import { InfografisStack } from "../stack";

const InfografisTab = createMaterialTopTabNavigator(
  {
    Poli: {
      screen: InfografisStack
    },
    Emergency: {
      screen: InfografisStack
    },
    Maternal_Neonatal: {
      screen: InfografisStack
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "#00818c",
      inactiveTintColor: "#aeaeae",
      style: {
        backgroundColor: "#ffffff"
      },
      indicatorStyle: {
        backgroundColor: "#00818c"
      }
    }
  }
);

InfografisTab.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (
    navigation.state.routes[0].index > 0 ||
    navigation.state.routes[1].index > 0 ||
    navigation.state.routes[2].index > 0
  ) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

export default InfografisTab;
