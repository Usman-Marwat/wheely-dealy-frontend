import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useEffect } from 'react';

import dashboard from '../api/dashboard';
import userAdsApi from '../api/ad';
import Posts from '../components/Posts';
import Header from '../components/Header';
import useAuth from '../auth/useAuth';
import ActivityIndicator from '../components/ActivityIndicator';
import useApi from '../hooks/useApi';
import TouchableIcon from '../components/TouchableIcon';
import routes from '../navigation/routes';
import NewItemButton from '../components/NewItemButton';

const PostsListScreen = ({ navigation }) => {
	const { user } = useAuth();

	const profileViewApi = useApi(dashboard.getProfileView);
	const postLikeApi = useApi(userAdsApi.likePost);
	const postCommentApi = useApi(userAdsApi.commentOnPost);
	const singlePostApi = useApi(userAdsApi.getPostById);

	const getPosts = () => {
		profileViewApi.request(user.user_id);
	};

	useEffect(() => {
		getPosts();
	}, []);

	const handlePostLike = async (postId) => {
		const result = await postLikeApi.request(postId);
		if (result.ok) getPosts();
	};

	const handlePostComment = async (postId, text) => {
		const result = await postCommentApi.request(postId, text);
		if (result.ok) getPosts();
	};
	const handlePostDetails = async (postId, callback) => {
		const { data } = await singlePostApi.request(postId);
		if (data.statusCode === 200) {
			profileViewApi.data = {
				...profileViewApi.data,
				posts: [
					...profileViewApi.data.posts.map((p) =>
						p.alternateKey === postId ? data.obj : p
					),
				],
			};
			callback({
				...profileViewApi.data.posts.find((p) => p.alternateKey === postId),
			});
		}
	};

	return (
		<>
			<ActivityIndicator
				visible={
					postLikeApi.loading ||
					postCommentApi.loading ||
					singlePostApi.loading ||
					profileViewApi.loading
				}
			/>
			<Header />
			<Posts
				posts={profileViewApi.data?.posts}
				onLike={(postId) => handlePostLike(postId)}
				onShare={(postId) => {
					alert('The is yours');
				}}
				onComment={(postId, text) => handlePostComment(postId, text)}
				onRefresh={getPosts}
				onDetails={handlePostDetails}
				onSave={() => {
					alert('The is yours');
				}}
			/>
			{user.account_type === 'Seller' && (
				<View style={styles.plusButton}>
					<NewItemButton
						onPress={() => navigation.navigate(routes.POST_EDIT)}
					/>
				</View>
			)}
		</>
	);
};

export default PostsListScreen;

const styles = StyleSheet.create({
	plusButton: {
		position: 'absolute',
		bottom: 7,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
	},
});
