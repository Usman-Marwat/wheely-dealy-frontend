import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useRef, useState } from 'react';
import { Animated, Dimensions } from 'react-native';

import RootNavigator from '../chat/RootNavigator';
import ActivityIndicator from '../components/ActivityIndicator';
import DrawerAnimationContext from '../contexts/drawerAnimationContext';
import useNotifications from '../hooks/useNotifications';
import AccountNavigator from './AccountNavigator';
import CustomDrawer from './CustomDrawer';
import ExploreNavigator from './ExploreNavigator';
import HomeNavigator from './HomeNavigator';
import navigationTheme from './navigationTheme';
import MyBidsNavigator from './MyBidsNavigator';
import SavedItemsNavigator from './SavedItemsNavigator';
import MyQuestionsNavigator from './MyQuestionsNavigator';
import AllQuestionsNavigator from './AllQuestionsNavigator';

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
						<DrawerNavigator.Screen
							name="Explore"
							component={ExploreNavigator}
						/>
						<DrawerNavigator.Screen name="Home" component={HomeNavigator} />
						<DrawerNavigator.Screen
							name="Saved"
							component={SavedItemsNavigator}
						/>
						<DrawerNavigator.Screen name="Bids" component={MyBidsNavigator} />

						<DrawerNavigator.Screen
							name="My Questions"
							component={MyQuestionsNavigator}
						/>
						<DrawerNavigator.Screen
							name="All Questions"
							component={AllQuestionsNavigator}
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
