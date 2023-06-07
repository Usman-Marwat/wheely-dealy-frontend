import { useRef } from 'react';
import {
	Animated,
	Image,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

import { useEffect } from 'react';
import { useChatContext } from 'stream-chat-expo';
import userAds from '../api/ad';
import ActivityIndicator from '../components/ActivityIndicator';
import randomAvatars from '../config/randomAvatars';
import useApi from '../hooks/useApi';
import useAuth from '../auth/useAuth';
import Header from '../components/Header';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const BG_IMG =
	'https://images.unsplash.com/photo-1602786195490-c785a218df40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fGNhcnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60';
const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

const BidsListScreen = ({ navigation, route }) => {
	const { adId } = route.params;
	const scrollY = useRef(new Animated.Value(0)).current;
	const { client } = useChatContext();
	const { user } = useAuth();

	const myBidsApi = useApi(userAds.getBidsOnMyAd);

	const getBids = async () => {
		await myBidsApi.request(adId);
	};

	useEffect(() => {
		getBids();
	}, []);

	const handleChat = async (chatUserId) => {
		try {
			const channel = client.channel('messaging', {
				members: [chatUserId, user.user_id],
			});
			await channel.watch();
			navigation.navigate('Channel', { cid: channel.cid });
		} catch (error) {
			alert('The selected user is not registered with chat Api');
		}
	};

	return (
		<>
			<Header heading="All the Bids" />
			<ActivityIndicator visible={myBidsApi.loading} />
			<View style={{ flex: 1 }}>
				<Image
					source={{ uri: BG_IMG }}
					style={StyleSheet.absoluteFillObject}
					blurRadius={10}
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
								onPress={() => handleChat(item.bidder.alternateKey)}
							>
								<Image
									source={{
										uri: item.bidder.profilePictureURL || randomAvatars(),
									}}
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
			</View>
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
