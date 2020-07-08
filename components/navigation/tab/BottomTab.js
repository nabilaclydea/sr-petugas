import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import {
  HomeStack,
  ReferralInPoliStack,
  ReferralOutPoliStack,
  ProfileStack,
  InfografisStack
} from "../stack";
import ReferralInTab from "./ReferralInTab";
import ReferralOutTab from "./ReferralOutTab";
import BottomTabStyle from "./BottomTabStyle";
import InfografisTab from "./InfografisTab";

const BottomTab = createBottomTabNavigator(
  {
    Beranda: {
      screen: HomeStack
    },
    Masuk: {
      screen: ReferralInTab
    },
    Keluar: {
      screen: ReferralOutTab
    },
    Infografis: {
      screen: InfografisTab
    },
    Profil: {
      screen: ProfileStack
    }
  },
  {
    order: ["Beranda", "Masuk", "Keluar", "Infografis", "Profil"],
    tabBarComponent: props => <BottomTabStyle {...props} />
  }
);

export default BottomTab;
