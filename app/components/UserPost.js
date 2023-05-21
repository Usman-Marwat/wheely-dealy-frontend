import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import * as Yup from 'yup';
import * as Animatable from 'react-native-animatable';

import { AppForm, AppFormField, SubmitButton } from './forms';

const UserPost = ({ post, selected, onSelected }) => {
	const handlePayment = () => {};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={styles.iconContainer}>
					{/* Placeholder Icon */}
					<Text style={styles.icon}>👤</Text>
				</View>
				<Text style={styles.username}>{post.user.name}</Text>
				<Text style={styles.date}>date</Text>
			</View>
			<Text style={styles.content}>{post.text}</Text>

			<View style={styles.actionsContainer}>
				<TouchableOpacity style={styles.action}>
					<AntDesign name="like2" size={20} color="#888" />
					<Text style={styles.actionText}>{post.likeCount}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.action}
					onPress={() => onSelected(post)}
				>
					<Ionicons name="md-chatbubble-outline" size={20} color="#888" />
					<Text style={styles.actionText}>{post.commentCount}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.action}>
					<Feather name="share" size={20} color="#888" />
					<Text style={styles.actionText}>{post.shareCount}</Text>
				</TouchableOpacity>
			</View>
			{selected?.alternateKey === post.alternateKey && (
				<Animatable.View
					animation="fadeInLeft"
					delay={100}
					style={styles.paymentForm}
				>
					<Text>Current Payment: {'item.payment' || 'Not made'}</Text>
					<AppForm
						initialValues={{ comment: '' }}
						onSubmit={handlePayment}
						validationSchema={Yup.object().shape({
							comment: Yup.number().required().min(10000).label('Quantity'),
						})}
					>
						<View style={{ flexDirection: 'row' }}>
							<AppFormField
								width="80%"
								keyboardType="numeric"
								name="comment"
								placeholder="Comment on the post"
							/>
							<View style={{ marginLeft: 10 }}>
								<SubmitButton title="send" bg="silver" />
							</View>
						</View>
					</AppForm>
				</Animatable.View>
			)}
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
		borderWidth: 1,
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
	paymentForm: {
		alignItems: 'center',
		paddingTop: 17,
	},
});

export default UserPost;
