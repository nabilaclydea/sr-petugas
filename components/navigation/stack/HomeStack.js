import {createStackNavigator} from 'react-navigation';
import {
    HomeScreen,
    LoginScreen,
    ForgetPasswordScreen,
    CodePasswordScreen,
    ResetPasswordScreen,
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
        ForgetPasswordScreen: {
            screen: ForgetPasswordScreen,
            navigationOptions: {
                header: null,
            }
        },
        CodePasswordScreen: {
            screen: CodePasswordScreen,
            navigationOptions: {
                header: null,
            }
        },
        ResetPasswordScreen: {
            screen: ResetPasswordScreen,
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
    let routeName = navigation.state.routes[0].routeName;
    let exception = routeName === "LoginScreen" || routeName === "ForgetPasswordScreen" || 
        routeName === "CodePasswordScreen" || routeName === "ResetPasswordScreen";

    if (navigation.state.index > 0 || exception) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible,
    };
};

export default HomeStack;