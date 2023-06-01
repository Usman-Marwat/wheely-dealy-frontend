import { Button, StyleSheet, View } from 'react-native';
import React from 'react';
import { useState } from 'react';
import * as Yup from 'yup';

import NewItemButton from '../components/NewItemButton';
import Questions from '../components/Questions';
import MenuFoldButton from '../navigation/MenuFoldButton';
import ActivityIndicator from '../components/ActivityIndicator';
import { AppForm, AppFormField, SubmitButton } from '../components/forms';
import AppModal from '../components/AppModal';
import useApi from '../hooks/useApi';
import general from '../api/general';
import search from '../api/search';
import { useEffect } from 'react';
import Empty from '../components/Empty';

const questions = [
	{
		alternateKey: 'd646543c-c99c-466c-b772-b2992e08f4db',
		questionDateTime: '2023-05-24T13:41:50.11',
		questionText: 'This is a sample Question',
		questioner: {
			alternateKey: '3e4d9bc0-92ae-47b5-999e-aeb98e6cdf39',
			username: 'seller',
			email: 'rajaz1651@gmail.com',
			name: 'Seller Seller',
			phoneNo: '03085656565',
			profilePictureURL:
				'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp',
			about: 'This is Demo About',
			ratingScore: 0,
			followersCount: 0,
			adsCount: 0,
			postsCount: 0,
			ratingsCount: 0,
			accountType: null,
			followedByCurrentUser: false,
		},
		answerResponses: null,
	},
	{
		alternateKey: '76aaf174-8bd3-45ce-a42c-e3ef206deba3',
		questionDateTime: '2023-05-24T13:42:11.78',
		questionText: 'This is another sample Question',
		questioner: {
			alternateKey: '3e4d9bc0-92ae-47b5-999e-aeb98e6cdf39',
			username: 'seller',
			email: 'rajaz1651@gmail.com',
			name: 'Seller Seller',
			phoneNo: '03085656565',
			profilePictureURL:
				'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp',
			about: 'This is Demo About',
			ratingScore: 0,
			followersCount: 0,
			adsCount: 0,
			postsCount: 0,
			ratingsCount: 0,
			accountType: null,
			followedByCurrentUser: false,
		},
		answerResponses: null,
	},
	{
		alternateKey: '4282be7f-5035-4805-a2bc-f8ec50c1dcd0',
		questionDateTime: '2023-05-24T13:42:29.06',
		questionText: 'This is another Question i am adding as a sample',
		questioner: {
			alternateKey: '3e4d9bc0-92ae-47b5-999e-aeb98e6cdf39',
			username: 'seller',
			email: 'rajaz1651@gmail.com',
			name: 'Seller Seller',
			phoneNo: '03085656565',
			profilePictureURL:
				'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp',
			about: 'This is Demo About',
			ratingScore: 0,
			followersCount: 0,
			adsCount: 0,
			postsCount: 0,
			ratingsCount: 0,
			accountType: null,
			followedByCurrentUser: false,
		},
		answerResponses: null,
	},
	{
		alternateKey: 'eaa610b2-173a-4c63-9fc2-ff87d1a6fd78',
		questionDateTime: '2023-05-25T00:33:54.84',
		questionText:
			"My Car is picking Up the Starter but not starting, any ideas what it's about?",
		questioner: {
			alternateKey: '3e4d9bc0-92ae-47b5-999e-aeb98e6cdf39',
			username: 'seller',
			email: 'rajaz1651@gmail.com',
			name: 'Seller Seller',
			phoneNo: '03085656565',
			profilePictureURL:
				'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp',
			about: 'This is Demo About',
			ratingScore: 0,
			followersCount: 0,
			adsCount: 0,
			postsCount: 0,
			ratingsCount: 0,
			accountType: null,
			followedByCurrentUser: false,
		},
		answerResponses: null,
	},
	{
		alternateKey: '89de98ab-bbe2-478b-9e2b-743d5a4b1ea1',
		questionDateTime: '2023-05-25T08:05:25.473',
		questionText: 'This is a sample question',
		questioner: {
			alternateKey: '1c2a852c-ec3c-433d-916a-f30c53e277fe',
			username: 'client',
			email: 'client@test.com',
			name: 'Client Client',
			phoneNo: '03085656564',
			profilePictureURL:
				'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg',
			about: 'This is Demo About',
			ratingScore: 0,
			followersCount: 0,
			adsCount: 0,
			postsCount: 0,
			ratingsCount: 0,
			accountType: null,
			followedByCurrentUser: false,
		},
		answerResponses: null,
	},
];

const validationSchema = Yup.object().shape({
	text: Yup.string().required().min(7).label('Text'),
});

const MyQuestionsListScreen = () => {
	const [visible, setVisible] = useState(false);

	const askQuestionApi = useApi(general.askQuestion);
	const myQuestionsApi = useApi(search.getMyQuestion);

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

	return (
		<>
			<MenuFoldButton />
			<ActivityIndicator
				visible={myQuestionsApi.loading || askQuestionApi.loading}
			/>

			<View style={styles.noData}>
				{!myQuestionsApi.data?.length > 0 && (
					<Empty title="No Ads added yet">
						<Button title="Reload" onPress={() => getMyQuestions()} />
					</Empty>
				)}
				<Questions questions={myQuestionsApi.data} onRefresh={getMyQuestions} />
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
					initialValues={{
						text: '',
					}}
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
});
