import { createStackNavigator } from "react-navigation";
import {
  ReferralOutMaternalNeonatalScreen,
  MaternalReferralDetailScreen,
  NeonatalReferralDetailScreen
} from "../../screen/maternalneonatalreferral";
import ProfileStack from "./ProfileStack";

const ReferralOutMaternalNeonatalStack = createStackNavigator({
  ReferralOutMaternalNeonatalScreen: {
    screen: ReferralOutMaternalNeonatalScreen
  },
  MaternalReferralDetailScreen: {
    screen: MaternalReferralDetailScreen
  },
  NeonatalReferralDetailScreen: {
    screen: NeonatalReferralDetailScreen
  }
});

ReferralOutMaternalNeonatalStack.navigationOptions = ({ navigation }) => {
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

export default ReferralOutMaternalNeonatalStack;
