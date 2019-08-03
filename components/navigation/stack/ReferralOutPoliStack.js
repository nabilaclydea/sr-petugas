import {createStackNavigator} from 'react-navigation';
import {ReferralOutPoliScreen, ReferralDetailScreen} from '../../screen';
import ProfileStack from "./ProfileStack";

const ReferralOutPoliStack = createStackNavigator(
    {
        ReferralOutPoliScreen: {
            screen: ReferralOutPoliScreen,
        },
        ReferralDetailScreen: {
            screen: ReferralDetailScreen,
        }
    },
);

ReferralOutPoliStack.navigationOptions = ({ navigation }) => {
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

export default ReferralOutPoliStack;