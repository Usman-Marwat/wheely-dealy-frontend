import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';

const UserPost = ({ post, onSelected, onLike, onShare, saveAble, onSave }) => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={styles.iconContainer}>
					{/* Placeholder Icon */}
					<Text style={styles.icon}>👤</Text>
				</View>
				<Text style={styles.username}>{post.user.name}</Text>
				<Text style={styles.date}>
					{new Date(post.postedDateTime).toDateString()}
				</Text>
				{saveAble && (
					<TouchableOpacity
						style={{ marginLeft: 17 }}
						onPress={() => onSave(post.alternateKey)}
					>
						<FontAwesome
							name={post.savedByCurrentUser ? 'bookmark' : 'bookmark-o'}
							size={20}
						/>
					</TouchableOpacity>
				)}
			</View>

			<Text style={styles.content}>{post.text}</Text>

			<View style={styles.actionsContainer}>
				<TouchableOpacity
					style={styles.action}
					onPress={() => onLike(post.alternateKey)}
				>
					<AntDesign
						name={post.likedByCurrentuser ? 'like1' : 'like2'}
						size={20}
						color="#888"
					/>
					<Text style={styles.actionText}>{post.likeCount}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.action}
					onPress={() => onSelected(post)}
				>
					<Ionicons name="md-chatbubble-outline" size={20} color="#888" />
					<Text style={styles.actionText}>{post.commentCount}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.action}
					onPress={() => onShare(post.alternateKey)}
				>
					<Ionicons name="share-outline" size={20} color="#888" />
					<Text style={styles.actionText}>{post.shareCount}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		padding: 16,
		marginBottom: 8,
		borderRadius: 8,
		elevation: 2,
		borderWidth: 0.3,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 8,
	},
	iconContainer: {
		marginRight: 8,
	},
	icon: {
		fontSize: 16,
	},
	username: {
		fontSize: 16,
		fontWeight: 'bold',
		marginRight: 4,
	},
	date: {
		fontSize: 12,
		color: '#888',
	},
	content: {
		fontSize: 14,
		marginBottom: 8,
	},
	actionsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	action: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	actionText: {
		marginLeft: 4,
		fontSize: 12,
		color: '#888',
	},
	commentForm: {
		alignItems: 'center',
		paddingTop: 17,
	},
});

export default UserPost;
