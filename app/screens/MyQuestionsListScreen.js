import { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

import { useEffect } from 'react';
import general from '../api/general';
import search from '../api/search';
import ActivityIndicator from '../components/ActivityIndicator';
import Answers from '../components/Answers';
import AppModal from '../components/AppModal';
import Empty from '../components/Empty';
import Header from '../components/Header';
import NewItemButton from '../components/NewItemButton';
import Questions, { UserQuestion } from '../components/Questions';
import WholeScreenModal from '../components/WholeScreenModal';
import { AppForm, AppFormField, SubmitButton } from '../components/forms';
import colors from '../config/colors';
import useApi from '../hooks/useApi';

const validationSchema = Yup.object().shape({
	text: Yup.string().required().min(7).label('Text'),
});

const MyQuestionsListScreen = () => {
	const [visible, setVisible] = useState(false);
	const [answerVisible, setAnswerVisible] = useState(false);
	const [selected, setSelected] = useState(null);

	const askQuestionApi = useApi(general.askQuestion);
	const myQuestionsApi = useApi(search.getMyQuestion);
	const questionByIdApi = useApi(search.getQuestionById);
	const answerApi = useApi(general.answerQuestion);

	const getMyQuestions = () => {
		myQuestionsApi.request();
	};

	useEffect(() => {
		getMyQuestions();
	}, []);

	const addQuestion = async (formData) => {
		const { data } = await askQuestionApi.request(formData.text);

		if (data?.statusCode !== 200) return alert('Question was not posted');

		getMyQuestions();
	};

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
			<Header heading="My Questions" />
			<ActivityIndicator
				visible={
					myQuestionsApi.loading ||
					askQuestionApi.loading ||
					questionByIdApi.loading ||
					answerApi.loading
				}
			/>

			<View style={styles.noData}>
				{!myQuestionsApi.data?.length > 0 && (
					<Empty title="No Ads added yet">
						<Button
							title="Reload"
							onPress={() => getMyQuestions()}
							color={colors.primary}
						/>
					</Empty>
				)}
				<Questions
					showAnswer
					questions={myQuestionsApi.data}
					onRefresh={getMyQuestions}
					onSelected={(question) => {
						setAnswerVisible(true);
						getQuestionById(question);
					}}
				/>
			</View>

			<View style={styles.plusButton}>
				<NewItemButton onPress={() => setVisible(true)} />
			</View>

			<AppModal
				heading="Ask Question"
				visible={visible}
				onVisible={() => setVisible(false)}
			>
				<AppForm
					initialValues={{ text: '' }}
					onSubmit={(formData) => {
						setVisible(false);
						addQuestion(formData);
					}}
					validationSchema={validationSchema}
				>
					<AppFormField name="text" placeholder="Question Text" multiline />

					<SubmitButton title="Ask it" />
				</AppForm>
			</AppModal>

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

export default MyQuestionsListScreen;

const styles = StyleSheet.create({
	noData: {
		paddingBottom: 10,
		flex: 1,
	},
	plusButton: {
		position: 'absolute',
		bottom: 7,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	submitButton: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		bottom: 50,
	},
});
