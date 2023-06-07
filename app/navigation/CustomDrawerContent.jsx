import {
	createDrawerNavigator,
	DrawerItemList,
	DrawerItem,
} from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';

const CustomDrawerContent = (props) => {
	const { user } = useAuth();

	const links = [
		{ label: 'Dashboard', route: 'Dashboard' },
		{ label: 'Saved & Bids', route: 'Saved & Bids' },
		{ label: 'Questions', route: 'Questions' },
		{ label: 'Chat', route: 'Chat' },
		{ label: 'Account', route: 'Account' },
		// Add more links as needed
	];

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.userName}>{user.name}</Text>
				<Text style={styles.userEmail}>{user.account_type}</Text>
				{/* Add other user data if needed */}
			</View>
			<View style={styles.content}>
				{/* Render your custom drawer content here */}
				<DrawerItemList {...props} />
				{/* {links.map((link, index) => (
					<DrawerItem
						key={index}
						label={link.label}
						onPress={() => props.navigation.navigate(link.route)}
					/>
				))} */}
			</View>
			<View style={styles.footer}>
				{/* Add your footer content here */}
				<Text style={styles.footerLink}>Terms of Service</Text>
				<Text style={styles.footerLink}>Privacy Policy</Text>
			</View>
		</View>
	);
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
	},
	userName: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 8,
	},
	userEmail: {
		fontSize: 16,
		color: '#888',
	},
	content: {
		flex: 1,
		padding: 16,
	},
	link: {
		fontSize: 16,
		marginBottom: 12,
	},
	footer: {
		borderTopWidth: 1,
		borderTopColor: '#ccc',
		padding: 16,
	},
	footerLink: {
		fontSize: 16,
		color: 'blue',
		marginBottom: 8,
	},
});
