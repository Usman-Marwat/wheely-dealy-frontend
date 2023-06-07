import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AllQuestionsNavigator from './AllQuestionsNavigator';
import MyQuestionsNavigator from './MyQuestionsNavigator';

const Tab = createBottomTabNavigator();
export default function QuestionsNavigator() {
	return (
		<Tab.Navigator screenOptions={{ headerShown: false }}>
			<Tab.Screen
				name="My"
				component={MyQuestionsNavigator}
				options={{
					tabBarIcon: ({ color, size }) => (
						<AntDesign name="questioncircle" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="All"
				component={AllQuestionsNavigator}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name="message-question"
							color={color}
							size={size}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
}
