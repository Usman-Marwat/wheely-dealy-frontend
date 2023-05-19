import client from './httpClient';

const endpoint = '/dashboard';

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

export default {
	getHomeContent,
	getExploreContent,
};
