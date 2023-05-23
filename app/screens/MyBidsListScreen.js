import React, { useEffect } from 'react';

import MenuFoldButton from '../navigation/MenuFoldButton';
import useApi from '../hooks/useApi';
import userAds from '../api/ad';
import useAuth from '../auth/useAuth';
import ActivityIndicator from '../components/ActivityIndicator';
import Vehicles from '../components/Vehicles';

const MyAdsListScreen = ({ navigation }) => {
	const { user } = useAuth();

	const bidAds = useApi(userAds.getAdsWithMyBid);

	const getBidAds = () => {
		bidAds.request();
	};

	useEffect(() => {
		getBidAds();
	}, []);

	return (
		<>
			<ActivityIndicator visible={bidAds.loading}></ActivityIndicator>
			<MenuFoldButton />
			<Vehicles
				navigation={navigation}
				vehicles={bidAds.data?.items}
				onRefresh={getBidAds}
			/>
		</>
	);
};

export default MyAdsListScreen;
