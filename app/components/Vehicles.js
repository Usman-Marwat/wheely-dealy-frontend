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
import { MaterialIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';

import routes from '../navigation/routes';
import colors from '../config/colors';

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
	sellAble,
	ownAd,
	visitor,
}) => {
	return (
		<FlatList
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ padding: SPACING, paddingVertical: 40 }}
			data={vehicles}
			keyExtractor={(item) => item.alternateKey}
			refreshControl={<RefreshControl onRefresh={onRefresh} />}
			renderItem={({ item }) => {
				return (
					<TouchableOpacity
						onPress={
							visitor
								? () => alert('For details please login')
								: () =>
										navigation.navigate(routes.ADS_LIST_DETAIL, {
											item,
											saveAble,
											updateAble,
											deleteAble,
											sellAble,
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
								<View style={styles.row}>
									<FontAwesome
										name="automobile"
										size={18}
										color={colors.primary}
									/>
									<Text> {item.bodyType.title}</Text>
								</View>
								<View style={styles.row}>
									<FontAwesome5
										name="gas-pump"
										size={20}
										color={colors.primary}
									/>
									<Text> {item.fuelType.title}</Text>
								</View>
								<View style={styles.row}>
									<FontAwesome5 name="city" size={17} color={colors.primary} />
									<Text> {item.registrationCity.title}</Text>
								</View>
								<View style={styles.row}>
									<MaterialIcons
										name="autorenew"
										size={20}
										color={colors.primary}
									/>
									<Text> {item.transmissionType.title}</Text>
								</View>
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
		fontWeight: '500',
		fontSize: Platform.OS === 'android' ? 18 : 20,
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
	},
	price: {
		fontSize: 12,
		fontWeight: '700',
		opacity: 0.7,
		marginTop: 10,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 7,
		marginBottom: 10,
	},
});
