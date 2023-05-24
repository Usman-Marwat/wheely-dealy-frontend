import client from './httpClient';

const endpoint = '/post';

const createPost = (post) => {
	const data = new FormData();
	data.append('text', post.text);
	data.append('userGId', post.userGId);
	data.append('images', []);

	// post.images.forEach((image, index) =>
	// 	data.append('images', {
	// 		name: 'image' + index,
	// 		type: 'image/jpeg',
	// 		uri: image,
	// 	})
	// );

	return client.post(`${endpoint}/createpost`, data);
};

export default {
	createPost,
};
