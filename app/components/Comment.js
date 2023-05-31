import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import randomAvatar from '../config/randomAvatars';
const SIZE = 30;

const Comment = ({ username, content }) => {
	return (
		<View style={styles.container}>
			<View style={styles.rowStyle}>
				<View style={styles.imageWrapper}>
					<Image source={{ uri: randomAvatar() }} style={styles.image} />
				</View>
				<Text style={styles.username}>{username}</Text>
			</View>
			<Text style={styles.content}>{content}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#A4DDED',
		padding: 8,
		marginBottom: 8,
		borderRadius: 8,
	},
	username: {
		fontSize: 14,
		fontWeight: 'bold',
		marginBottom: 4,
		marginLeft: 10,
	},
	content: {
		fontSize: 12,
	},
	image: {
		width: SIZE,
		height: SIZE,
	},
	imageWrapper: {
		backgroundColor: 'white',
		borderRadius: SIZE / 2,
		padding: 2,
	},
	rowStyle: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
	},
});

export default Comment;
