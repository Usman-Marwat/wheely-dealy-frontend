import {
	Keyboard,
	ScrollView,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';

import post from '../api/post';
import useAuth from '../auth/useAuth';
import ActivityIndicator from '../components/ActivityIndicator';
import Header from '../components/Header';
import { AppForm, AppFormField, SubmitButton } from '../components/forms';
import FormImagePicker from '../components/forms/FormImagePicker';
import useApi from '../hooks/useApi';

const validationSchema = Yup.object().shape({
	text: Yup.string().required().min(1).label('Text'),
	images: Yup.array().min(1, 'Please select atleast 1 image'),
});
const initialValues = {
	text: '',
	images: [],
};

const PostEditScreen = ({ navigation }) => {
	const { user } = useAuth();

	const createPostApi = useApi(post.createPost);

	const handleSubmit = async (formData, { resetForm }) => {
		const { data } = await createPostApi.request({
			...formData,
			userGId: user.user_id,
		});
		if (data?.statusCode === 200) alert('Post Created  successfully');
		resetForm();
		navigation.goBack();
	};
	return (
		<>
			<Header heading="Create Post" />
			<ActivityIndicator visible={createPostApi.loading} />
			<View style={styles.container}>
				<KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<ScrollView showsVerticalScrollIndicator={false}>
							<AppForm
								initialValues={{
									...initialValues,
								}}
								onSubmit={handleSubmit}
								validationSchema={validationSchema}
							>
								<FormImagePicker name="images" />
								<AppFormField
									icon="card-text"
									name="text"
									placeholder="Text"
									multiline
								/>
								<SubmitButton title="Send" />
							</AppForm>
						</ScrollView>
					</TouchableWithoutFeedback>
				</KeyboardAwareScrollView>
			</View>
		</>
	);
};

export default PostEditScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		paddingTop: 70,
	},
});
