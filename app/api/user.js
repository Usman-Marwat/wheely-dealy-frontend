import client from './httpClient';

const endpoint = '/User';

const followUser = (followedId) =>
	client.post(`${endpoint}/follow`, { followedId });

const updateProfile = (userInfo) =>
	client.post(`${endpoint}/updateProfile`, userInfo);

export default {
	followUser,
	updateProfile,
};
