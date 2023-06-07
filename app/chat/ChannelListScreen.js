import React, { useContext } from 'react';
import { ChannelList } from 'stream-chat-expo';
import { StyleSheet, View } from 'react-native';

import AuthContext from '../auth/context';
import MenuFoldButton from '../navigation/MenuFoldButton';
import Header from '../components/Header';

const options = {
	state: true,
	watch: true,
};

export default function ChannelListScreen({ navigation }) {
	const { user } = useContext(AuthContext);

	const handleChannelPressed = (channel) => {
		navigation.navigate('Channel', { cid: channel.cid });
	};
	const filters = {
		members: {
			$in: [user.user_id],
		},
	};

	return (
		<View style={styles.container}>
			<Header heading="My contacts" />
			<ChannelList
				onSelect={handleChannelPressed}
				filters={filters}
				options={options}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// paddingTop: 50,
	},
});
