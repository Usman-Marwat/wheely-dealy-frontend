import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import userAds from '../api/ad';
import useAuth from '../auth/useAuth';
import ActivityIndicator from '../components/ActivityIndicator';
import NewItemButton from '../components/NewItemButton';
import Vehicles from '../components/Vehicles';
import useApi from '../hooks/useApi';
import MenuFoldButton from '../navigation/MenuFoldButton';
import routes from '../navigation/routes';

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
			<MenuFoldButton />
			<Vehicles
				navigation={navigation}
				vehicles={userAdsApi.data?.items}
				onRefresh={getMyAds}
				updateAble
				deleteAble
				ownAd
			/>
			<View style={styles.plusButton}>
				<NewItemButton onPress={() => navigation.navigate(routes.ADS_EDIT)} />
			</View>
		</>
	);
};

export default MyAdsListScreen;

const styles = StyleSheet.create({
	plusButton: {
		position: 'absolute',
		bottom: 7,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
	},
});
