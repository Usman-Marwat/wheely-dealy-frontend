import client from './httpClient';

const endpoint = '/Ad';

const getSingleAd = (adId) => client.get(`${endpoint}/getadbyid`, { adId });

const getAds = (userId, pageNumber = 1, pageSize = 10) =>
	client.get(`${endpoint}/getuseradspaginated`, {
		userId,
		pageNumber,
		pageSize,
	});

export default {
	getAds,
	getSingleAd,
};
