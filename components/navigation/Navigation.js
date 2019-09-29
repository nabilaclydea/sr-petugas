import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {AuthScreen, LoginScreen} from "../screen";
import {BottomTab} from "./tab";

const Navigation = createSwitchNavigator(
    {
        Auth: {
            screen: AuthScreen,
        },
        Main: {
            screen: BottomTab,
        },
    }
);

export default createAppContainer(Navigation);