import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import MyQuestionsListScreen from '../screens/MyQuestionsListScreen';

const Stack = createSharedElementStackNavigator();

const MyQuestionsNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="MyQuestionsList" component={MyQuestionsListScreen} />
		</Stack.Navigator>
	);
};

export default MyQuestionsNavigator;
