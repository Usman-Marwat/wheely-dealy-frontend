import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import AllQuestionsListScreen from '../screens/AllQuestionsListScreen';

const Stack = createSharedElementStackNavigator();

const AllQuestionsNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name="AllQuestionsList"
				component={AllQuestionsListScreen}
			/>
		</Stack.Navigator>
	);
};

export default AllQuestionsNavigator;
