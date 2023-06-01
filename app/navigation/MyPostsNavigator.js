import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import PostEditScreen from '../screens/PostEditScreen';
import PostsListScreen from '../screens/PostsListScreen';
import routes from './routes';

const Stack = createSharedElementStackNavigator();

const MyPostsNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name={'PostList'} component={PostsListScreen} />
			<Stack.Screen name={routes.POST_EDIT} component={PostEditScreen} />
		</Stack.Navigator>
	);
};

export default MyPostsNavigator;
