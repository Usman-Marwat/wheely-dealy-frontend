import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import LoginScreen from '../screens/LoginScreen';
import navigationTheme from './navigationTheme';
import { options } from './navigationOptions';
import RegisterScreen from '../screens/RegisterScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import VisitorNavigator from './VisitorNavigator';
import routes from './routes';
import LandingScreen from '../screens/LandingScreen';

const Stack = createSharedElementStackNavigator();

const AuthNavigator = () => {
	const [showLAnding, setShowLanding] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowLanding(false);
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	if (showLAnding) return <LandingScreen />;
	return (
		<NavigationContainer theme={navigationTheme}>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Welcome" component={WelcomeScreen} />
				<Stack.Screen
					name="Register"
					component={RegisterScreen}
					sharedElements={(route) => {
						const { item } = route.params;
						return [
							{ id: `item.${item.key}.image`, animation: 'fade' },
							{ id: `item.${item.key}.actor`, animation: 'fade-out' },
							{ id: 'actor_title' },
						];
					}}
					options={options}
				/>
				<Stack.Screen
					name="Login"
					component={LoginScreen}
					sharedElements={(route) => {
						const { item } = route.params;
						return [{ id: `item.${item.key}.image` }];
					}}
					options={options}
				/>
				<Stack.Screen
					name={routes.VISITOR_DASHBOARD}
					component={VisitorNavigator}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AuthNavigator;
