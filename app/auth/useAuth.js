import { useContext } from 'react';
import jwtDecode from 'jwt-decode';

import AuthContext from './context';
import authStorage from './storage';

//This hook is encapsulating the logic around populating the state [user,setUser]
//This state could be from context as well

export default useAuth = () => {
	const { user, setUser } = useContext(AuthContext);

	const logIn = (authToken) => {
		const user = jwtDecode(authToken);
		setUser({
			...user,
			name: user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
		});
		authStorage.storeToken(authToken);
	};

	const logOut = () => {
		setUser(null);
		authStorage.removeToken();
	};

	const refreshUserToken = (authToken) => {
		const user = jwtDecode(authToken);
		setUser(user);
		authStorage.removeToken();
		authStorage.storeToken(authToken);
	};

	return { user, logIn, logOut, refreshUserToken };
};
