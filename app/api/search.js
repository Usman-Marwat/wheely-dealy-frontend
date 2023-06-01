import client from './httpClient';

const endpoint = '/Search';

const search = (searchField, pageNumber, pageSize) =>
	client.get(endpoint, {
		params: {
			searchFor: 'h',
			searchField,
			pageNumber,
			pageSize,
		},
	});

const getQuestion = (search) =>
	client.get(`${endpoint}/get-question`, { search });

const getMyQuestion = () => client.get(`${endpoint}/get-my-question`);

const getQuestionById = (questionId) =>
	client.get(`${endpoint}/get-question-by-id`, { questionId });

export default {
	search,
	getQuestion,
	getQuestionById,
	getMyQuestion,
};
