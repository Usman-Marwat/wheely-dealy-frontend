import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import ChannelListScreen from './ChannelListScreen';
import UsersScreen from './UsersScreen';

const Tab = createBottomTabNavigator();
export default function BottomTabNavigator() {
	return (
		<Tab.Navigator screenOptions={{ headerShown: false }}>
			<Tab.Screen
				name="list"
				component={ChannelListScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="list-circle-outline" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="users"
				component={UsersScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name="explore" color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	);
}
