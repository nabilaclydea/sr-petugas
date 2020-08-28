import { createStackNavigator } from "react-navigation";
import { ReferralInfografisScreenPoli } from "../../screen";

const InfografisStackPoli = createStackNavigator({
  ReferralInfografisScreenPoli: {
    screen: ReferralInfografisScreenPoli
  }
});

InfografisStackPoli.navigationOptions = ({ navigation }) => {
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

export default InfografisStackPoli;
