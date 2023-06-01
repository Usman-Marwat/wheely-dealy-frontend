import {
	StatusBar,
	Image,
	Animated,
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import React, { useRef } from 'react';

import Screen from '../components/Screen';
import useApi from '../hooks/useApi';
import userAds from '../api/ad';
import BackButton from '../navigation/BackButton';
import { useEffect } from 'react';
import ActivityIndicator from '../components/ActivityIndicator';
import Empty from '../components/Empty';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const BG_IMG =
	'https://images.pexels.com/photos/1231265/pexels-photo-1231265.jpeg?auto=compress&cs=tinysrgb&w=800';
const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

const BidsListScreen = ({ route }) => {
	const { adId } = route.params;
	const scrollY = useRef(new Animated.Value(0)).current;

	const myBidsApi = useApi(userAds.getBidsOnMyAd);

	const getBids = async () => {
		await myBidsApi.request(adId);
	};

	useEffect(() => {
		getBids();
	}, []);

	if (myBidsApi.data?.obj)
		return (
			<>
				<BackButton />
				<Empty title="No Bids made by anyone" />
			</>
		);

	return (
		<>
			<BackButton />
			<ActivityIndicator visible={myBidsApi.loading} />
			<Screen style={{ paddingTop: 50 }}>
				<Image
					source={{ uri: BG_IMG }}
					style={StyleSheet.absoluteFillObject}
					blurRadius={80}
				/>
				<Animated.FlatList
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { y: scrollY } } }],
						{ useNativeDriver: true }
					)}
					contentContainerStyle={{
						padding: SPACING,
						paddingTop: StatusBar.currentHeight || 42,
					}}
					data={myBidsApi.data?.obj}
					keyExtractor={(item) => item.ad.alternateKey}
					renderItem={({ item, index }) => {
						const inputRange = [
							-1,
							0,
							ITEM_SIZE * index,
							ITEM_SIZE * (index + 2),
						];
						const opcaityInputRange = [
							-1,
							0,
							ITEM_SIZE * index,
							ITEM_SIZE * (index + 0.7),
						];
						const scale = scrollY.interpolate({
							inputRange,
							outputRange: [1, 1, 1, 0],
						});
						const opacity = scrollY.interpolate({
							inputRange: opcaityInputRange,
							outputRange: [1, 1, 1, 0],
						});

						return (
							<AnimatedTouchable
								style={[
									styles.itemWrapper,
									{ opacity, transform: [{ scale: scale }] },
								]}
							>
								<Image
									source={{ uri: item.bidder.profilePictureURL }}
									style={styles.image}
								/>
								<View style={{ flexShrink: 1 }}>
									<Text style={{ fontSize: 22, fontWeight: '700' }}>
										{item.bidAmount}
									</Text>
									<Text
										style={{
											fontSize: 18,
											opacity: 0.7,
										}}
									>
										{item.bidder.name}
									</Text>
									<Text
										style={{ fontSize: 14, opacity: 0.8, color: '#0099cc' }}
									>
										{item.bidder.email}
									</Text>
								</View>
							</AnimatedTouchable>
						);
					}}
				/>
			</Screen>
		</>
	);
};

export default BidsListScreen;

const styles = StyleSheet.create({
	itemWrapper: {
		flexDirection: 'row',
		padding: SPACING,
		marginBottom: SPACING,
		backgroundColor: 'rgba(255,255,255,0.8)',
		borderRadius: 12,
	},
	image: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE,
		marginRight: SPACING,
	},
});
