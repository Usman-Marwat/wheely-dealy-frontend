import {
	FlatList,
	Image,
	RefreshControl,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} from 'react-native';

import routes from '../navigation/routes';
import { FontAwesome } from '@expo/vector-icons';

const Services = ({
	navigation,
	services,
	onRefresh,
	saveAble,
	updateAble,
}) => {
	return (
		<View style={{ flex: 1 }}>
			<FlatList
				data={services}
				keyExtractor={(item) => item.alternateKey}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingTop: 60 }}
				refreshControl={<RefreshControl onRefresh={onRefresh} />}
				renderItem={({ item, index }) => {
					const uri = item.imageUrls[0]?.url;
					return (
						<>
							<View style={[styles.itemContainer]}>
								<View style={styles.itemWrapper}>
									{uri && <Image source={{ uri }} style={styles.image} />}
									<View style={{ flexShrink: 1 }}>
										<Text style={styles.category}>{item.title}</Text>
										<Text style={styles.memberText}>{item.description}</Text>
									</View>
									<TouchableOpacity
										onPress={() =>
											navigation.navigate(routes.SERVICE_DETAIL, {
												service: item,
												saveAble,
												updateAble,
											})
										}
									>
										<FontAwesome name={'chevron-circle-right'} size={30} />
									</TouchableOpacity>
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
		justifyContent: 'space-between',
		padding: 20,
	},
});
