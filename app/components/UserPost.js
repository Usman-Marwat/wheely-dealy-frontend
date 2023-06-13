import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import * as Animatable from 'react-native-animatable';
import randomCarImages, { shuffledImages } from '../config/randomCarImages';
import ActionButtons from './ActionButtons';
import ExpandableText from './ExpandableText';
import Carousel from './ParallaxCarousel';

const UserPost = ({
	post,
	onSelected,
	onLike,
	onShare,
	saveAble,
	onSave,
	onEdit,
	updateAble,
	deleteAble,
	onDelete,
}) => {
	const [isActionVisible, setActionsVisible] = useState(false);
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

				<TouchableOpacity
					style={styles.actionToggle}
					onPress={() => setActionsVisible(!isActionVisible)}
				>
					<MaterialIcons
						name={isActionVisible ? 'expand-less' : 'expand-more'}
						size={20}
					/>
				</TouchableOpacity>
			</View>
			{isActionVisible && (
				<Animatable.View animation="fadeInLeft" delay={10}>
					<ActionButtons
						saveAble={saveAble}
						onSave={() => onSave(post.alternateKey)}
						saved={post.savedByCurrentUser}
						deleteAble={deleteAble}
						onDelete={() => onDelete(post.alternateKey)}
						updateAble={updateAble}
						onUpdate={() => onEdit(post)}
					/>
				</Animatable.View>
			)}

			{/* <View style={styles.imageWrapper}> */}
			{/* <Image source={{ uri: randomImage }} style={styles.image} /> */}
			<Carousel images={shuffledImages()} />
			{/* </View> */}

			<ExpandableText>{post.text}</ExpandableText>

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
	actionToggle: {
		marginLeft: 55,
		borderWidth: 0.7,
		borderRadius: 8,
	},
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
		marginTop: 40,
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
	image: {
		width: '100%',
		height: 300,
	},
	imageWrapper: {
		overflow: 'hidden',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		borderBottomRightRadius: 5,
		marginVertical: 20,
	},
});

export default UserPost;
