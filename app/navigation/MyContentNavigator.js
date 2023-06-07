import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';

import MyAdsNavigator from './MyAdsNavigator';
import MyPostsNavigator from './MyPostsNavigator';
import MyServicesNavigator from './MyServicesNavigator';

const Tab = createBottomTabNavigator();
export default function MyContentNavigator() {
	return (
		<Tab.Navigator screenOptions={{ headerShown: false }}>
			<Tab.Screen
				name="Vehicles"
				component={MyAdsNavigator}
				options={{
					tabBarIcon: ({ color, size }) => (
						<AntDesign name="car" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="Services"
				component={MyServicesNavigator}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name="design-services" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="Posts"
				component={MyPostsNavigator}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name="post-add" color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	);
}
