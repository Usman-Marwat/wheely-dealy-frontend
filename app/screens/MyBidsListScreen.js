import React, { useEffect } from 'react';

import { Button } from 'react-native';

import MenuFoldButton from '../navigation/MenuFoldButton';
import useApi from '../hooks/useApi';
import userAds from '../api/ad';
import useAuth from '../auth/useAuth';
import ActivityIndicator from '../components/ActivityIndicator';
import Vehicles from '../components/Vehicles';
import Empty from '../components/Empty';
import colors from '../config/colors';

const MyAdsListScreen = ({ navigation }) => {
	const { user } = useAuth();

	const bidAds = useApi(userAds.getAdsWithMyBid);

	const getBidAds = () => {
		bidAds.request();
	};

	useEffect(() => {
		getBidAds();
	}, []);

	console.log(bidAds.data);

	return (
		<>
			<ActivityIndicator visible={bidAds.loading}></ActivityIndicator>
			<MenuFoldButton />
			{!bidAds.data?.items?.length > 0 && (
				<Empty title="No Ads Bidded yet">
					<Button
						title="Reload"
						onPress={() => getBidAds()}
						color={colors.primary}
					/>
				</Empty>
			)}
			<Vehicles
				navigation={navigation}
				vehicles={bidAds.data?.items}
				onRefresh={getBidAds}
			/>
		</>
	);
};

export default MyAdsListScreen;
