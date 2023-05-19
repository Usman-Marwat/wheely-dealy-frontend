import client from './httpClient';

const endpoint = '/dashboard';

// const getHomeContent = () =>
// 	client.get(`${endpoint}/getContent?sectionType=H&pageNumber=0&pageSize=10`);

const getHomeContent = (sectionType, pageNumber = 0, pageSize = 10) => {
	console.log(sectionType);
	return client.get(`${endpoint}/getContent`, {
		sectionType,
		pageNumber,
		pageSize,
	});
};

export default {
	getHomeContent,
};
