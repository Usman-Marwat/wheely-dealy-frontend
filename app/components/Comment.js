import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Comment = ({ username, content }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.username}>{username}</Text>
			<Text style={styles.content}>{content}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#f2f2f2',
		padding: 8,
		marginBottom: 8,
		borderRadius: 8,
	},
	username: {
		fontSize: 14,
		fontWeight: 'bold',
		marginBottom: 4,
	},
	content: {
		fontSize: 12,
	},
});

export default Comment;
