import {
	Dimensions,
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
import niceColors from 'nice-color-palettes';
import Screen from './Screen';
import { AntDesign } from '@expo/vector-icons';

import routes from '../navigation/routes';
import { useState } from 'react';

const SPACING = 10;
const colors = [
	...niceColors[1].slice(1, niceColors[1].length),
	...niceColors[55].slice(0, 3),
];
const images = [
	'https://cdn-icons-png.flaticon.com/256/4105/4105443.png',
	'https://cdn-icons-png.flaticon.com/256/4105/4105444.png',
	'https://cdn-icons-png.flaticon.com/256/4105/4105445.png',
	'https://cdn-icons-png.flaticon.com/256/4105/4105446.png',
	'https://cdn-icons-png.flaticon.com/256/4105/4105447.png',
	'https://cdn-icons-png.flaticon.com/256/4105/4105448.png',
	'https://cdn-icons-png.flaticon.com/256/4105/4105449.png',
	'https://cdn-icons-png.flaticon.com/256/4105/4105450.png',
	'https://cdn-icons-png.flaticon.com/256/4105/4105451.png',
	'https://cdn-icons-png.flaticon.com/256/4105/4105452.png',
	'https://cdn-icons-png.flaticon.com/256/4105/4105453.png',
	'https://cdn-icons-png.flaticon.com/256/4105/4105454.png',
	'https://cdn-icons-png.flaticon.com/256/4105/4105455.png',
	'https://cdn-icons-png.flaticon.com/256/4105/4105456.png',
	'https://cdn-icons-png.flaticon.com/256/4105/4105457.png',
	'https://cdn-icons-png.flaticon.com/256/4105/4105458.png',
	'https://cdn-icons-png.flaticon.com/256/4105/4105459.png',
	'https://cdn-icons-png.flaticon.com/256/4105/4105460.png',
	'https://cdn-icons-png.flaticon.com/256/4105/4105461.png',
	'https://cdn-icons-png.flaticon.com/256/4105/4105462.png',
	'https://cdn-icons-png.flaticon.com/256/4359/4359980.png',
	'https://cdn-icons-png.flaticon.com/256/4105/4105447.png',
	'https://cdn-icons-png.flaticon.com/256/4105/4105445.png',
	'https://cdn-icons-png.flaticon.com/256/4359/4359995.png',
	'https://cdn-icons-png.flaticon.com/256/7102/7102052.png',
	'https://cdn-icons-png.flaticon.com/256/4392/4392529.png',
	'https://cdn-icons-png.flaticon.com/256/6823/6823056.png',
	'https://cdn-icons-png.flaticon.com/256/6599/6599071.png',
	'https://cdn-icons-png.flaticon.com/256/8326/8326716.png',
	'https://cdn-icons-png.flaticon.com/256/8326/8326730.png',
	'https://cdn-icons-png.flaticon.com/256/5907/5907040.png',
	'https://cdn-icons-png.flaticon.com/256/4193/4193253.png',
	'https://cdn-icons-png.flaticon.com/256/4193/4193257.png',
	'https://cdn-icons-png.flaticon.com/256/4193/4193258.png',
	'https://cdn-icons-png.flaticon.com/256/4193/4193276.png',
	'https://cdn-icons-png.flaticon.com/256/4193/4193278.png',
	'https://cdn-icons-png.flaticon.com/256/4193/4193281.png',
	'https://cdn-icons-png.flaticon.com/256/4193/4193286.png',
	'https://cdn-icons-png.flaticon.com/256/4193/4193289.png',
	'https://cdn-icons-png.flaticon.com/256/4193/4193305.png',
	'https://cdn-icons-png.flaticon.com/256/8587/8587562.png',
	'https://cdn-icons-png.flaticon.com/256/7402/7402922.png',
	'https://cdn-icons-png.flaticon.com/256/8662/8662349.png',
	'https://cdn-icons-png.flaticon.com/256/8662/8662176.png',
	'https://cdn-icons-png.flaticon.com/256/8662/8662182.png',
	'https://cdn-icons-png.flaticon.com/256/8662/8662190.png',
	'https://cdn-icons-png.flaticon.com/256/8662/8662204.png',
	'https://cdn-icons-png.flaticon.com/256/8662/8662218.png',
	'https://cdn-icons-png.flaticon.com/256/8662/8662230.png',
	'https://cdn-icons-png.flaticon.com/256/8662/8662245.png',
	'https://cdn-icons-png.flaticon.com/256/8662/8662187.png',
	'https://cdn-icons-png.flaticon.com/256/8662/8662276.png',
	'https://cdn-icons-png.flaticon.com/256/8662/8662299.png',
	'https://cdn-icons-png.flaticon.com/256/8662/8662311.png',
	'https://cdn-icons-png.flaticon.com/256/8662/8662349.png',
	'https://cdn-icons-png.flaticon.com/256/8662/8662201.png',
	'https://cdn-icons-png.flaticon.com/256/8662/8662216.png',
	'https://cdn-icons-png.flaticon.com/256/8662/8662222.png',
	'https://cdn-icons-png.flaticon.com/256/8662/8662228.png',
	'https://cdn-icons-png.flaticon.com/256/8662/8662234.png',
	'https://cdn-icons-png.flaticon.com/256/8662/8662241.png',
	'https://cdn-icons-png.flaticon.com/256/8662/8662248.png',
	'https://cdn-icons-png.flaticon.com/256/8662/8662255.png',
	'https://cdn-icons-png.flaticon.com/256/8662/8662264.png',
	'https://cdn-icons-png.flaticon.com/256/8662/8662274.png',
	'https://cdn-icons-png.flaticon.com/256/8662/8662283.png',
	'https://cdn-icons-png.flaticon.com/256/8662/8662291.png',
	'https://cdn-icons-png.flaticon.com/256/8662/8662298.png',
	'https://cdn-icons-png.flaticon.com/256/8662/8662305.png',
	'https://cdn-icons-png.flaticon.com/256/8662/8662310.png',
	'https://cdn-icons-png.flaticon.com/256/8662/8662316.png',
	'https://cdn-icons-png.flaticon.com/256/8662/8662329.png',
	'https://cdn-icons-png.flaticon.com/256/8662/8662338.png',
	'https://cdn-icons-png.flaticon.com/256/8662/8662347.png',
	'https://cdn-icons-png.flaticon.com/256/8662/8662356.png',
	'https://cdn-icons-png.flaticon.com/256/8662/8662363.png',
];
const { height, width } = Dimensions.get('window');
const ITEM_HEIGHT = height * 0.18;

const Profiles = ({ navigation, profiles, onRefresh, visitor }) => {
	return (
		<Screen>
			<FlatList
				contentContainerStyle={{ padding: SPACING, paddingTop: 40 }}
				data={profiles}
				keyExtractor={(item) => item.alternateKey}
				refreshControl={<RefreshControl onRefresh={onRefresh} />}
				renderItem={({ item }) => {
					const color = colors[Math.floor(Math.random() * colors.length)];
					const image = images[Math.floor(Math.random() * images.length - 1)];
					return (
						<TouchableOpacity
							onPress={
								visitor
									? () => alert('For details please login')
									: () => {
											navigation.navigate(routes.USER_DETAILS, {
												item: { ...item, color, image },
											});
									  }
							}
							style={styles.itemWrapper}
						>
							<View style={{ flex: 1, padding: SPACING }}>
								<SharedElement
									id={`item.${item.key}.bg`}
									style={StyleSheet.absoluteFillObject}
								>
									<View style={[styles.bg, { backgroundColor: color }]} />
								</SharedElement>
								<SharedElement id={`item.${item.key}.name`}>
									<Text style={styles.profileName}>{item.name}</Text>
								</SharedElement>
								<Text style={styles.jobTitle}>
									{item?.accountType?.type || item.email}
								</Text>
								<SharedElement
									id={`item.${item.key}.image`}
									style={styles.profileImage}
								>
									<Image
										source={{ uri: item.profilePictureURL || image }}
										style={styles.profileImage}
									/>
								</SharedElement>
								<View style={styles.action}>
									<AntDesign
										name={item.followedByCurrentUser ? 'heart' : 'hearto'}
										size={25}
										color="#fc5c65"
									/>
								</View>
							</View>
						</TouchableOpacity>
					);
				}}
			/>
			<SharedElement id="general.bg">
				<View style={styles.overlay} />
			</SharedElement>
		</Screen>
	);
};

export default Profiles;

const styles = StyleSheet.create({
	bg: {
		borderRadius: 16,
		...StyleSheet.absoluteFillObject,
	},
	profileImage: {
		width: ITEM_HEIGHT * 1.2,
		height: ITEM_HEIGHT * 0.9,
		resizeMode: 'contain',
		position: 'absolute',
		bottom: 0,
		right: SPACING,
	},
	itemWrapper: {
		marginBottom: SPACING,
		height: ITEM_HEIGHT,
	},
	jobTitle: {
		fontSize: 11,
		opacity: 0.7,
	},
	profileName: {
		fontWeight: '700',
		fontSize: 18,
	},
	overlay: {
		position: 'absolute',
		width,
		height,
		backgroundColor: 'red',
		transform: [{ translateY: height }],
		borderRadius: 32,
	},
	action: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 20,
	},
	actionText: {
		marginLeft: 4,
		fontSize: 12,
		color: '#fc5c65',
	},
});
