import client from './httpClient';

const endpoint = '/User';

const followUser = (followedId) =>
	client.post(`${endpoint}/follow`, { followedId });

// const updateProfile = (userInfo) =>
//    client.post(`${endpoint}/updateProfile`, userInfo);

const updateProfile = (profile) => {
	const data = new FormData();
	data.append('username', profile.username);
	data.append('password', profile.password);
	data.append('name', profile.name);
	data.append('email', profile.email);
	data.append('accountTypeId', 'profile.accountTypeId');
	data.append('about', profile.about);
	data.append('images', ['']);

	return client.post(`${endpoint}/updateProfile`, data);
};

export default {
	followUser,
	updateProfile,
};
