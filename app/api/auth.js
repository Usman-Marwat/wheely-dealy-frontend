import client from './httpClient';

const endpoint = '/Auth';

const getAccountTypes = () => client.get(`${endpoint}/getaccounttypes`);

const register = (userInfo) => {
	const data = new FormData();
	data.append('username', userInfo.username);
	data.append('name', userInfo.name);
	data.append('email', userInfo.email);
	data.append('password', userInfo.password);
	data.append('phoneNo', userInfo.phoneNo);
	data.append('accountTypeGId', userInfo.accountTypeGId);
	data.append('about', userInfo.about);

	return client.post(`${endpoint}/signup`, data);
};

const verifyEmail = (userInfo) =>
	client.post(`${endpoint}/verify-email`, userInfo);

const login = (userInfo) => client.post(`${endpoint}/login`, userInfo);

const getMyAccount = () => client.get(`${endpoint}/getmyaccount`);

const getProfileById = (userId) =>
	client.get(`${endpoint}/get-profile-by-id`, { userId });

const updateProfile = (user_id, profileData) =>
	client.put(`users/profile/${user_id}`, profileData);

export default {
	getAccountTypes,
	login,
	getMyAccount,
	verifyEmail,
	register,
	updateProfile,
	getProfileById,
};
