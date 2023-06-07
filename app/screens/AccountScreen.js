import React, { useContext } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import AuthContext from '../auth/context';
import colors from '../config/colors';
import Icon from '../components/Icon';
import MenuFoldButton from '../navigation/MenuFoldButton';
import routes from '../navigation/routes';
import Screen from '../components/Screen';
import ListItem from '../components/ListItem';
import Header from '../components/Header';

function AccountScreen({ navigation }) {
	const { user, setUser } = useContext(AuthContext);

	return (
		<View style={styles.screen}>
			<Header heading="Your Account" />
			<View style={styles.container}>
				<ListItem
					title={user.name}
					subTitle={user.email}
					image={user.image}
					IconComponent={
						<Icon
							name="user"
							family="entypo"
							backgroundColor={colors.primary}
						/>
					}
					onPress={() => navigation.navigate(routes.PROFILE)}
				/>
			</View>

			<ListItem
				title="Log-Out"
				IconComponent={<Icon name="logout" backgroundColor={colors.primary} />}
				onPress={() => setUser(null)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		backgroundColor: colors.light,
	},
	container: {
		marginVertical: 20,
	},
});

export default AccountScreen;
