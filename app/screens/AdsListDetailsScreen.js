import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
	Alert,
	Dimensions,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import ImageView from 'react-native-image-viewing';
import { SharedElement } from 'react-navigation-shared-element';
import * as Yup from 'yup';

import { useChatContext } from 'stream-chat-expo';
import userAds from '../api/ad';
import dashboard from '../api/dashboard';
import clientApi from '../api/client';
import general from '../api/general';
import seller from '../api/seller';
import useAuth from '../auth/useAuth';
import ActionButtons from '../components/ActionButtons';
import ActivityIndicator from '../components/ActivityIndicator';
import AppModal from '../components/AppModal';
import MapLocationPicker from '../components/MapLocationPicker';
import UserCard from '../components/UserCard';
import { AppForm, AppFormField, SubmitButton } from '../components/forms';
import randomAvatars from '../config/randomAvatars';
import useApi from '../hooks/useApi';
import BackButton from '../navigation/BackButton';
import routes from '../navigation/routes';
import colors from '../config/colors';

const BG_IMG =
	'https://images.unsplash.com/photo-1602786195490-c785a218df40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fGNhcnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60';

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

const { width } = Dimensions.get('window');
const SPACING = 10;

const AdsListDetailsScreen = ({ navigation, route }) => {
	const { item, saveAble, updateAble, deleteAble, ownAd, sellAble } =
		route.params;
	const { client } = useChatContext();
	const [saved, setSaved] = useState(item.savedByCurrentUser);
	const [bidVisible, setBidVisible] = useState(false);
	const [dealVisible, setDealVisible] = useState(false);
	const [updateVisible, setUpdateVisible] = useState(false);
	const [imagesVisible, setImagesVisible] = useState(false);
	const [mapVisible, setMapVisible] = useState(false);
	const [isUserVisible, setUserVisible] = useState(false);
	const { user } = useAuth();

	const myBidApi = useApi(userAds.getMyBidOnAd);
	const addBidApi = useApi(userAds.bidOnAd);
	const saveItemApi = useApi(dashboard.saveAnItem);
	const updateAdApi = useApi(seller.updateAd);
	const deleteApi = useApi(general.deleteOrMarkSold);
	const markAsSoldApi = useApi(general.deleteOrMarkSold);
	const claimDealApi = useApi(clientApi.claimDeal);

	const getBids = async () => {
		await myBidApi.request(item.alternateKey);
	};
	const postBid = async (bidAmount) => {
		await addBidApi.request(bidAmount, item.alternateKey);
		getBids();
	};
	const markSold = async () => {
		const { data } = await markAsSoldApi.request(item.alternateKey, 4);
		if (data?.statusCode !== 200) return alert('Could mark the add as sold ');
		alert('Add was marked as sold');
	};
	const handleSell = () => {
		Alert.alert(`Mark as sold`, `Are you sure?`, [
			{ text: 'Yes', onPress: () => markSold(), style: 'destructive' },
			{ text: 'No' },
		]);
	};
	const saveItem = async () => {
		const { data } = await saveItemApi.request(item.alternateKey, 'VA');
		if (data.statusCode === 200) setSaved(!saved);
	};
	const navigateBack = (action) => {
		Alert.alert(`${action} Status`, `Ad was ${action}ed successfully`, [
			{ text: 'ok', onPress: () => navigation.goBack() },
		]);
	};

	const updateDetails = async (adsData) => {
		setUpdateVisible(false);
		const { data } = await updateAdApi.request({
			...item,
			...adsData,
			userGId: user.user_id,
		});
		if (data?.statusCode !== 200) return alert('Could not update the ad');

		navigateBack('Update');
	};
	const deleteAd = async () => {
		const { data } = await deleteApi.request(item.alternateKey, 3);

		if (data?.statusCode !== 200) return alert('Could not delete the add');

		navigateBack('Delete');
	};
	const handleAdDelete = () => {
		Alert.alert('Delete', 'Are you sure?', [
			{ text: 'Yes', onPress: () => deleteAd(), style: 'destructive' },
			{ text: 'No' },
		]);
	};
	const handleChat = async (chatUserId) => {
		try {
			const channel = client.channel('messaging', {
				members: [chatUserId, user.user_id],
			});
			await channel.watch();
			navigation.navigate('Channel', { cid: channel.cid });
		} catch (error) {
			alert('The selected user is not registered with chat Api');
		}
	};
	const claimDeal = async (formData) => {
		const { data } = await claimDealApi.request({
			vehicleAdId: item.alternateKey,
			...formData,
		});
		if (data?.statusCode !== 200) return alert('Could not claim the deal');
		alert('Deal was claimed successfully, Now seller will approve');
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
					deleteApi.loading ||
					claimDealApi.loading ||
					markAsSoldApi.loading
				}
			/>

			<View style={styles.dataContainer}>
				<Image
					source={{ uri: BG_IMG }}
					style={StyleSheet.absoluteFillObject}
					blurRadius={70}
				/>
				<View style={styles.meta}>
					<SharedElement id={`item.${item.key}.modal`}>
						<Text numberOfLines={1} adjustsFontSizeToFit style={styles.model}>
							{item.title}
						</Text>
					</SharedElement>

					<SharedElement>
						<Text style={styles.price}>Rs {item.price}</Text>
					</SharedElement>
					<View style={{ marginLeft: -3 }}>
						<Text style={{ color: 'lightgrey' }}>
							Body: {item.bodyType.title}
						</Text>
						<Text style={{ color: 'lightgrey' }}>
							Fuel: {item.fuelType.title}
						</Text>
						<Text style={{ color: 'lightgrey' }}>
							Registeration: {item.registrationCity.title}
						</Text>
						<Text style={{ color: 'lightgrey' }}>
							Transmission: {item.transmissionType.title}
						</Text>
					</View>
				</View>
				<TouchableOpacity
					onPress={() => setMapVisible(true)}
					style={styles.mapIcon}
				>
					<Entypo name="location-pin" size={30} color="white" />
				</TouchableOpacity>
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
			<ActionButtons
				deleteAble={deleteAble}
				saveAble={saveAble}
				updateAble={updateAble}
				sellAble={sellAble}
				saved={saved}
				onSave={saveItem}
				onSell={handleSell}
				onUpdate={() => setUpdateVisible(true)}
				onDelete={handleAdDelete}
			/>

			{!ownAd && (
				<TouchableOpacity
					style={styles.userButton}
					onPress={() => setUserVisible(!isUserVisible)}
				>
					<View style={styles.userDetailBtn}>
						<Text style={{ fontWeight: '500', color: 'white' }}>
							see user details
						</Text>
						<MaterialIcons size={20} name="expand-more" color="white" />
					</View>
				</TouchableOpacity>
			)}

			{isUserVisible && (
				<Animatable.View
					animation="slideInLeft"
					delay={10}
					style={{ alignItems: 'center' }}
				>
					<TouchableOpacity onPress={() => handleChat(item.user.alternateKey)}>
						<UserCard
							email={item.user.email}
							name={item.user.name}
							imageUri={randomAvatars()}
						/>
					</TouchableOpacity>
				</Animatable.View>
			)}

			{ownAd && (
				<Animatable.View useNativeDriver animation={animation} delay={700}>
					<TouchableOpacity
						style={[styles.rowButton, { marginTop: 20 }]}
						onPress={() =>
							navigation.navigate(routes.BIDS_LIST, {
								adId: item.alternateKey,
							})
						}
					>
						<View style={[styles.dealBtn, { padding: 13 }]}>
							<Text style={{ color: 'white' }}>See all the bids</Text>
						</View>
					</TouchableOpacity>
				</Animatable.View>
			)}

			{user.account_type === 'Client' && (
				<>
					<View style={styles.rowButton}>
						<Text style={{ fontWeight: '700', marginTop: 10 }}>
							Your current bid:{myBidApi.data?.obj.bidAmount}{' '}
						</Text>
					</View>
					<View style={styles.dealBtnWrapper}>
						<TouchableOpacity
							style={[styles.rowButton]}
							onPress={() => setBidVisible(true)}
						>
							<View style={styles.dealBtn}>
								<Text style={{ color: 'white' }}>Give Your Bid </Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.rowButton]}
							onPress={() => setDealVisible(true)}
						>
							<View style={styles.dealBtn}>
								<Text style={{ color: 'white' }}>claim Deal </Text>
							</View>
						</TouchableOpacity>
					</View>
				</>
			)}

			<ImageView
				images={mappedImages}
				imageIndex={0}
				visible={imagesVisible}
				onRequestClose={() => setImagesVisible(false)}
			/>

			<MapLocationPicker
				visible={mapVisible}
				onPress={() => setMapVisible(false)}
				region={{
					latitude: item.latitude,
					longitude: item.longitude,
					latitudeDelta: 0.09,
					longitudeDelta: 0.09,
				}}
				onAddlocation={(coords) => {}}
				buttonTitle="close"
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

			<AppModal
				heading="Claim Deal "
				visible={dealVisible}
				onVisible={() => setDealVisible(false)}
			>
				<AppForm
					initialValues={{
						dealPrice: '',
						ratingScore: '',
						review: '',
					}}
					onSubmit={(formData) => {
						setDealVisible(false);
						claimDeal(formData);
					}}
					// validationSchema={validationSchema}
				>
					<AppFormField
						name="dealPrice"
						placeholder="Deal Price"
						keyboardType="numeric"
					/>
					<AppFormField
						keyboardType="numeric"
						width="50%"
						name="ratingScore"
						placeholder="Rate Seller 1-5"
					/>
					<AppFormField name="review" placeholder="Review" />
					<SubmitButton title="Claim" />
				</AppForm>
			</AppModal>
		</View>
	);
};

export default AdsListDetailsScreen;

const styles = StyleSheet.create({
	dataContainer: {
		width: '100%',
		// height: '30%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: 60,
		padding: 10,
	},
	dealBtn: {
		borderRadius: 30,
		padding: 7,
		backgroundColor: colors.primary,
	},
	dealBtnWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginHorizontal: 30,
		marginTop: 20,
	},
	description: {
		fontSize: 12,
		opacity: 0.7,
	},
	image: {
		width: 120,
		height: 120,
		borderRadius: 30,
		marginHorizontal: 10,
	},
	meta: {
		width: width * 0.6,
		marginBottom: 10,
	},
	model: {
		fontSize: 32,
		fontWeight: '700',
	},
	price: {
		fontSize: 18,
		fontWeight: '700',
		opacity: 0.7,
	},
	rowButton: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	location: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 5,
	},
	userButton: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	userDetailBtn: {
		alignItems: 'center',
		padding: 10,
		backgroundColor: colors.primary,
		borderRadius: 30,
	},
	mapIcon: {
		marginRight: 40,
		marginBottom: 20,
		borderRadius: '50%',
		borderWidth: 0.3,
		borderColor: '#98AFC7',
	},
});
