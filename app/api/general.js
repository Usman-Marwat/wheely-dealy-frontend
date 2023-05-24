import client from './httpClient';

const endpoint = '/General';

const getPostOtp = (adId) => client.get(`${endpoint}/generate-post-otp`);

const deleteOrMarkSold = (itemId, itemType) =>
	client.get(`${endpoint}/delete-or-mark-sold-item`, { itemId, itemType });

export default {
	getPostOtp,
	deleteOrMarkSold,
};
