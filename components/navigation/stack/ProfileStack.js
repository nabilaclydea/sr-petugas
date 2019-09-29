import {createStackNavigator} from 'react-navigation';
import {ProfileScreen, ProfileEditScreen} from '../../screen'

const ProfileStack = createStackNavigator(
    {
        ProfileScreen: {
            screen: ProfileScreen,
        },
        ProfileEditScreen: {
            screen: ProfileEditScreen,
        },
    },
);

ProfileStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible,
    };
};

export default ProfileStack;