import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import MyServicesListScreen from '../screens/MyServicesListScreen';
import ServicesEditScreen from '../screens/ServicesEditScreen';
import routes from './routes';
import ServiceDetails from '../screens/ServiceDetails';

const Stack = createSharedElementStackNavigator();

const MyServicesNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="MyServicesList" component={MyServicesListScreen} />
			<Stack.Screen
				name={routes.SERVICE_EDIT}
				component={ServicesEditScreen}
				options={{ headerShown: true }}
			/>
			<Stack.Screen name={routes.SERVICE_DETAIL} component={ServiceDetails} />
		</Stack.Navigator>
	);
};

export default MyServicesNavigator;
