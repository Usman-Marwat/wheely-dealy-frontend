import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import * as Yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { AppForm, AppFormField, SubmitButton } from './forms';
import Comment from './Comment';

const PostDetails = ({ post, onComment }) => {
	return (
		<KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
			<View>
				<Text>No# of Comments {post.commentCount}</Text>
				<Text>No# of Likes {post.likeCount}</Text>
				<Text>No# of Shares {post.shareCount}</Text>
				{post.comments.map((comment, index) => (
					<Comment
						key={comment.alternateKey}
						content={comment.text}
						username={comment.user.name}
					/>
				))}
				<AppForm
					initialValues={{ comment: '' }}
					onSubmit={(text) => onComment(post.alternateKey, text.comment)}
					validationSchema={Yup.object().shape({
						comment: Yup.string().required().label('Comment'),
					})}
				>
					<AppFormField name="comment" placeholder="Comment on the post" />
					<SubmitButton title="send" bg="silver" />
				</AppForm>
			</View>
		</KeyboardAwareScrollView>
	);
};

export default PostDetails;

const styles = StyleSheet.create({});
