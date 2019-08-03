import {createStackNavigator} from 'react-navigation';
import {ReferralInEmergencyScreen, ReferralDetailScreen} from '../../screen';
import ProfileStack from "./ProfileStack";

const ReferralInEmergencyStack = createStackNavigator(
    {
        ReferralInEmergencyScreen: {
            screen: ReferralInEmergencyScreen,
        },
        ReferralDetailScreen: {
            screen: ReferralDetailScreen,
        }
    },
);

ReferralInEmergencyStack.navigationOptions = ({ navigation }) => {
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

export default ReferralInEmergencyStack;