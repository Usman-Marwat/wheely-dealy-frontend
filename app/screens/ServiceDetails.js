import {
	FlatList,
	Image,
	Text,
	TouchableOpacity,
	View,
	StyleSheet,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import * as Yup from 'yup';

import dashboard from '../api/dashboard';
import useApi from '../hooks/useApi';
import Header from '../components/Header';
import ActivityIndicator from '../components/ActivityIndicator';
import { AppForm, AppFormField, SubmitButton } from '../components/forms';
import AppModal from '../components/AppModal';
import seller from '../api/seller';
import useAuth from '../auth/useAuth';

const validationSchema = Yup.object().shape({
	price: Yup.number().required().min(1).label('Price'),
	description: Yup.string().label('Description'),
});

const ServiceDetails = ({ route }) => {
	const { service, saveAble } = route.params;
	const [saved, setSaved] = useState(service.savedByCurrentUser);
	const [visible, setVisible] = useState(false);
	const { user } = useAuth();

	const saveItemApi = useApi(dashboard.saveAnItem);
	const updateAdApi = useApi(seller.updateServiceAd);

	const saveItem = async () => {
		const { data } = await saveItemApi.request(service.alternateKey, 'SA');
		if (data.statusCode === 200) setSaved(!saved);
	};
	const updateDetails = async (adsData) => {
		// console.log({ ...service, ...adsData, userGId: user.user_id });

		setVisible(false);
		const { data } = await updateAdApi.request({
			...service,
			...adsData,
			userGId: user.user_id,
		});
		if (data?.statusCode === 200) alert('Add updated successfully');
	};

	return (
		<>
			<Header heading={service.title} />
			<ActivityIndicator visible={saveItemApi.loading || updateAdApi.loading} />

			<View style={{ padding: 10 }}>
				<View style={styles.rowButtons}>
					<TouchableOpacity onPress={() => setVisible(true)}>
						<FontAwesome name={'edit'} size={30} />
					</TouchableOpacity>

					{saveAble && (
						<TouchableOpacity onPress={saveItem}>
							<FontAwesome name={saved ? 'bookmark' : 'bookmark-o'} size={30} />
						</TouchableOpacity>
					)}
				</View>

				<Text style={{ fontWeight: '700' }}>Service Data:</Text>
				<Text>{service.title}</Text>
				<Text>{service.price}</Text>
				<Text>{service.description}</Text>
				<Text style={{ fontWeight: '700' }}>User Data:</Text>
				<Text> {service.user.name}</Text>
				<Text> {service.user.phoneNo}</Text>
				<Text> {service.user.email}</Text>
				<Text style={{ fontWeight: '700' }}>Images:</Text>
				<FlatList
					data={service.imageUrls}
					keyExtractor={(url) => url.alternateKey}
					renderItem={({ item, index }) => (
						<Image
							style={{ width: 70, height: 70 }}
							source={{ uri: item.url }}
						/>
					)}
				/>
			</View>

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
	rowButtons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 20,
		paddingHorizontal: 10,
	},
});
