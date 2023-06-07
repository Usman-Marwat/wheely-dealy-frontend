import { useEffect } from 'react';
import { Button, StyleSheet, View } from 'react-native';

import userAds from '../api/ad';
import useAuth from '../auth/useAuth';
import ActivityIndicator from '../components/ActivityIndicator';
import NewItemButton from '../components/NewItemButton';
import Vehicles from '../components/Vehicles';
import useApi from '../hooks/useApi';
import MenuFoldButton from '../navigation/MenuFoldButton';
import routes from '../navigation/routes';
import Empty from '../components/Empty';
import Header from '../components/Header';

const MyAdsListScreen = ({ navigation }) => {
	const { user } = useAuth();

	const userAdsApi = useApi(userAds.getAds);

	const getMyAds = () => {
		userAdsApi.request(user.user_id);
	};

	useEffect(() => {
		getMyAds();
	}, []);

	return (
		<>
			<ActivityIndicator visible={userAdsApi.loading}></ActivityIndicator>
			<Header heading="My Vehicle Ads" />

			<View style={styles.container}>
				{!userAdsApi.data?.items.length > 0 && (
					<Empty title="No Ads added yet">
						<Button title="Reload" onPress={() => getUserAds()} />
					</Empty>
				)}
				<Vehicles
					navigation={navigation}
					vehicles={userAdsApi.data?.items}
					onRefresh={getMyAds}
					updateAble
					deleteAble
					sellAble
					ownAd
				/>
			</View>

			<View style={styles.plusButton}>
				<NewItemButton onPress={() => navigation.navigate(routes.ADS_EDIT)} />
			</View>
		</>
	);
};

export default MyAdsListScreen;

const styles = StyleSheet.create({
	container: {
		paddingBottom: 10,
		flex: 1,
	},
	plusButton: {
		position: 'absolute',
		bottom: 20,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
	},
});
