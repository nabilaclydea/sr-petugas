import {createStackNavigator} from 'react-navigation';
import {ReferralInPoliScreen, ReferralDetailScreen} from '../../screen';

const ReferralInPoliStack = createStackNavigator(
    {
        ReferralInPoliScreen: {
            screen: ReferralInPoliScreen,
        },
        ReferralDetailScreen: {
            screen: ReferralDetailScreen,
        },
    },
);

ReferralInPoliStack.navigationOptions = ({ navigation }) => {
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

export default ReferralInPoliStack;