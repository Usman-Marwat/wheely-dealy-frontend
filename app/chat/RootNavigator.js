import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './BottomTabNavigator';
import ChannelScreen from './ChannelScreen';

const Stack = createStackNavigator();

export default function RootNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Root" component={BottomTabNavigator} />
			<Stack.Screen name="Channel" component={ChannelScreen} />
		</Stack.Navigator>
	);
}
