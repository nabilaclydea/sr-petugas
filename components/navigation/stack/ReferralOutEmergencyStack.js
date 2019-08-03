import {createStackNavigator} from 'react-navigation';
import {ReferralOutEmergencyScreen, ReferralDetailScreen} from '../../screen';
import ProfileStack from "./ProfileStack";

const ReferralOutEmergencyStack = createStackNavigator(
    {
        ReferralOutEmergencyScreen: {
            screen: ReferralOutEmergencyScreen,
        },
        ReferralDetailScreen: {
            screen: ReferralDetailScreen,
        }
    },
);

ReferralOutEmergencyStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    let swipeEnabled = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
        swipeEnabled = false;
    }

    return {
        tabBarVisible,
        swipeEnabled,
    };
};

export default ReferralOutEmergencyStack;