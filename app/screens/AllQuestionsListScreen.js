import { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { useEffect } from 'react';
import * as Yup from 'yup';

import general from '../api/general';
import search from '../api/search';
import ActivityIndicator from '../components/ActivityIndicator';
import Answers from '../components/Answers';
import Empty from '../components/Empty';
import Questions, { UserQuestion } from '../components/Questions';
import WholeScreenModal from '../components/WholeScreenModal';
import { AppForm, AppFormField, SubmitButton } from '../components/forms';
import colors from '../config/colors';
import useApi from '../hooks/useApi';
import MenuFoldButton from '../navigation/MenuFoldButton';
import Header from '../components/Header';

const validationSchema = Yup.object().shape({
	text: Yup.string().required().min(7).label('Text'),
});

const AllQuestionsListScreen = () => {
	const [answerVisible, setAnswerVisible] = useState(false);
	const [selected, setSelected] = useState(null);

	const allQuestionsApi = useApi(search.getQuestion);
	const questionByIdApi = useApi(search.getQuestionById);
	const answerApi = useApi(general.answerQuestion);

	const getAllQuestions = () => {
		allQuestionsApi.request();
	};

	useEffect(() => {
		getAllQuestions();
	}, []);

	const getQuestionById = async (question) => {
		const { data } = await questionByIdApi.request(question.alternateKey);
		setSelected({ ...data, randomImage: question.randomImage });
	};

	const postAnswer = async (formData) => {
		const { data } = await answerApi.request(
			selected.alternateKey,
			formData.text
		);

		if (data?.statusCode !== 200) alert('Could not post the answer');
	};

	return (
		<>
			<Header heading="All Questions" />
			<ActivityIndicator
				visible={
					questionByIdApi.loading ||
					answerApi.loading ||
					allQuestionsApi.loading
				}
			/>

			<View style={styles.noData}>
				{!allQuestionsApi.data?.length > 0 && (
					<Empty title="No Ads added yet">
						<Button
							title="Reload"
							onPress={() => getAllQuestions()}
							color={colors.primary}
						/>
					</Empty>
				)}
				<Questions
					showAnswer
					questions={allQuestionsApi.data}
					onRefresh={getAllQuestions}
					onSelected={(question) => {
						setAnswerVisible(true);
						getQuestionById(question);
					}}
				/>
			</View>

			{selected && (
				<WholeScreenModal
					onClose={() => {
						setSelected(null);
						setAnswerVisible(false);
					}}
					visible={answerVisible}
				>
					<UserQuestion
						name={selected.questioner.name}
						imageUri={
							selected.questioner.profilePictureURL || selected.randomImage
						}
						text={selected.questionText}
					/>
					<View>
						<Answers answers={selected?.answerResponses} />
					</View>
					<AppForm
						initialValues={{ text: '' }}
						onSubmit={(formData) => {
							setAnswerVisible(false);
							postAnswer(formData);
						}}
						validationSchema={validationSchema}
					>
						<AppFormField
							name="text"
							placeholder="Answer the question"
							multiline
						/>
						<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
							<SubmitButton title="send" bg="silver" isIcon />
						</View>
					</AppForm>
				</WholeScreenModal>
			)}
		</>
	);
};

export default AllQuestionsListScreen;

const styles = StyleSheet.create({
	noData: {
		paddingBottom: 10,
		flex: 1,
	},
	submitButton: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		bottom: 50,
	},
});
