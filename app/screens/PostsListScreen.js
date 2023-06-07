import { useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { useState } from 'react';
import * as Yup from 'yup';

import userAdsApi from '../api/ad';
import dashboard from '../api/dashboard';
import postApi from '../api/post';
import useAuth from '../auth/useAuth';
import ActivityIndicator from '../components/ActivityIndicator';
import NewItemButton from '../components/NewItemButton';
import Posts from '../components/Posts';
import useApi from '../hooks/useApi';
import BackButton from '../navigation/BackButton';
import MenuFoldButton from '../navigation/MenuFoldButton';
import routes from '../navigation/routes';
import { AppForm, AppFormField, SubmitButton } from '../components/forms';
import FormImagePicker from '../components/forms/FormImagePicker';
import AppModal from '../components/AppModal';
import general from '../api/general';

const validationSchema = Yup.object().shape({
	text: Yup.string().required().min(1).label('Text'),
	images: Yup.array().min(1, 'Please select atleast 1 image'),
});

const PostsListScreen = ({ navigation }) => {
	const [editVisible, setEditVisible] = useState(false);
	const [post, setPost] = useState(false);
	const { user } = useAuth();

	const profileViewApi = useApi(dashboard.getProfileView);
	const postLikeApi = useApi(userAdsApi.likePost);
	const postCommentApi = useApi(userAdsApi.commentOnPost);
	const singlePostApi = useApi(userAdsApi.getPostById);
	const postUpdateApi = useApi(postApi.updatePost);
	const postDeleteApi = useApi(general.deleteOrMarkSold);

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
	const handleEdit = async (formData) => {
		const { data } = await postUpdateApi.request({
			text: formData.text,
			postId: post.alternateKey,
		});
		if (data.statusCode === 200) return getPosts();

		alert('Could not update the post');
	};

	const deletePost = async (postId) => {
		const { data } = await postDeleteApi.request(postId, 1);

		if (data.statusCode === 200) return getPosts();

		alert('Could not delete the posts');
	};

	const handleDelete = (postId) => {
		Alert.alert('Delete', 'Are you sure?', [
			{ text: 'Yes', onPress: () => deletePost(postId), style: 'destructive' },
			{ text: 'No' },
		]);
	};

	return (
		<>
			<ActivityIndicator
				visible={
					postLikeApi.loading ||
					postCommentApi.loading ||
					singlePostApi.loading ||
					profileViewApi.loading ||
					postUpdateApi.loading ||
					postDeleteApi.loading
				}
			/>
			<BackButton />
			<MenuFoldButton />
			<Posts
				posts={profileViewApi.data?.posts}
				onLike={(postId) => handlePostLike(postId)}
				onShare={(postId) => {
					alert('The is yours');
				}}
				onComment={(postId, text) => handlePostComment(postId, text)}
				onRefresh={getPosts}
				onDetails={handlePostDetails}
				updateAble
				deleteAble
				onEdit={(post) => {
					setEditVisible(true);
					setPost(post);
				}}
				onDelete={handleDelete}
				loading={postCommentApi.loading}
			/>
			{user.account_type === 'Seller' && (
				<View style={styles.plusButton}>
					<NewItemButton
						onPress={() => navigation.navigate(routes.POST_EDIT)}
					/>
				</View>
			)}

			<AppModal
				heading="Edit Post"
				visible={editVisible}
				onVisible={() => setEditVisible(false)}
			>
				<AppForm
					initialValues={{
						text: post.text,
						images: [],
					}}
					onSubmit={(formData) => {
						setEditVisible(false);
						handleEdit(formData);
					}}
					validationSchema={validationSchema}
				>
					<FormImagePicker name="images" />
					<AppFormField
						icon="card-text"
						name="text"
						placeholder="Text"
						multiline
					/>
					<SubmitButton title="Update" />
				</AppForm>
			</AppModal>
		</>
	);
};

export default PostsListScreen;

const styles = StyleSheet.create({
	plusButton: {
		position: 'absolute',
		bottom: 20,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
	},
});
