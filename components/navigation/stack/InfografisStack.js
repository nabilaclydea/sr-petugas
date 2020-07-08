import { createStackNavigator } from "react-navigation";
import { ReferralInfografisScreen } from "../../screen";

const InfografisStack = createStackNavigator({
  ReferralInfografisScreen: {
    screen: ReferralInfografisScreen
  }
});

InfografisStack.navigationOptions = ({ navigation }) => {
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

export default InfografisStack;
