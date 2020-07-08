import React from "react";
import { createMaterialTopTabNavigator } from "react-navigation";
import {
  ReferralOutPoliStack,
  ReferralOutEmergencyStack,
  ReferralOutMaternalNeonatalStack
} from "../stack";
import ReferralInTab from "./ReferralInTab";

const ReferralOutTab = createMaterialTopTabNavigator(
  {
    Poli: {
      screen: ReferralOutPoliStack
    },
    Emergency: {
      screen: ReferralOutEmergencyStack
    },
    Maternal_Neonatal: {
      screen: ReferralOutMaternalNeonatalStack
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

ReferralOutTab.navigationOptions = ({ navigation }) => {
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

export default ReferralOutTab;
