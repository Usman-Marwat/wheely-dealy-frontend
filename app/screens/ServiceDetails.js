import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity } from 'react-native';

import dashboard from '../api/dashboard';
import useApi from '../hooks/useApi';
import Header from '../components/Header';
import ActivityIndicator from '../components/ActivityIndicator';

const ServiceDetails = ({ route }) => {
	const { service, saveAble } = route.params;
	const [saved, setSaved] = useState(service.savedByCurrentUser);

	const saveItemApi = useApi(dashboard.saveAnItem);

	const saveItem = async () => {
		const { data } = await saveItemApi.request(service.alternateKey, 'SA');
		if (data.statusCode === 200) setSaved(!saved);
	};
	return (
		<>
			<Header />
			<ActivityIndicator visible={saveItemApi.loading} />

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
					<Image style={{ width: 70, height: 70 }} source={{ uri: item.url }} />
				)}
			/>
			{saveAble && (
				<TouchableOpacity
					style={{ marginTop: 30, alignItems: 'center' }}
					onPress={saveItem}
				>
					<FontAwesome name={saved ? 'bookmark' : 'bookmark-o'} size={40} />
				</TouchableOpacity>
			)}
		</>
	);
};

export default ServiceDetails;
