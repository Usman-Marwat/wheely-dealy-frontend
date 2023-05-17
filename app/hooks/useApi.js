import { useState } from 'react';

export default useApi = (apiFunc) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	const request = async (...args) => {
		setLoading(true);
		const response = await apiFunc(...args);
		setLoading(false);

		setError(!response.ok);
		setData(response.data);
		return response;
	};

	return {
		data,
		error,
		loading,
		request,
	};
};

/* 
 setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    //we will set data even if we have error or not
    if (!response.ok) {
      setError(true);
      return response;
    }
    // different stories in our code
    setError(false);
    setData(response.data);
    return response;
*/
