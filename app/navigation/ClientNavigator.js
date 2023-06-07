import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useRef, useState } from 'react';
import { Animated, Dimensions } from 'react-native';

import useAuth from '../auth/useAuth';
import RootNavigator from '../chat/RootNavigator';
import ActivityIndicator from '../components/ActivityIndicator';
import DrawerAnimationContext from '../contexts/drawerAnimationContext';
import useNotifications from '../hooks/useNotifications';
import AccountNavigator from './AccountNavigator';
import CustomDrawerContent from './CustomDrawerContent';
import HomeExploreNavigator from './HomeExploreNavigator';
import QuestionsNavigator from './QuestionsNavigator';
import SavedAndBidsNavigator from './SavedAndBidsNavigator';
import navigationTheme from './navigationTheme';

const DrawerNavigator = createDrawerNavigator();
const { width, height } = Dimensions.get('screen');
const screenOptions = {
	headerShown: false,
};
const CustomerNavigator = () => {
	const [fromCords] = useState({ x: 0, y: height });
	const [toCords] = useState({ x: width, y: 0 });
	const animatedValue = useRef(new Animated.ValueXY(fromCords)).current;
	const { loading } = useNotifications();

	return (
		<>
			<ActivityIndicator visible={loading} />
			<DrawerAnimationContext.Provider
				value={{ fromCords, toCords, animatedValue }}
			>
				<NavigationContainer theme={navigationTheme}>
					<DrawerNavigator.Navigator
						screenOptions={screenOptions}
						drawerContent={CustomDrawerContent}
					>
						<DrawerNavigator.Screen
							name="Dashboard"
							component={HomeExploreNavigator}
						/>
						<DrawerNavigator.Screen
							name="Saved & Bids"
							component={SavedAndBidsNavigator}
						/>

						<DrawerNavigator.Screen
							name="Questions"
							component={QuestionsNavigator}
						/>
						<DrawerNavigator.Screen name="Chat" component={RootNavigator} />
						<DrawerNavigator.Screen
							name="Account"
							component={AccountNavigator}
						/>
					</DrawerNavigator.Navigator>
				</NavigationContainer>
			</DrawerAnimationContext.Provider>
		</>
	);
};

export default CustomerNavigator;
