import { useEffect } from 'react';
import { Button, StyleSheet, View } from 'react-native';

import userAds from '../api/ad';
import useAuth from '../auth/useAuth';
import ActivityIndicator from '../components/ActivityIndicator';
import Empty from '../components/Empty';
import NewItemButton from '../components/NewItemButton';
import Services from '../components/Services';
import useApi from '../hooks/useApi';
import MenuFoldButton from '../navigation/MenuFoldButton';
import routes from '../navigation/routes';
import Header from '../components/Header';

const MyServicesListScreen = ({ navigation }) => {
	const userAdsApi = useApi(userAds.getServiceAds);
	const { user } = useAuth();

	const getUserAds = () => {
		userAdsApi.request(user.user_id);
	};

	useEffect(() => {
		getUserAds();
	}, []);

	return (
		<>
			<Header heading="My Services" />
			<ActivityIndicator visible={userAdsApi.loading} />

			<View style={styles.container}>
				{!userAdsApi.data?.items.length > 0 && (
					<Empty title="No Ads added yet">
						<Button title="Reload" onPress={() => getUserAds()} />
					</Empty>
				)}
				<Services
					services={userAdsApi.data?.items}
					navigation={navigation}
					onRefresh={getUserAds}
					updateAble
					deleteAble
					ownAd
				/>
			</View>

			<View style={styles.plusButton}>
				<NewItemButton
					onPress={() => navigation.navigate(routes.SERVICE_EDIT)}
				/>
			</View>
		</>
	);
};

export default MyServicesListScreen;

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
