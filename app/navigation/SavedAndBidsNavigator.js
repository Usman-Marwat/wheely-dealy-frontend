import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';

import MyAdsNavigator from './MyAdsNavigator';
import MyPostsNavigator from './MyPostsNavigator';
import MyServicesNavigator from './MyServicesNavigator';
import SavedItemsNavigator from './SavedItemsNavigator';
import MyBidsNavigator from './MyBidsNavigator';

const Tab = createBottomTabNavigator();
export default function SavedAndBidsNavigator() {
	return (
		<Tab.Navigator screenOptions={{ headerShown: false }}>
			<Tab.Screen
				name="Saved"
				component={SavedItemsNavigator}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="bookmark" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="My Bids"
				component={MyBidsNavigator}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="cash-outline" color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	);
}
