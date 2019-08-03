import {createStackNavigator} from 'react-navigation';
import {
    HomeScreen,
    LoginScreen,
    ReferralCreatePatientDataScreen,
    ReferralCreateScheduleDestinationScreen,
    ReferralCreateReferralDataScreen,
    ReferralCreateICD10Screen,
    ReferralCreateICD9Screen,
    ReferralCreateFinish
} from '../../screen';

const HomeStack = createStackNavigator(
    {
        HomeScreen: {
            screen: HomeScreen,
        },
        LoginScreen: {
            screen: LoginScreen,
            navigationOptions: {
                header: null,
            }
        },
        ReferralCreatePatientDataScreen: {
            screen: ReferralCreatePatientDataScreen,
        },
        ReferralCreateScheduleDestinationScreen: {
            screen: ReferralCreateScheduleDestinationScreen,
        },
        ReferralCreateReferralDataScreen: {
            screen: ReferralCreateReferralDataScreen,
        },
        ReferralCreateICD10Screen: {
            screen: ReferralCreateICD10Screen,
        },
        ReferralCreateICD9Screen: {
            screen: ReferralCreateICD9Screen,
        },
        ReferralCreateFinish: {
            screen: ReferralCreateFinish,
        }
    },
);

HomeStack.navigationOptions = ({navigation}) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0 || navigation.state.routes[0].routeName === "LoginScreen") {
        tabBarVisible = false;
    }

    return {
        tabBarVisible,
    };
};

export default HomeStack;