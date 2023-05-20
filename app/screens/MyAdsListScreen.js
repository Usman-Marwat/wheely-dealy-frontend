import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { useEffect } from 'react';
import { SharedElement } from 'react-navigation-shared-element';

import routes from '../navigation/routes';
import MenuFoldButton from '../navigation/MenuFoldButton';
import TouchableIcon from '../components/TouchableIcon';
import useApi from '../hooks/useApi';
import userAds from '../api/ad';
import useAuth from '../auth/useAuth';
import ActivityIndicator from '../components/ActivityIndicator';

const SPACING = 10;
const ITEM_SIZE = 120;
const BG_COLOR = '#C1CEE077';

const MyAdsListScreen = ({ navigation }) => {
	const { user } = useAuth();

	const userAdsApi = useApi(userAds.getAds);

	useEffect(() => {
		userAdsApi.request(user.user_id);
	}, []);

	return (
		<>
			<ActivityIndicator visible={userAdsApi.loading}></ActivityIndicator>
			<MenuFoldButton />
			<View style={styles.container}>
				<FlatList
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ padding: SPACING }}
					data={userAdsApi.data?.items}
					keyExtractor={(item) => item.alternateKey}
					renderItem={({ item }) => {
						return (
							<TouchableOpacity
								onPress={() =>
									navigation.navigate(routes.ADS_LIST_DETAIL, {
										item: { ...item, myAd: true },
									})
								}
							>
								<View style={styles.item}>
									<View>
										<SharedElement id={`item.${item.key}.modal`}>
											<Text style={styles.model}>{item.title}</Text>
										</SharedElement>
										<SharedElement id={`item.${item.key}.description`}>
											<Text style={styles.description}>{item.description}</Text>
										</SharedElement>
										<SharedElement>
											<Text style={styles.price}>$ {item.price}</Text>
										</SharedElement>
									</View>
									<SharedElement
										id={`item.${item.key}.image`}
										style={styles.image}
									>
										<Image
											source={{ uri: item.imageUrls[0].url }}
											style={{ flex: 1, resizeMode: 'contain' }}
										/>
									</SharedElement>
								</View>
							</TouchableOpacity>
						);
					}}
				/>
			</View>
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
	container: {
		paddingBottom: 10,
		flex: 1,
	},
	description: {
		fontSize: 12,
		opacity: 0.7,
		position: 'absolute',
		top: SPACING + 17,
	},
	item: {
		height: ITEM_SIZE * 1.7,
		borderRadius: 12,
		marginBottom: SPACING,
		padding: SPACING,
		backgroundColor: BG_COLOR,
		overflow: 'hidden',
	},
	image: {
		height: ITEM_SIZE * 1.2,
		width: '100%',
		position: 'absolute',
		bottom: 10,
		right: '-30%',
	},
	model: {
		fontSize: 18,
		fontWeight: '700',
		position: 'absolute',
	},
	price: {
		fontSize: 12,
		fontWeight: '700',
		opacity: 0.7,
		position: 'absolute',
		top: SPACING + 47,
	},

	plusButton: {
		position: 'absolute',
		bottom: 10,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
	},
});
