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

const Vehicles = ({ navigation, vehicles, onRefresh }) => {
	return (
		<FlatList
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ padding: SPACING }}
			data={vehicles}
			keyExtractor={(item) => item.alternateKey}
			refreshControl={<RefreshControl onRefresh={onRefresh} />}
			renderItem={({ item }) => {
				return (
					<TouchableOpacity
						onPress={() =>
							navigation.navigate(routes.ADS_LIST_DETAIL, { item })
						}
					>
						<View style={styles.item}>
							<View>
								<SharedElement id={`item.${item.key}.modal`}>
									<Text style={styles.model}>{item.title}</Text>
								</SharedElement>
								<SharedElement id={`item.${item.key}.description`}>
									<Text style={styles.description}>{item.description}</Text>
								</SharedElement>
								<SharedElement>
									<Text style={styles.price}>Rs {item.price}</Text>
								</SharedElement>
							</View>
							<SharedElement id={`item.${item.key}.image`} style={styles.image}>
								<Image
									source={{ uri: item.imageUrls[0].url }}
									style={{ flex: 1, resizeMode: 'contain' }}
								/>
							</SharedElement>
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
		position: 'absolute',
		top: SPACING + 17,
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
		width: '100%',
		position: 'absolute',
		bottom: 10,
		right: '-30%',
		padding: 10,
	},
	model: {
		fontSize: 18,
		fontWeight: '700',
		position: 'absolute',
	},
	price: {
		fontSize: 12,
		fontWeight: '700',
		opacity: 0.7,
		position: 'absolute',
		top: SPACING + 47,
	},
});
