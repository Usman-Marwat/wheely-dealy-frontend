import client from './httpClient';

const endpoint = 'Dashboard';

// const getHomeContent = () =>
// 	client.get(`${endpoint}/getContent?sectionType=H&pageNumber=0&pageSize=10`);

const getHomeContent = (pageNumber = 0, pageSize = 10) =>
	client.get(`${endpoint}/getContent`, {
		sectionType: 'H',
		pageNumber,
		pageSize,
	});

const getExploreContent = (pageNumber = 0, pageSize = 10) =>
	client.get(`${endpoint}/getContent`, {
		sectionType: 'E',
		pageNumber,
		pageSize,
	});

const getSavedContent = (pageNumber = 0, pageSize = 10) =>
	client.get(`${endpoint}/getContent`, {
		sectionType: 'SI',
		pageNumber,
		pageSize,
	});

const getProfileView = (userid, pageNumber = 0, pageSize = 10) =>
	client.get(`${endpoint}/getContent`, {
		sectionType: 'PV',
		pageNumber,
		pageSize,
		userid,
	});

const getVisitorContent = (pageNumber = 0, pageSize = 10) =>
	client.get(`${endpoint}/getContent`, {
		sectionType: 'V',
		pageNumber,
		pageSize,
	});

const saveAnItem = (itemId, itemType) =>
	client.post(`${endpoint}/save-item`, { itemId, itemType });

export default {
	getHomeContent,
	getExploreContent,
	saveAnItem,
	getSavedContent,
	getProfileView,
	getVisitorContent,
};
