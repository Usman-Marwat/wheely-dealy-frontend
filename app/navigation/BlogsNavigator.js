import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import BlogEditScreen from '../screens/BlogEditScreen';
import BlogsList from '../screens/BlogsList';
import PostEditScreen from '../screens/PostEditScreen';
import routes from './routes';

const Stack = createSharedElementStackNavigator();

const BlogsNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name={routes.BLOG_LIST} component={BlogsList} />
			<Stack.Screen name={routes.BLOG_EDIT} component={BlogEditScreen} />
			<Stack.Screen name={routes.POST_EDIT} component={PostEditScreen} />
		</Stack.Navigator>
	);
};

export default BlogsNavigator;
