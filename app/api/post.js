import client from './httpClient';

const endpoint = '/Post';

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

const updatePost = (ad) => {
	const data = new FormData();

	data.append('Text', ad.text);
	data.append('PostId', ad.postId);
	data.append('Images', ['']);

	return client.put(`${endpoint}/modify-post`, data);
};

const getMyPosts = () => client.get(`${endpoint}/get-my-posts`);

export default {
	createPost,
	updatePost,
	getMyPosts,
};
