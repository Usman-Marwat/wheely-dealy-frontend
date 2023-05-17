import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from 'stream-chat-expo';

import ClientNavigator from '../navigation/ClientNavigator';
import SellerNavigator from '../navigation/SellerNavigator';

const Api_Key = 'fnmp8yh8yfe2';
const client = StreamChat.getInstance(Api_Key);

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

const AppStarter = ({ user }) => {
	const randomImage = images[Math.floor(Math.random() * images.length)];
	console.log(randomImage);

	const connectUser = async (id, name, image = randomImage) => {
		await client.connectUser({ id, name, image }, client.devToken(id));
	};

	useEffect(() => {
		connectUser(user.user_id, user.name, user.profilePictureURL);
		return () => client.disconnectUser();
	}, []);

	return (
		<OverlayProvider>
			<View style={styles.container}>
				<Chat client={client}>
					{user.account_type === 'Seller' && <SellerNavigator />}
					{user.account_type === 'Client' && <ClientNavigator />}
				</Chat>
			</View>
		</OverlayProvider>
	);
};

export default AppStarter;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});
