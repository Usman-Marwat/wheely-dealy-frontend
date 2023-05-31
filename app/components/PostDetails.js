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
				{post.comments.map((comment, index) => (
					<Comment
						key={comment.alternateKey}
						content={comment.text}
						username={comment.user.name}
					/>
				))}
				<AppForm
					initialValues={{ comment: '' }}
					onSubmit={(text, { resetForm }) => {
						onComment(post, text.comment);
						resetForm();
					}}
					validationSchema={Yup.object().shape({
						comment: Yup.string().required().label('Comment'),
					})}
				>
					<AppFormField
						name="comment"
						placeholder="Comment on the post"
						width="90%"
						multiline
					/>
					<View style={styles.submitButton}>
						<SubmitButton title="send" bg="silver" isIcon />
					</View>
				</AppForm>
			</View>
		</KeyboardAwareScrollView>
	);
};

export default PostDetails;

const styles = StyleSheet.create({
	submitButton: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		bottom: 50,
	},
});
