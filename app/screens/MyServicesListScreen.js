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

const MyServicesListScreen = ({ navigation }) => {
	const userAdsApi = useApi(userAds.getServiceAds);
	const { user } = useAuth();

	useEffect(() => {
		userAdsApi.request(user.user_id);
	}, []);

	return (
		<>
			<MenuFoldButton />
			<ActivityIndicator visible={userAdsApi.loading} />

			<View style={styles.container}>
				{!userAdsApi.data?.items.length > 0 && (
					<Empty title="No Services added yet" />
				)}
				<Services services={userAdsApi.data?.items} />
			</View>

			<View style={styles.plusButton}>
				<TouchableIcon
					name="plus"
					size={50}
					iconColor="black"
					onPress={() => navigation.navigate(routes.SERVICE_EDIT)}
				></TouchableIcon>
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
		bottom: 10,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
	},
});
