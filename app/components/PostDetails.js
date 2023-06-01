import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';

import Comment from './Comment';
import { AppForm, AppFormField, SubmitButton } from './forms';

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
						multiline
					/>
					<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
						<SubmitButton title="send" bg="silver" isIcon />
					</View>
				</AppForm>
			</View>
		</KeyboardAwareScrollView>
	);
};

export default PostDetails;
