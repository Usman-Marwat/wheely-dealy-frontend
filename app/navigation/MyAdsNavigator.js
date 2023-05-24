import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import AdsEditScreen from '../screens/AdsEditScreen';
import MyAdsListScreen from '../screens/MyAdsListScreen';
import AdsListDetailsScreen from '../screens/AdsListDetailsScreen';
import { options } from './navigationOptions';
import routes from './routes';
import BidsListScreen from '../screens/BidsListScreen';

const Stack = createSharedElementStackNavigator();

const MyAdsNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="MyAdsList" component={MyAdsListScreen} />
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
					];
				}}
				options={options}
			/>
			<Stack.Screen name={routes.ADS_EDIT} component={AdsEditScreen} />
			<Stack.Screen name={routes.BIDS_LIST} component={BidsListScreen} />
		</Stack.Navigator>
	);
};

export default MyAdsNavigator;
