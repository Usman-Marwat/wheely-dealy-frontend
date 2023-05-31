import {
	FlatList,
	RefreshControl,
	Modal,
	StyleSheet,
	View,
} from 'react-native';
import React, { useState } from 'react';

import PostDetails from './PostDetails';
import Screen from './Screen';
import UserPost from './UserPost';
import CloseButton from './CloseButton';
import WholeScreenModal from './WholeScreenModal';

const Posts = ({
	posts,
	onLike,
	onShare,
	onComment,
	onRefresh,
	onDetails,
	saveAble,
	onSave,
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
				<FlatList
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ padding: 10 }}
					data={posts}
					keyExtractor={(item) => item.alternateKey}
					refreshControl={<RefreshControl onRefresh={onRefresh} />}
					renderItem={({ item }) => {
						return (
							<UserPost
								post={item}
								onSelected={(post) => handlePostDetails(post)}
								onLike={onLike}
								onShare={onShare}
								saveAble
								onSave={onSave}
							/>
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
					<PostDetails
						post={selected}
						onComment={(postId, text) => {
							onComment(postId, text);
							setVisible(false);
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
