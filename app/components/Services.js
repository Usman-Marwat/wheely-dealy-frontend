import {
	Button,
	FlatList,
	Image,
	Modal,
	StyleSheet,
	Text,
	View,
	RefreshControl,
} from 'react-native';
import React, { useState } from 'react';

import colors from '../config/colors';
import TouchableIcon from './TouchableIcon';

const Services = ({ services, onRefresh }) => {
	const [visible, setVisible] = useState(false);
	const [service, setService] = useState(null);

	return (
		<View style={{ flex: 1 }}>
			<FlatList
				data={services}
				keyExtractor={(item) => item.alternateKey}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingTop: 60 }}
				refreshControl={<RefreshControl onRefresh={onRefresh} />}
				renderItem={({ item, index }) => {
					return (
						<>
							<View style={[styles.itemContainer]}>
								<View style={styles.itemWrapper}>
									<Image
										source={{ uri: item.imageUrls[0]?.url }}
										style={styles.image}
									/>
									<View style={{ flexShrink: 1 }}>
										<Text style={styles.category}>{item.title}</Text>
										<Text style={styles.memberText}>{item.description}</Text>
									</View>
									<View style={styles.orderDetails}>
										<TouchableIcon
											name="details"
											size={44}
											iconColor={colors.primary}
											backgroundColor="transparent"
											onPress={() => {
												setService(item);
												setVisible(true);
											}}
										/>
									</View>
								</View>
							</View>
						</>
					);
				}}
			/>

			{service && (
				<Modal visible={visible} animationType="slide">
					<Button title="X" onPress={() => setVisible(false)} />
					<Text style={{ fontWeight: '700' }}>Service Data:</Text>
					<Text>{service.title}</Text>
					<Text>{service.price}</Text>
					<Text>{service.description}</Text>
					<Text style={{ fontWeight: '700' }}>User Data:</Text>
					<Text> {service.user.name}</Text>
					<Text> {service.user.phoneNo}</Text>
					<Text> {service.user.email}</Text>
					<FlatList
						data={service.imageUrls}
						keyExtractor={(url) => url.alternateKey}
						renderItem={({ image, index }) => (
							<Image
								style={{ width: 70, height: 70 }}
								source={{ uri: image.url }}
							/>
						)}
					/>
				</Modal>
			)}
		</View>
	);
};

export default Services;

const styles = StyleSheet.create({
	category: {
		fontSize: 22,
		fontWeight: '700',
	},
	image: {
		width: 70,
		height: 70,
		borderRadius: 70,
		marginRight: 20,
	},
	itemContainer: {
		marginVertical: 10,
		marginHorizontal: 10,
		borderRadius: 12,
		backgroundColor: 'white',

		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.3,
		shadowRadius: 20,
		borderWidth: 0.5,
	},
	itemWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 20,
	},
	orderDetails: {
		position: 'absolute',
		right: 17,
	},
});
