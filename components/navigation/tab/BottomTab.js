import React from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import {HomeStack, ReferralInPoliStack, ReferralOutPoliStack, ProfileStack} from '../stack';
import ReferralInTab from './ReferralInTab';
import ReferralOutTab from './ReferralOutTab'
import BottomTabStyle from './BottomTabStyle';

const BottomTab = createBottomTabNavigator(
    {
        Beranda: {
            screen: HomeStack,
        },
        Masuk: {
            screen: ReferralInTab,
        },
        Keluar: {
            screen: ReferralOutTab,
        },
        Profil: {
            screen: ProfileStack,
        },
    },
    {
        order: ['Beranda', 'Masuk', 'Keluar', 'Profil'],
        tabBarComponent: props => <BottomTabStyle {...props} />,
    }
);

export default BottomTab;