import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import AdsEditScreen from '../screens/AdsEditScreen';
import routes from './routes';

const Stack = createSharedElementStackNavigator();

const PostAdNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name={routes.ADS_EDIT} component={AdsEditScreen} />
		</Stack.Navigator>
	);
};

export default PostAdNavigator;
