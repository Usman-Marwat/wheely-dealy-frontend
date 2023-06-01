import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import ChannelScreen from '../chat/ChannelScreen';
import AdsEditScreen from '../screens/AdsEditScreen';
import AdsListDetailsScreen from '../screens/AdsListDetailsScreen';
import BidsListScreen from '../screens/BidsListScreen';
import MyAdsListScreen from '../screens/MyAdsListScreen';
import { options } from './navigationOptions';
import routes from './routes';

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
			<Stack.Screen name="Channel" component={ChannelScreen} />
		</Stack.Navigator>
	);
};

export default MyAdsNavigator;
