import {
	StyleSheet,
	Image,
	Text,
	View,
	FlatList,
	TouchableOpacity,
	RefreshControl,
} from 'react-native';
import React from 'react';
import { SharedElement } from 'react-navigation-shared-element';
import routes from '../navigation/routes';

const SPACING = 10;
const ITEM_SIZE = 120;
const BG_COLOR = '#C1CEE077';

const Vehicles = ({
	navigation,
	vehicles,
	onRefresh,
	saveAble,
	updateAble,
	deleteAble,
	ownAd,
}) => {
	return (
		<FlatList
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ padding: SPACING, paddingVertical: 60 }}
			data={vehicles}
			keyExtractor={(item) => item.alternateKey}
			refreshControl={<RefreshControl onRefresh={onRefresh} />}
			renderItem={({ item }) => {
				return (
					<TouchableOpacity
						onPress={() =>
							navigation.navigate(routes.ADS_LIST_DETAIL, {
								item,
								saveAble,
								updateAble,
								deleteAble,
								ownAd,
							})
						}
					>
						<View style={styles.item}>
							<SharedElement id={`item.${item.key}.modal`}>
								<Text style={styles.model}>{item.title}</Text>
							</SharedElement>

							<SharedElement>
								<Text style={styles.price}>Rs {item.price}</Text>
							</SharedElement>
							<View style={{ marginTop: 10, marginLeft: -5 }}>
								<Text> Body: {item.bodyType.title}</Text>
								<Text> Fuel: {item.fuelType.title}</Text>
								<Text> Registeration: {item.registrationCity.title}</Text>
								<Text> Transmission: {item.transmissionType.title}</Text>
							</View>

							<Image
								source={{ uri: item.imageUrls[0].url }}
								style={styles.image}
							/>
						</View>
					</TouchableOpacity>
				);
			}}
		/>
	);
};

export default Vehicles;

const styles = StyleSheet.create({
	description: {
		fontSize: 12,
		opacity: 0.7,
		marginVertical: 10,
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
		width: '50%',
		bottom: 10,
		right: '0%',
		padding: 10,
		borderRadius: 20,
		position: 'absolute',
	},
	model: {
		fontSize: 18,
		fontWeight: '700',
	},
	price: {
		fontSize: 12,
		fontWeight: '700',
		opacity: 0.7,
		marginTop: 10,
	},
});
