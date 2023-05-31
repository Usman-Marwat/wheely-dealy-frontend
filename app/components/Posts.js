import {
	FlatList,
	RefreshControl,
	Image,
	StyleSheet,
	View,
} from 'react-native';
import React, { useState } from 'react';

import PostDetails from './PostDetails';
import Screen from './Screen';
import UserPost from './UserPost';
import WholeScreenModal from './WholeScreenModal';
import BackgroundImage from './BackgroundImage';
import ActivityIndicator from './ActivityIndicator';

const BG_IMG =
	'https://images.unsplash.com/photo-1506671753197-8d137cc5d53c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjAzfHxjYXJzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60';

const Posts = ({
	posts,
	onLike,
	onShare,
	onComment,
	onRefresh,
	onDetails,
	saveAble,
	updateAble,
	onSave,
	onEdit,
	deleteAble,
	onDelete,
	loading,
}) => {
	const [selected, setSelected] = useState(null);
	const [visible, setVisible] = useState(false);

	const handlePostDetails = (post) => {
		// if (selected?.alternateKey === post.alternateKey) return setSelected(null);
		onDetails(post.alternateKey, (newPost) => {
			setSelected(newPost);
			setVisible(true);
		});
	};

	return (
		<>
			<Screen>
				<BackgroundImage uri={BG_IMG} />
				<FlatList
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{
						paddingHorizontal: 20,
						paddingVertical: 70,
					}}
					data={posts}
					keyExtractor={(item) => item.alternateKey}
					refreshControl={<RefreshControl onRefresh={onRefresh} />}
					renderItem={({ item }) => {
						return (
							<View style={{ marginVertical: 10 }}>
								<UserPost
									post={item}
									onSelected={(post) => handlePostDetails(post)}
									onLike={onLike}
									onShare={onShare}
									saveAble={saveAble}
									updateAble={updateAble}
									onSave={onSave}
									onEdit={onEdit}
									deleteAble={deleteAble}
									onDelete={onDelete}
								/>
							</View>
						);
					}}
				/>
			</Screen>
			{selected && (
				<WholeScreenModal
					onClose={() => {
						setSelected(null);
						setVisible(false);
					}}
					visible={visible}
				>
					<ActivityIndicator visible={loading} />
					<PostDetails
						post={selected}
						onComment={async (post, text) => {
							await onComment(post.alternateKey, text);
							handlePostDetails(post);
							// setVisible(false);
						}}
					/>
				</WholeScreenModal>
			)}
		</>
	);
};

export default Posts;

const styles = StyleSheet.create({
	closeButton: {
		marginBottom: 30,
		flexDirection: 'row',
		justifyContent: 'center',
	},
});
