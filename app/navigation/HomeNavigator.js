import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import AdsListDetailsScreen from '../screens/AdsListDetailsScreen';
import HomeDashboardScreen from '../screens/HomeDashboardScreen';
import BidsListScreen from '../screens/BidsListScreen';
import { options } from './navigationOptions';
import routes from './routes';

const Stack = createSharedElementStackNavigator();

const HomeNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="AdsList" component={HomeDashboardScreen} />
			<Stack.Screen
				name={routes.ADS_LIST_DETAIL}
				component={AdsListDetailsScreen}
				sharedElements={(route) => {
					const { item } = route.params;
					return [
						{ id: `item.${item.key}.modal` },
						{ id: `item.${item.key}.image` },
						{ id: `item.${item.key}.description` },
						{ id: `item.${item.key}.price` },
						{ id: `item.${item.key}.team` },
					];
				}}
				options={options}
			/>
			<Stack.Screen name={routes.BIDS_LIST} component={BidsListScreen} />
		</Stack.Navigator>
	);
};

export default HomeNavigator;