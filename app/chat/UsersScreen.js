import { Animated, StyleSheet, View, FlatList, Image } from 'react-native';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { useChatContext } from 'stream-chat-expo';

import UserListItem from './UserListItem';
import AuthContext from '../auth/context';
import ActivityIndicator from '../components/ActivityIndicator';
import MenuFoldButton from '../navigation/MenuFoldButton';
import Header from '../components/Header';

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;
const BG_IMG =
	'https://images.pexels.com/photos/1231265/pexels-photo-1231265.jpeg?auto=compress&cs=tinysrgb&w=800';
export default function UsersScreen() {
	const { user } = useContext(AuthContext);
	const [chatUsers, setChatUsers] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const { client } = useChatContext();
	const scrollY = useRef(new Animated.Value(0)).current;

	const fetchUsers = async () => {
		setIsLoading(true);
		const response = await client.queryUsers({
			id: { $nin: ['usman-marwat', user.user_id] },
		});
		setChatUsers(response.users);
		setIsLoading(false);
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<View style={{ paddingTop: 0 }}>
			<ActivityIndicator visible={!chatUsers} />
			<Header heading="All contacts" />

			<Image
				source={{ uri: BG_IMG }}
				style={StyleSheet.absoluteFillObject}
				blurRadius={70}
			/>
			<Animated.FlatList
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { y: scrollY } } }],
					{ useNativeDriver: true }
				)}
				data={chatUsers}
				keyExtractor={(item) => item.id}
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
						<Animated.View
							style={[
								styles.container,
								{
									opacity,
									transform: [{ scale: scale }],
								},
							]}
						>
							<UserListItem chatUser={item} user={user} />
						</Animated.View>
					);
				}}
				// refreshing={isLoading}
				// onRefresh={fetchUsers}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginVertical: SPACING / 2,
		borderRadius: 12,
		backgroundColor: 'rgba(255,255,255,0.8)',
		// shadowColor: "#000",
		// shadowOffset: {
		//   width: 0,
		//   height: 10,
		// },
		// shadowOpacity: 0.3,
		// shadowRadius: 20,
	},
});
