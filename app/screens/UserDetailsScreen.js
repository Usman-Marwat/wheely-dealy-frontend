import {
	Dimensions,
	StyleSheet,
	Text,
	View,
	Image,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import { SharedElement } from 'react-navigation-shared-element';
import { AntDesign } from '@expo/vector-icons';

import colors from '../config/colors';
import BackButton from '../navigation/BackButton';
import userApi from '../api/user';
import authApi from '../api/auth';
import useApi from '../hooks/useApi';
import { useState } from 'react';
import ActivityIndicator from '../components/ActivityIndicator';
import dashboard from '../api/dashboard';
import { useChatContext } from 'stream-chat-expo';
import useAuth from '../auth/useAuth';

const { height, width } = Dimensions.get('window');
const ITEM_HEIGHT = height * 0.18;
const SPACING = 10;
const TOP_HEADER_HEIGHT = height * 0.3;
const detailsIcons = [
	{ color: '#9FD7F1', icon: 'wechat' },
	{ color: '#F3B000', icon: 'heart' },
	{ color: '#F2988F', icon: 'infocirlce' },
];
const DURATION = 400;

const UserDetailsScreen = ({ navigation, route }) => {
	const { client } = useChatContext();
	const [item, setItem] = useState(route.params.item);
	const { user } = useAuth();

	const followUserApi = useApi(userApi.followUser);
	const profileByIdApi = useApi(authApi.getProfileById);
	const profileViewApi = useApi(dashboard.getProfileView);

	const handleChat = async (chatUserId) => {
		try {
			const channel = client.channel('messaging', {
				members: [chatUserId, user.user_id],
			});
			await channel.watch();
			navigation.navigate('Channel', {
				cid: channel.cid,
				targetName: item.name,
			});
		} catch (error) {
			alert('The selected user is not registered iwth chat Api');
		}
	};
	const handleDetails = (icon) => {
		if (icon === 'heart') handleFollowUser(item.alternateKey);
		if (icon === 'infocirlce') getSingleProfile(item.alternateKey);
		if (icon === 'wechat') handleChat(item.alternateKey);
	};
	const handleFollowUser = async (followedId) => {
		const result = await followUserApi.request(followedId);
		if (result.data.statusCode === 200)
			setItem({ ...item, followedByCurrentUser: !item.followedByCurrentUser });
	};
	const getSingleProfile = async (userId) => {
		const { data } = await profileViewApi.request(userId);
	};

	`
       "profilePictureURL": "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp",
   `;
	return (
		<>
			<ActivityIndicator
				visible={followUserApi.loading || profileViewApi.loading}
			/>
			<View style={styles.container}>
				<SharedElement
					id={`item.${item.key}.bg`}
					style={StyleSheet.absoluteFillObject}
				>
					<View style={[styles.bg, { backgroundColor: item.color }]} />
				</SharedElement>
				<SharedElement id={`item.${item.key}.name`}>
					<Text style={styles.name}>{item.name}</Text>
				</SharedElement>
				<SharedElement id={`item.${item.key}.image`}>
					<Image
						source={{ uri: item.profilePictureURL || item.image }}
						style={styles.image}
					/>
				</SharedElement>

				<SharedElement id="general.bg">
					<View style={styles.overlay}>
						<View style={styles.iconRow}>
							{detailsIcons.map((detail, index) => {
								const iconName =
									detail.icon === 'heart'
										? item.followedByCurrentUser
											? 'heart'
											: 'hearto'
										: detail.icon;
								return (
									<Animatable.View
										animation="bounceIn"
										delay={DURATION + index * 100}
										key={`${detail.icon}-${index}`}
									>
										<TouchableOpacity
											onPress={() => handleDetails(detail.icon)}
										>
											<AntDesign
												name={iconName}
												size={40}
												color={detail.color}
											/>
										</TouchableOpacity>
									</Animatable.View>
								);
							})}
						</View>
						<ScrollView>
							{/* <View style={{ flex: 1 }}> */}
							<Animatable.View
								animation="fadeInUp"
								delay={DURATION}
								style={{ marginVertical: SPACING, flex: 1 }}
							>
								<Text style={styles.title}>{item.email}</Text>
								<View style={styles.list}>
									<View
										style={[
											styles.listItemDot,
											{ backgroundColor: item.color },
										]}
									/>
									<Text style={styles.subTitle}>username: {item.username}</Text>
								</View>
								<View style={styles.list}>
									<View
										style={[
											styles.listItemDot,
											{ backgroundColor: item.color },
										]}
									/>
									<Text style={styles.subTitle}>
										ratingScore: {item.ratingScore}
									</Text>
								</View>
							</Animatable.View>
							{/* </View> */}
							{profileViewApi.data?.ads.map((ad, i) => (
								<View key={i}>
									{i === 0 && <Text style={styles.heading}>Car ads</Text>}
									<CarAd
										title={ad.title}
										model={ad.model}
										price={ad.price}
										image={ad.imageUrls[0].url}
									/>
								</View>
							))}

							{profileViewApi.data?.serviceAds.map((ad, i) => (
								<View key={i}>
									{i === 0 && <Text style={styles.heading}>Service ads</Text>}
									<CarAd
										title={ad.title}
										model={ad.contactNo}
										price={ad.price}
										// image={ad.imageUrls[0].url}
									/>
								</View>
							))}

							{profileViewApi.data?.posts.map((post, i) => (
								<View key={i}>
									{i === 0 && <Text style={styles.heading}>Posts </Text>}
									<CarAd
										title={`post ${i + 1}`}
										model={post.text}
										// price={`no of comments ${post.comments.length}`}
									/>
								</View>
							))}
							<View style={{ height: 300 }} />
						</ScrollView>
					</View>
				</SharedElement>
			</View>
		</>
	);
};

const CarAd = ({ title, model, price, image }) => {
	return (
		<View style={styles2.container}>
			{image && <Image source={{ uri: image }} style={styles2.image} />}
			<View style={styles2.detailsContainer}>
				<Text style={styles2.title}>{title}</Text>
				<Text style={styles2.model}>{model}</Text>
				<Text style={styles2.price}>{price}</Text>
			</View>
		</View>
	);
};

const styles2 = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 16,
	},
	image: {
		width: 100,
		height: 100,
		borderRadius: 8,
		marginRight: 16,
	},
	detailsContainer: {
		flex: 1,
	},
	title: {
		fontSize: 16,
		fontWeight: '500',
		marginBottom: 4,
	},
	model: {
		fontSize: 14,
		color: '#888',
		marginBottom: 4,
	},
	price: {
		fontSize: 18,
		fontWeight: '300',
	},
});

const styles = StyleSheet.create({
	bg: {
		borderRadius: 0,
		...StyleSheet.absoluteFillObject,
		height: TOP_HEADER_HEIGHT + 32,
	},
	container: {
		flex: 1,
	},
	iconRow: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		marginTop: SPACING,
		marginBottom: SPACING + 32,
	},
	image: {
		width: ITEM_HEIGHT * 1.2,
		height: ITEM_HEIGHT * 0.9,
		resizeMode: 'contain',
		position: 'absolute',
		top: TOP_HEADER_HEIGHT - ITEM_HEIGHT * 0.9,
		right: SPACING,
	},
	jobTitle: {
		fontSize: 11,
		opacity: 0.7,
	},
	list: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: SPACING / 2,
		marginLeft: SPACING,
	},
	listItemDot: {
		height: 8,
		width: 8,
		borderRadius: 4,
		marginRight: SPACING,
	},
	name: {
		fontWeight: '700',
		fontSize: 20,
		top: TOP_HEADER_HEIGHT - SPACING * 3,
		left: SPACING,
	},
	overlay: {
		position: 'absolute',
		width,
		height,
		backgroundColor: colors.white,
		transform: [{ translateY: TOP_HEADER_HEIGHT }],
		borderRadius: 32,
		padding: SPACING,
		paddingTop: 32 + SPACING,
		flex: 1,
	},
	subTitle: {
		fontSize: 14,
		opacity: 0.8,
	},
	title: {
		fontWeight: '700',
		fontSize: 20,
		marginBottom: SPACING,
	},
	heading: {
		textAlign: 'center',
		marginTop: 20,
		marginBottom: 10,
		fontWeight: '700',
	},
});

export default UserDetailsScreen;
