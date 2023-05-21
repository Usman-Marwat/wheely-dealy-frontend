import client from './httpClient';

const endpoint = '/Ad';

const getSingleAd = (adId) => client.get(`${endpoint}/getadbyid`, { adId });

const getAds = (userId, pageNumber = 1, pageSize = 10) =>
	client.get(`${endpoint}/getuseradspaginated`, {
		userId,
		pageNumber,
		pageSize,
	});

const getServiceAds = (userId, pageNumber = 1, pageSize = 10) =>
	client.get(`${endpoint}/getuserserviceadspaginated`, {
		userId,
		pageNumber,
		pageSize,
	});

const likePost = (postId) => client.post(`${endpoint}/like-post`, { postId });

export default {
	getAds,
	getSingleAd,
	getServiceAds,
	likePost,
};
