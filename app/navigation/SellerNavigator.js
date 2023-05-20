import { Dimensions, Animated } from 'react-native';
import React, { useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import ActivityIndicator from '../components/ActivityIndicator';
import AccountNavigator from './AccountNavigator';
import HomeNavigator from './HomeNavigator';
import CustomDrawer from './CustomDrawer';
// import DealersListNavigator from './DealersListNavigator';
import DrawerAnimationContext from '../contexts/drawerAnimationContext';
import navigationTheme from './navigationTheme';
import RootNavigator from '../chat/RootNavigator';
// import ReceivedContractNavigator from './ReceivedNavigator';
import useNotifications from '../hooks/useNotifications';
import BlogsNavigator from './BlogsNavigator';
import ReceivedNavigator from './ReceivedNavigator';
import MyAdsNavigator from './MyAdsNavigator';
import ExploreNavigator from './ExploreNavigator';

const DrawerNavigator = createDrawerNavigator();
const { width, height } = Dimensions.get('screen');
const screenOptions = {
	headerShown: false,
	drawerStyle: {
		backgroundColor: 'transparent',
		width: 0,
	},
	drawerType: 'permanent',
	overlayColor: 'transparent',
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
						drawerContent={(props) => {
							return (
								<CustomDrawer
									navigation={props.navigation}
									routes={props.state.routeNames}
									selectedRoute={props.state.routeNames[props.state.index]}
								/>
							);
						}}
					>
						<DrawerNavigator.Screen name="Home" component={HomeNavigator} />
						<DrawerNavigator.Screen
							name="Explore"
							component={ExploreNavigator}
						/>

						<DrawerNavigator.Screen name="My Ads" component={MyAdsNavigator} />
						{/* <DrawerNavigator.Screen
							name="Dealers"
							component={DealersListNavigator}
						/> */}
						<DrawerNavigator.Screen
							name="Received"
							component={ReceivedNavigator}
						/>
						<DrawerNavigator.Screen
							name="Blogs & Posts"
							component={BlogsNavigator}
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
