import client from './httpClient';

const endpoint = '/User';

const followUser = (followData) =>
	client.post(`${endpoint}/follow`, followData);

const updateProfile = (userInfo) =>
	client.post(`${endpoint}/updateProfile`, userInfo);

export default {
	followUser,
	updateProfile,
};
