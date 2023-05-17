import { create } from 'apisauce';

import cache from '../utility/cache';
import authStorage from '../auth/storage';

const apiClient = create({
	baseURL: 'https://whelleyapi.azurewebsites.net/api',
	// params: {
	//   key: "62f3d719ed334f489c4481bff764b0fb",
	// },
});
//adding Token for every request
apiClient.addAsyncRequestTransform(async (request) => {
	const authToken = await authStorage.getToken();
	if (!authToken) return;
	request.headers['x-auth-token'] = authToken;
});

//changing implementation of default GET method
const get = apiClient.get;
apiClient.get = async (url, params, axiosConfig) => {
	const response = await get(url, params, axiosConfig);

	if (response.ok) {
		cache.store(url, response.data);
		return response;
	}
	//call to the server has failed so loading from cache
	const data = await cache.get(url);
	//these are the only 2 properties that we will care about when using api layer
	//response object contains informtion why call to the server failed
	return data ? { ok: true, data } : response;
};

export default apiClient;
