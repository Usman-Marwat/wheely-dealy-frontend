import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import ExploreNavigator from './ExploreNavigator';
import HomeNavigator from './HomeNavigator';

const Tab = createBottomTabNavigator();
export default function HomeExploreNavigator() {
	return (
		<Tab.Navigator screenOptions={{ headerShown: false }}>
			<Tab.Screen
				name="Explore"
				component={ExploreNavigator}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name="explore" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="Home"
				component={HomeNavigator}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="home" color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	);
}
