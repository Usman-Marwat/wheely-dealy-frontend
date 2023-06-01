import client from './httpClient';

const endpoint = '/General';

const getPostOtp = (adId) => client.get(`${endpoint}/generate-post-otp`);

const deleteOrMarkSold = (itemId, itemType) =>
	client.get(`${endpoint}/delete-or-mark-sold-item`, { itemId, itemType });

const askQuestion = (text) => client.post(`${endpoint}/ask-question`, { text });

const answerQuestion = (questionId, text) =>
	client.post(`${endpoint}/answer-question`, { questionId, text });

export default {
	getPostOtp,
	deleteOrMarkSold,
	askQuestion,
	answerQuestion,
};
