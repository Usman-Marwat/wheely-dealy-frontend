import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import RootNavigator from '../chat/RootNavigator';
import ActivityIndicator from '../components/ActivityIndicator';
import DrawerAnimationContext from '../contexts/drawerAnimationContext';
import useNotifications from '../hooks/useNotifications';
import LandingScreen from '../screens/LandingScreen';
import AccountNavigator from './AccountNavigator';
import ClaimedDealsNavigator from './ClaimedDealsNavigator';
import CustomDrawerContent from './CustomDrawerContent';
import HomeExploreNavigator from './HomeExploreNavigator';
import MyContentNavigator from './MyContentNavigator';
import QuestionsNavigator from './QuestionsNavigator';
import navigationTheme from './navigationTheme';

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
						drawerIcon={({ focused, color, size }) => (
							<Ionicons
								name={focused ? 'settings' : 'settings-outline'}
								size={size}
								color={color}
							/>
						)}
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
							component={ClaimedDealsNavigator}
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
