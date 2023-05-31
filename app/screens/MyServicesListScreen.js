import { StyleSheet, View } from 'react-native';
import { useEffect } from 'react';

import userAds from '../api/ad';
import useAuth from '../auth/useAuth';
import ActivityIndicator from '../components/ActivityIndicator';
import Empty from '../components/Empty';
import Services from '../components/Services';
import TouchableIcon from '../components/TouchableIcon';
import useApi from '../hooks/useApi';
import MenuFoldButton from '../navigation/MenuFoldButton';
import routes from '../navigation/routes';
import NewItemButton from '../components/NewItemButton';

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
			<MenuFoldButton />
			<ActivityIndicator visible={userAdsApi.loading} />

			<View style={styles.container}>
				{!userAdsApi.data?.items.length > 0 && (
					<Empty title="No Services added yet" />
				)}
				<Services
					services={userAdsApi.data?.items}
					navigation={navigation}
					onRefresh={getUserAds}
					updateAble
					deleteAble
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
		bottom: 7,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
	},
});
