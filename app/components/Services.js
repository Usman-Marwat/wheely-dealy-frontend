import {
	FlatList,
	Image,
	RefreshControl,
	StyleSheet,
	Text,
	View,
} from 'react-native';

import colors from '../config/colors';
import routes from '../navigation/routes';
import TouchableIcon from './TouchableIcon';

const Services = ({ navigation, services, onRefresh, saveAble }) => {
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
											onPress={() =>
												navigation.navigate(routes.SERVICE_DETAIL, {
													service: item,
													saveAble,
												})
											}
										/>
									</View>
								</View>
							</View>
						</>
					);
				}}
			/>
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
