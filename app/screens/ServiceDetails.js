import {
	Image,
	Text,
	TouchableOpacity,
	View,
	StyleSheet,
	ScrollView,
	Alert,
	Platform,
} from 'react-native';
import { useState } from 'react';
import * as Yup from 'yup';
import * as Animatable from 'react-native-animatable';
import ImageView from 'react-native-image-viewing';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

import dashboard from '../api/dashboard';
import useApi from '../hooks/useApi';
import ActivityIndicator from '../components/ActivityIndicator';
import clientApi from '../api/client';
import { AppForm, AppFormField, SubmitButton } from '../components/forms';
import AppModal from '../components/AppModal';
import seller from '../api/seller';
import useAuth from '../auth/useAuth';
import ActionButtons from '../components/ActionButtons';
import MapLocationPicker from '../components/MapLocationPicker';
import general from '../api/general';
import MenuFoldButton from '../navigation/MenuFoldButton';
import BackButton from '../navigation/BackButton';
import UserCard from '../components/UserCard';
import randomAvatars from '../config/randomAvatars';
import { useChatContext } from 'stream-chat-expo';
import colors from '../config/colors';

const BG_IMG =
	'https://images.unsplash.com/photo-1555353540-64580b51c258?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNhcnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60';

const AnimatableScrollview = Animatable.createAnimatableComponent(ScrollView);
const animation = {
	0: { opacity: 0, translateX: 50 },
	1: { opacity: 1, translateX: 0 },
};

const validationSchema = Yup.object().shape({
	price: Yup.number().required().min(1).label('Price'),
	description: Yup.string().label('Description'),
});

const ServiceDetails = ({ navigation, route }) => {
	const { service, saveAble, updateAble, deleteAble, ownAd } = route.params;
	const { client } = useChatContext();
	const [saved, setSaved] = useState(service.savedByCurrentUser);
	const [visible, setVisible] = useState(false);
	const [imagesVisible, setImagesVisible] = useState(false);
	const [dealVisible, setDealVisible] = useState(false);
	const [mapVisible, setMapVisible] = useState(false);
	const [isUserVisible, setUserVisible] = useState(false);
	const { user } = useAuth();

	const saveItemApi = useApi(dashboard.saveAnItem);
	const updateAdApi = useApi(seller.updateServiceAd);
	const deleteApi = useApi(general.deleteOrMarkSold);
	const claimDealApi = useApi(clientApi.claimServiceDeal);

	const saveItem = async () => {
		const { data } = await saveItemApi.request(service.alternateKey, 'SA');
		if (data.statusCode === 200) setSaved(!saved);
	};

	const navigateBack = (action) => {
		Alert.alert(`${action} Status`, `Ad was ${action}ed successfully`, [
			{ text: 'ok', onPress: () => navigation.goBack() },
		]);
	};
	const updateDetails = async (adsData) => {
		setVisible(false);
		const { data } = await updateAdApi.request({
			...service,
			...adsData,
			userGId: user.user_id,
		});
		if (data?.statusCode !== 200) return alert('Could not update the add');

		navigateBack('Update');
	};

	const deleteAd = async () => {
		const { data } = await deleteApi.request(service.alternateKey, 2);

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
			serviceAdId: service.alternateKey,
			...formData,
		});
		if (data?.statusCode !== 200) return alert('Could not claim the deal');
		alert('Deal was claimed successfully, Now seller will approve');
	};

	const mappedImages = service.imageUrls?.map((image) => ({
		uri: image.url,
	}));

	return (
		<>
			<ActivityIndicator
				visible={
					saveItemApi.loading ||
					updateAdApi.loading ||
					deleteApi.loading ||
					claimDealApi.loading
				}
			/>

			<View style={styles.dataContainer}>
				<Image
					source={{ uri: BG_IMG }}
					style={StyleSheet.absoluteFillObject}
					blurRadius={70}
				/>
				<View>
					<Text style={styles.model}>{service.title}</Text>
					<Text style={styles.price}>Rs {service.price}</Text>
					<View style={styles.row}>
						<MaterialIcons name="contact-phone" size={18} color="white" />
						<Text style={{ color: 'white' }}>{service.contactNo}</Text>
					</View>
					<View style={styles.row}>
						<MaterialIcons name="airplay" size={18} color="white" />
						<Text style={{ color: 'white' }}>{service.description}</Text>
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
				contentContainerStyle={{ padding: 10 }}
				style={{ flexGrow: 0, marginVertical: 10 }}
			>
				{service.imageUrls.map((image, index) => {
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
				saved={saved}
				onSave={saveItem}
				onUpdate={() => setVisible(true)}
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
					<TouchableOpacity
						onPress={() => handleChat(service.user.alternateKey)}
					>
						<UserCard
							email={service.user.email}
							name={service.user.name}
							imageUri={randomAvatars()}
						/>
					</TouchableOpacity>
				</Animatable.View>
			)}

			{!ownAd && user.account_type === 'Client' && (
				<TouchableOpacity
					style={{
						flexDirection: 'row',
						justifyContent: 'center',
						marginTop: 30,
					}}
					onPress={() => setDealVisible(true)}
				>
					<Text style={{ textDecorationLine: 'underline', fontWeight: '500' }}>
						claim Deal{' '}
					</Text>
				</TouchableOpacity>
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
					latitude: service.latitude,
					longitude: service.longitude,
					latitudeDelta: 0.09,
					longitudeDelta: 0.09,
				}}
				onAddlocation={(coords) => {}}
				buttonTitle="close"
			/>

			<AppModal
				heading="Update Ad"
				visible={visible}
				onVisible={() => setVisible(false)}
			>
				<AppForm
					initialValues={{
						price: service.price.toString(),
						description: service.description,
					}}
					onSubmit={updateDetails}
					validationSchema={validationSchema}
				>
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
		</>
	);
};

export default ServiceDetails;

const styles = StyleSheet.create({
	dataContainer: {
		width: '100%',
		minHeight: '30%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: 60,
		padding: 10,
	},
	model: {
		fontWeight: '500',
		fontSize: Platform.OS === 'android' ? 28 : 32,
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
	},
	price: {
		fontSize: 18,
		fontWeight: '700',
		opacity: 0.7,
		color: 'white',
		marginBottom: 7,
	},
	rowButtons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 20,
		paddingHorizontal: 10,
	},
	image: {
		width: 120,
		height: 120,
		borderRadius: 30,
		marginHorizontal: 10,
	},
	userDetailBtn: {
		alignItems: 'center',
		padding: 10,
		backgroundColor: colors.primary,
		borderRadius: 30,
		marginHorizontal: 140,
	},
	mapIcon: {
		marginRight: 40,
		marginBottom: 20,
		borderRadius: '50%',
		borderWidth: 0.3,
		borderColor: 'white',
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 7,
		marginBottom: 10,
	},
});
