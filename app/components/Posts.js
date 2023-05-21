import { StyleSheet, FlatList } from 'react-native';
import React from 'react';

import UserPost from './UserPost';
import Screen from './Screen';
import { useState } from 'react';

const Posts = ({ posts, onLike }) => {
	const [selected, setSelected] = useState(null);

	const handlePostDetails = (post) => {
		if (selected?.alternateKey === post.alternateKey) return setSelected(null);
		setSelected(post);
	};

	return (
		<Screen>
			<FlatList
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ padding: 10 }}
				data={posts}
				keyExtractor={(item) => item.alternateKey}
				renderItem={({ item }) => {
					return (
						<UserPost
							post={item}
							selected={selected}
							onSelected={(post) => handlePostDetails(post)}
							onLike={onLike}
						/>
					);
				}}
			/>
		</Screen>
	);
};

export default Posts;

const styles = StyleSheet.create({});
