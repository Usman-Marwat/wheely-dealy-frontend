import { AntDesign } from '@expo/vector-icons';
import niceColors from 'nice-color-palettes';
import { useState } from 'react';
import {
	Button,
	Dimensions,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SharedElement } from 'react-navigation-shared-element';

import useAuth from '../auth/useAuth';
import AppModal from '../components/AppModal';
import { AppForm, AppFormField, SubmitButton } from '../components/forms';
import colors from '../config/colors';
import BackButton from '../navigation/BackButton';
import routes from '../navigation/routes';
import useApi from '../hooks/useApi';
import userAds from '../api/ad';
import { useEffect } from 'react';
import ActivityIndicator from '../components/ActivityIndicator';

const AnimatableScrollview = Animatable.createAnimatableComponent(ScrollView);
const animation = {
	0: { opacity: 0, translateX: 50 },
	1: { opacity: 1, translateX: 0 },
};

const { height, width } = Dimensions.get('window');
const SPACING = 10;
const colorsPallete = [...niceColors[1], ...niceColors[2]];
const buttons = ['See all the bids', 'Give your bid'];

const AdsListDetailsScreen = ({ navigation, route }) => {
	const { item } = route.params;
	const [visible, setVisible] = useState(false);
	const { user } = useAuth();

	const myBidApi = useApi(userAds.getMyBidOnAd);
	const addBidApi = useApi(userAds.bidOnAd);

	const getBids = async () => {
		await myBidApi.request(item.alternateKey);
	};

	const postBid = async (bidAmount) => {
		await addBidApi.request(bidAmount, item.alternateKey);
		getBids();
	};

	useEffect(() => {
		if (user.account_type === 'Client') getBids();
	}, []);

	return (
		<>
			<BackButton />
			<ActivityIndicator visible={myBidApi.loading || addBidApi.loading} />
			<View>
				<SharedElement id={`item.${item.key}.image`} style={styles.image}>
					<Image source={{ uri: item.imageUrls[0].url }} style={styles.image} />
				</SharedElement>
				<View style={styles.meta}>
					<SharedElement id={`item.${item.key}.modal`}>
						<Text numberOfLines={1} adjustsFontSizeToFit style={styles.model}>
							{item.title}
						</Text>
					</SharedElement>
					<SharedElement id={`item.${item.key}.description`}>
						<Text style={styles.description}>{item.description}</Text>
					</SharedElement>
					<SharedElement>
						<Text style={styles.price}>Rs {item.price}</Text>
					</SharedElement>
				</View>
				<AnimatableScrollview
					useNativeDriver
					animation={animation}
					delay={400}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ padding: SPACING }}
					style={{ flexGrow: 0, marginVertical: SPACING }}
				>
					{colorsPallete.map((color, index) => {
						return (
							<View
								key={index}
								style={[styles.swatch, { backgroundColor: color }]}
							></View>
						);
					})}
				</AnimatableScrollview>

				{user.account_type === 'Seller' && (
					<Animatable.View useNativeDriver animation={animation} delay={700}>
						<TouchableOpacity
							style={styles.rowButton}
							onPress={() =>
								navigation.navigate(routes.BIDS_LIST, {
									adId: item.alternateKey,
								})
							}
						>
							<Text>See all the bids</Text>
							<AntDesign name="arrowright" color="rgba(0,0,0,0.8)" size={17} />
						</TouchableOpacity>
					</Animatable.View>
				)}

				{user.account_type === 'Client' && (
					<>
						<Text>Your current bid:{myBidApi.data?.obj.bidAmount} </Text>
						<Button
							title="Give your bid"
							color={colors.medium}
							onPress={() => setVisible(true)}
						/>
					</>
				)}
			</View>

			<AppModal
				visible={visible}
				heading="Give Your bid"
				onVisible={() => setVisible(false)}
			>
				<AppForm
					initialValues={{
						bid: '',
					}}
					onSubmit={(formData) => {
						setVisible(false);
						postBid(formData.bid);
					}}
				>
					<AppFormField
						keyboardType="numeric"
						width={'70%'}
						icon="money"
						family="fontawesome"
						name="bid"
						placeholder="Bid Amount"
						// backgroundColor={colors.light}
					/>
					<SubmitButton title="Submit" />
				</AppForm>
			</AppModal>
		</>
	);
};

export default AdsListDetailsScreen;

const styles = StyleSheet.create({
	description: {
		fontSize: 12,
		opacity: 0.7,
		position: 'absolute',
		top: SPACING + 30,
	},
	image: {
		resizeMode: 'contain',
		width: width * 2.1,
		height: width * 0.7,
	},
	meta: {
		position: 'absolute',
		top: SPACING * 4,
		left: SPACING,
		width: width * 0.6,
	},
	model: {
		fontSize: 32,
		fontWeight: '700',
		position: 'absolute',
	},
	price: {
		fontSize: 18,
		fontWeight: '700',
		opacity: 0.7,
		position: 'absolute',
		top: SPACING + 57,
	},
	swatch: {
		height: 56,
		width: 56,
		borderRadius: 16,
		marginRight: SPACING,
	},
	rowButton: {
		flexDirection: 'row',
		padding: SPACING * 2,
		justifyContent: 'space-between',
		borderColor: 'rgba(0,0,0,0.1)',
		borderBottomWidth: 1,
		borderTopWidth: 1,
	},
});
