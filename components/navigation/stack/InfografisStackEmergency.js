import { createStackNavigator } from "react-navigation";
import { ReferralInfografisScreenEmergency } from "../../screen";

const InfografisStackEmergency = createStackNavigator({
  ReferralInfografisScreenEmergency: {
    screen: ReferralInfografisScreenEmergency
  }
});

InfografisStackEmergency.navigationOptions = ({ navigation }) => {
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

export default InfografisStackEmergency;
