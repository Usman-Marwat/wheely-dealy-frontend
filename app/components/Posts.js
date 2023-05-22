import { FlatList, RefreshControl, Modal, Button, View } from 'react-native';
import React, { useState } from 'react';

import PostDetails from './PostDetails';
import Screen from './Screen';
import UserPost from './UserPost';

const Posts = ({ posts, onLike, onShare, onComment, onRefresh, onDetails }) => {
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
							/>
						);
					}}
				/>
			</Screen>
			{selected && (
				<Modal visible={visible} animationType="slide">
					<View style={{ padding: 20 }}>
						<Button
							title="close"
							onPress={() => {
								setSelected(null);
								setVisible(false);
							}}
						/>
						<PostDetails
							post={selected}
							onComment={(postId, text) => {
								onComment(postId, text);
								setVisible(false);
							}}
						/>
					</View>
				</Modal>
			)}
		</>
	);
};

export default Posts;
