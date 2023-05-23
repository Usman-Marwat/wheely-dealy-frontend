import { StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';

import routes from '../navigation/routes';
import MenuFoldButton from '../navigation/MenuFoldButton';
import TouchableIcon from '../components/TouchableIcon';
import useApi from '../hooks/useApi';
import userAds from '../api/ad';
import useAuth from '../auth/useAuth';
import ActivityIndicator from '../components/ActivityIndicator';
import Vehicles from '../components/Vehicles';

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
			/>
			<View style={styles.plusButton}>
				<TouchableIcon
					name="plus"
					size={50}
					iconColor="black"
					onPress={() => navigation.navigate(routes.ADS_EDIT)}
				></TouchableIcon>
			</View>
		</>
	);
};

export default MyAdsListScreen;

const styles = StyleSheet.create({
	plusButton: {
		position: 'absolute',
		bottom: 10,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
	},
});
