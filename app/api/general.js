import client from './httpClient';

const endpoint = '/General';

const getPostOtp = (adId) => client.get(`${endpoint}/generate-post-otp`);

export default {
	getPostOtp,
};
