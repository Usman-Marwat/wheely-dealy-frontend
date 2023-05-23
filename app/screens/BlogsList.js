import { Button, View } from 'react-native';

import MenuFoldButton from '../navigation/MenuFoldButton';
import routes from '../navigation/routes';

const BlogsList = ({ navigation }) => {
	return (
		<>
			<MenuFoldButton />
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					paddingHorizontal: 40,
				}}
			>
				<Button
					title="Write blog"
					onPress={() => navigation.navigate(routes.BLOG_EDIT)}
				/>
				<Button
					title="Create Post"
					onPress={() => navigation.navigate(routes.POST_EDIT)}
				/>
			</View>
		</>
	);
};

export default BlogsList;
