import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import VehicleDealsScreen from '../screens/VehicleDealsScreen';
import ServiceDealsScreen from '../screens/ServiceDealsScreen';

const Tab = createBottomTabNavigator();
export default function ClaimedDealsNavigator() {
	return (
		<Tab.Navigator screenOptions={{ headerShown: false }}>
			<Tab.Screen
				name="Vehicles"
				component={VehicleDealsScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<AntDesign name="car" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="Services"
				component={ServiceDealsScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name="design-services" color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	);
}
