import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import AdsListDetailsScreen from '../screens/AdsListDetailsScreen';
import BidsListScreen from '../screens/BidsListScreen';
import ExploreDashboardScreen from '../screens/ExploreDashboardScreen';
import { options } from './navigationOptions';
import routes from './routes';
import UserDetailsScreen from '../screens/UserDetailsScreen';
import ServiceDetails from '../screens/ServiceDetails';
import ChannelScreen from '../chat/ChannelScreen';

const Stack = createSharedElementStackNavigator();

const ExploreNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: true }}>
			<Stack.Screen
				name="Explore Dashboard"
				component={ExploreDashboardScreen}
				options={{ headerShown: false }}
			/>
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
			<Stack.Screen
				name={routes.USER_DETAILS}
				component={UserDetailsScreen}
				sharedElements={(route) => {
					const { item } = route.params;
					return [
						{ id: `item.${item.key}.bg` },
						{ id: `item.${item._id}.bg` },
						{ id: `item.${item.key}.name`, animation: 'fade' },
						{ id: `item.${item._id}.name`, animation: 'fade' },
						{ id: `item.${item.key}.image` },
						{ id: `item.${item._id}.image` },
						{ id: 'general.bg' },
					];
				}}
				options={options}
			/>
			<Stack.Screen name={routes.BIDS_LIST} component={BidsListScreen} />
			<Stack.Screen name={routes.SERVICE_DETAIL} component={ServiceDetails} />
			<Stack.Screen name="Channel" component={ChannelScreen} />
		</Stack.Navigator>
	);
};

export default ExploreNavigator;
