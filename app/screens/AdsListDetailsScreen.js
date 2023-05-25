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
	Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SharedElement } from 'react-navigation-shared-element';
import * as Yup from 'yup';
import ImageView from 'react-native-image-viewing';

import { useEffect } from 'react';
import userAds from '../api/ad';
import dashboard from '../api/dashboard';
import seller from '../api/seller';
import useAuth from '../auth/useAuth';
import ActionButtons from '../components/ActionButtons';
import ActivityIndicator from '../components/ActivityIndicator';
import AppModal from '../components/AppModal';
import { AppForm, AppFormField, SubmitButton } from '../components/forms';
import colors from '../config/colors';
import useApi from '../hooks/useApi';
import BackButton from '../navigation/BackButton';
import routes from '../navigation/routes';
import general from '../api/general';

const AnimatableScrollview = Animatable.createAnimatableComponent(ScrollView);
const animation = {
	0: { opacity: 0, translateX: 50 },
	1: { opacity: 1, translateX: 0 },
};

const validationSchema = Yup.object().shape({
	title: Yup.string().required().label('Title'),
	price: Yup.number().required().min(1).label('Price'),
	description: Yup.string().required().label('Description'),
});

const { height, width } = Dimensions.get('window');
const SPACING = 10;
const colorsPallete = [...niceColors[1], ...niceColors[2]];
const buttons = ['See all the bids', 'Give your bid'];

const AdsListDetailsScreen = ({ navigation, route }) => {
	const { item, saveAble, updateAble, deleteAble } = route.params;
	const [saved, setSaved] = useState(item.savedByCurrentUser);
	const [bidVisible, setBidVisible] = useState(false);
	const [updateVisible, setUpdateVisible] = useState(false);
	const [imagesVisible, setImagesVisible] = useState(false);
	const { user } = useAuth();

	const myBidApi = useApi(userAds.getMyBidOnAd);
	const addBidApi = useApi(userAds.bidOnAd);
	const saveItemApi = useApi(dashboard.saveAnItem);
	const updateAdApi = useApi(seller.updateAd);
	const deleteApi = useApi(general.deleteOrMarkSold);

	const getBids = async () => {
		await myBidApi.request(item.alternateKey);
	};
	const postBid = async (bidAmount) => {
		await addBidApi.request(bidAmount, item.alternateKey);
		getBids();
	};
	const saveItem = async () => {
		const { data } = await saveItemApi.request(item.alternateKey, 'VA');
		if (data.statusCode === 200) setSaved(!saved);
	};
	const updateDetails = async (adsData) => {
		setUpdateVisible(false);
		const { data } = await updateAdApi.request({
			...item,
			...adsData,
			userGId: user.user_id,
		});
		if (data?.statusCode === 200) alert('Add updated successfully');
	};
	const deleteAd = async () => {
		const { data } = await deleteApi.request(item.alternateKey, 3);
		console.log(data);
		if (data?.statusCode === 200) alert('Ad was deleted successfully');
	};
	const handleAdDelete = () => {
		Alert.alert('Delete', 'Are you sure?', [
			{ text: 'Yes', onPress: () => deleteAd(), style: 'destructive' },
			{ text: 'No' },
		]);
	};

	useEffect(() => {
		if (user.account_type === 'Client') getBids();
	}, []);

	const mappedImages = item.imageUrls?.map((image) => ({
		uri: image.url,
	}));

	return (
		<View>
			<BackButton />
			<ActivityIndicator
				visible={
					myBidApi.loading ||
					addBidApi.loading ||
					saveItemApi.loading ||
					updateAdApi.loading ||
					deleteApi.loading
				}
			/>

			<View style={{ width: '100%', height: '30%' }}>
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
				{item.imageUrls.map((image, index) => {
					return (
						<TouchableOpacity
							key={image.alternateKey}
							onPress={() => setImagesVisible(true)}
						>
							<Image source={{ uri: image.url }} style={styles.image} />
						</TouchableOpacity>
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
						onPress={() => setBidVisible(true)}
					/>
				</>
			)}
			<ActionButtons
				deleteAble={deleteAble}
				saveAble={saveAble}
				updateAble={updateAble}
				saved={saved}
				onSave={saveItem}
				onUpdate={() => setUpdateVisible(true)}
				onDelete={handleAdDelete}
			/>

			<ImageView
				images={mappedImages}
				imageIndex={0}
				visible={imagesVisible}
				onRequestClose={() => setImagesVisible(false)}
			/>

			<AppModal
				visible={bidVisible}
				heading="Give Your bid"
				onVisible={() => setBidVisible(false)}
			>
				<AppForm
					initialValues={{
						bid: '',
					}}
					onSubmit={(formData) => {
						setBidVisible(false);
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

			<AppModal
				heading="Update Ad"
				visible={updateVisible}
				onVisible={() => setUpdateVisible(false)}
			>
				<AppForm
					initialValues={{
						title: item.title,
						price: item.price.toString(),
						description: item.description,
					}}
					onSubmit={updateDetails}
					validationSchema={validationSchema}
				>
					<AppFormField name="title" placeholder="Title" />
					<AppFormField
						keyboardType="numeric"
						width={'70%'}
						name="price"
						placeholder="Price"
					/>
					<AppFormField name="description" placeholder="Description" />
					<SubmitButton title="Update" />
				</AppForm>
			</AppModal>
		</View>
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
		width: 120,
		height: 120,
		borderRadius: 30,
		marginHorizontal: 10,
	},
	meta: {
		// position: 'absolute',
		top: SPACING * 4,
		left: SPACING,
		width: width * 0.6,
		marginBottom: 10,
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
