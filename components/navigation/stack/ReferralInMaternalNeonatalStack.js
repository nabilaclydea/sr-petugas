import { createStackNavigator } from "react-navigation";
import {
  ReferralInMaternalNeonatalScreen,
  MaternalReferralDetailScreen,
  NeonatalReferralDetailScreen
} from "../../screen/maternalneonatalreferral";
//import ProfileStack from "./ProfileStack";

const ReferralInMaternalNeonatalStack = createStackNavigator({
  ReferralInMaternalNeonatalScreen: {
    screen: ReferralInMaternalNeonatalScreen
  },
  MaternalReferralDetailScreen: {
    screen: MaternalReferralDetailScreen
  },
  NeonatalReferralDetailScreen: {
    screen: NeonatalReferralDetailScreen
  }
});

ReferralInMaternalNeonatalStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  let swipeEnabled = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
    swipeEnabled = false;
  }

  return {
    tabBarVisible,
    swipeEnabled
  };
};

export default ReferralInMaternalNeonatalStack;
