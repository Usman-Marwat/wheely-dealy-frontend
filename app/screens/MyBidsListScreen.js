import { useEffect } from 'react';

import { Button } from 'react-native';

import userAds from '../api/ad';
import useAuth from '../auth/useAuth';
import ActivityIndicator from '../components/ActivityIndicator';
import Empty from '../components/Empty';
import Header from '../components/Header';
import Vehicles from '../components/Vehicles';
import colors from '../config/colors';
import useApi from '../hooks/useApi';

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
			<Header heading="My Bids" />
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
