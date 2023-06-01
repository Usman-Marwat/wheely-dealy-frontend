import client from './httpClient';

const endpoint = '/Client';

const rateSeller = (rating) => client.post(`${endpoint}/rate`, rating);

const claimDeal = (dealObj) => client.post(`${endpoint}/claim-deal`, dealObj);

const claimServiceDeal = (dealObj) =>
	client.post(`${endpoint}/claim-service-deal`, dealObj);

export default {
	rateSeller,
	claimDeal,
	claimServiceDeal,
};
