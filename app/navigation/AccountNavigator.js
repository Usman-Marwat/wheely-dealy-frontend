import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AccountScreen from '../screens/AccountScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TodosScreen from '../screens/TodosScreen';
import routes from './routes';
import PostsListScreen from '../screens/PostsListScreen';
import PostEditScreen from '../screens/PostEditScreen';

const Stack = createStackNavigator();

const AccountNavigator = () => (
	<Stack.Navigator screenOptions={{ headerShown: false }}>
		<Stack.Screen name={routes.ACCOUNT} component={AccountScreen} />
		<Stack.Screen name={routes.PROFILE} component={ProfileScreen} />
		<Stack.Screen name={routes.TODOS} component={TodosScreen} />
		<Stack.Screen name={'PostList'} component={PostsListScreen} />
		<Stack.Screen name={routes.POST_EDIT} component={PostEditScreen} />
	</Stack.Navigator>
);

export default AccountNavigator;
