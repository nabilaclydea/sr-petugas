import { createStackNavigator } from "react-navigation";
import { ReferralInfografisScreenMaternalNeonatal } from "../../screen";

const InfografisStackMaternalNeonatal = createStackNavigator({
  ReferralInfografisScreenMaternalNeonatal: {
    screen: ReferralInfografisScreenMaternalNeonatal
  }
});

InfografisStackMaternalNeonatal.navigationOptions = ({ navigation }) => {
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

export default InfografisStackMaternalNeonatal;
