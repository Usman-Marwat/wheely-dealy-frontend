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

const sharePost = (postId) => client.post(`${endpoint}/share-post`, { postId });

const commentOnPost = (postGId, text) =>
	client.post(`${endpoint}/comment-on-post`, { postGId, text });

const getPostById = (postId) =>
	client.get(`${endpoint}/getpostbyid`, {
		postId,
	});

const getMyBidOnAd = (adId) =>
	client.get(`${endpoint}/get-my-bid-on-ad`, { adId });

const bidOnAd = (bidAmount, vehicleAdId) =>
	client.post(`${endpoint}/bid-on-ad`, { bidAmount, vehicleAdId });

const getBidsOnMyAd = (adId) =>
	client.get(`${endpoint}/get-bids-on-my-ad`, { adId });

export default {
	getAds,
	getSingleAd,
	getServiceAds,
	likePost,
	sharePost,
	commentOnPost,
	getPostById,
	getMyBidOnAd,
	bidOnAd,
	getBidsOnMyAd,
};
