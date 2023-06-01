import {
	Image,
	Text,
	TouchableOpacity,
	View,
	StyleSheet,
	ScrollView,
	Alert,
} from 'react-native';
import { useState } from 'react';
import * as Yup from 'yup';
import * as Animatable from 'react-native-animatable';
import ImageView from 'react-native-image-viewing';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

import dashboard from '../api/dashboard';
import useApi from '../hooks/useApi';
import ActivityIndicator from '../components/ActivityIndicator';
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
	const [mapVisible, setMapVisible] = useState(false);
	const [isUserVisible, setUserVisible] = useState(false);

	const { user } = useAuth();

	const saveItemApi = useApi(dashboard.saveAnItem);
	const updateAdApi = useApi(seller.updateServiceAd);
	const deleteApi = useApi(general.deleteOrMarkSold);

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

	const mappedImages = service.imageUrls?.map((image) => ({
		uri: image.url,
	}));

	return (
		<>
			<MenuFoldButton />
			<BackButton />

			<ActivityIndicator
				visible={
					saveItemApi.loading || updateAdApi.loading || deleteApi.loading
				}
			/>

			<View style={styles.dataContainer}>
				<View>
					<Text style={styles.model}>{service.title}</Text>
					<Text style={styles.price}>Rs {service.price}</Text>
					<Text>{service.contactNo}</Text>
					<Text>{service.description}</Text>
				</View>
				<TouchableOpacity
					onPress={() => setMapVisible(true)}
					style={styles.mapIcon}
				>
					<Entypo name="location-pin" size={30} color="#98AFC7" />
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
			{!ownAd && (
				<TouchableOpacity
					style={styles.userButton}
					onPress={() => setUserVisible(!isUserVisible)}
				>
					<View style={{ alignItems: 'center', padding: 7 }}>
						<Text style={{ fontWeight: '500' }}>see user details</Text>
						<MaterialIcons size={20} name="expand-more" />
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

			<ActionButtons
				deleteAble={deleteAble}
				saveAble={saveAble}
				updateAble={updateAble}
				saved={saved}
				onSave={saveItem}
				onUpdate={() => setVisible(true)}
				onDelete={handleAdDelete}
			/>

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
		</>
	);
};

export default ServiceDetails;

const styles = StyleSheet.create({
	dataContainer: {
		width: '100%',
		height: '30%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 35,
		padding: 10,
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
	mapIcon: {
		marginRight: 40,
		marginBottom: 20,
		borderRadius: '50%',
		borderWidth: 0.3,
		borderColor: '#98AFC7',
	},
});
