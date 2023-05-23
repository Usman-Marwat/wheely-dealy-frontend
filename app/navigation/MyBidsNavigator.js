import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import AdsListDetailsScreen from '../screens/AdsListDetailsScreen';
import MyBidsListScreen from '../screens/MyBidsListScreen';
import { options } from './navigationOptions';
import routes from './routes';

const Stack = createSharedElementStackNavigator();

const MyBidsNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="MyBidsList" component={MyBidsListScreen} />
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
		</Stack.Navigator>
	);
};

export default MyBidsNavigator;
