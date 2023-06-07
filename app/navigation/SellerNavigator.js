import { Dimensions, Animated } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import ActivityIndicator from '../components/ActivityIndicator';
import AccountNavigator from './AccountNavigator';
import HomeNavigator from './HomeNavigator';
import CustomDrawer from './CustomDrawer';
import DrawerAnimationContext from '../contexts/drawerAnimationContext';
import navigationTheme from './navigationTheme';
import RootNavigator from '../chat/RootNavigator';
import useNotifications from '../hooks/useNotifications';
import MyAdsNavigator from './MyAdsNavigator';
import ExploreNavigator from './ExploreNavigator';
import MyServicesNavigator from './MyServicesNavigator';
import MyPostsNavigator from './MyPostsNavigator';
import MyQuestionsNavigator from './MyQuestionsNavigator';
import DealsListScreen from '../screens/DealsListScreen';
import AllQuestionsNavigator from './AllQuestionsNavigator';
import HomeExploreNavigator from './HomeExploreNavigator';
import MyContentNavigator from './MyContentNavigator';
import QuestionsNavigator from './QuestionsNavigator';
import CustomDrawerContent from './CustomDrawerContent';
import LandingScreen from '../screens/LandingScreen';

const DrawerNavigator = createDrawerNavigator();
const { width, height } = Dimensions.get('screen');
const screenOptions = {
	headerShown: false,
	// drawerStyle: {
	// 	backgroundColor: 'transparent',
	// 	width: 0,
	// },
	// drawerType: 'permanent',
	// overlayColor: 'transparent',
};
const CustomerNavigator = () => {
	const [fromCords] = useState({ x: 0, y: height });
	const [toCords] = useState({ x: width, y: 0 });
	const animatedValue = useRef(new Animated.ValueXY(fromCords)).current;
	const { loading } = useNotifications();
	const [showLAnding, setShowLanding] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowLanding(false);
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	if (showLAnding) return <LandingScreen />;

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
							name="My Content"
							component={MyContentNavigator}
						/>
						<DrawerNavigator.Screen
							name="Questions"
							component={QuestionsNavigator}
						/>

						<DrawerNavigator.Screen
							name="Claimed Deals"
							component={DealsListScreen}
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
