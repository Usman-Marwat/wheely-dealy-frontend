import {
	createDrawerNavigator,
	DrawerItemList,
	DrawerItem,
} from '@react-navigation/drawer';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import colors from '../config/colors';

const Clientlinks = [
	{ label: 'Dashboard', route: 'Dashboard', icon: 'dashboard' },
	{ label: 'Saved & Bids', route: 'Saved & Bids', icon: 'save' },
	{ label: 'Questions', route: 'Questions', icon: 'questioncircleo' },
	{ label: 'Chat', route: 'Chat', icon: 'wechat' },
	{ label: 'Account', route: 'Account', icon: 'user' },
	// Add more links as needed
];

const Sellerlinks = [
	{ label: 'Dashboard', route: 'Dashboard', icon: 'dashboard' },
	{ label: 'My Content', route: 'My Content', icon: 'creditcard' },
	{ label: 'Questions', route: 'Questions', icon: 'questioncircleo' },
	{ label: 'Claimed Deals', route: 'Claimed Deals', icon: 'inbox' },
	{ label: 'Chat', route: 'Chat', icon: 'wechat' },
	{ label: 'Account', route: 'Account', icon: 'user' },
	// Add more links as needed
];

const CustomDrawerContent = (props) => {
	const { user } = useAuth();

	const links = user.account_type === 'Seller' ? Sellerlinks : Clientlinks;

	return (
		<ImageBackground
			source={require('../assets/wheel.jpg')}
			style={{ flex: 1, resizeMode: 'contain', justifyContent: 'flex-end' }}
			imageStyle={styles.backgroundImage}
		>
			<View style={styles.container}>
				{/* <Image
				source={require('../assets/wheel.jpg')}
				style={StyleSheet.absoluteFillObject}
				blurRadius={70}
			/> */}
				<View style={styles.header}>
					<Image
						source={require('../assets/wheel.jpg')}
						style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
					/>
					<View>
						<Text style={styles.userName}>{user.name}</Text>
						<Text style={styles.userEmail}>{user.account_type}</Text>
					</View>
				</View>
				<View style={styles.content}>
					{/* Render your custom drawer content here */}
					{/* <DrawerItemList {...props} /> */}

					{links.map((link, index) => (
						<DrawerItem
							key={index}
							label={link.label}
							focused={props.state.routeNames[props.state.index] === link.label}
							onPress={() => props.navigation.navigate(link.route)}
							icon={({ focused, color, size }) => (
								<View style={[styles.iconContainer]}>
									<AntDesign name={link.icon} size={size} color={color} />
								</View>
							)}
						/>
					))}
				</View>
				<View style={styles.footer}>
					{/* Add your footer content here */}
					<Text style={styles.footerLink}>Terms of Service</Text>
					<Text style={styles.footerLink}>Privacy Policy</Text>
				</View>
			</View>
		</ImageBackground>
	);
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
	backgroundImage: {
		opacity: 0.1, // Adjust the opacity value as desired
		transform: [{ translateY: 200 }], // Adjust the translation values as desired
	},
	container: {
		flex: 1,
	},
	header: {
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
		flexDirection: 'row',
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
		color: colors.secondary,
		marginBottom: 8,
	},
	iconContainer: {
		marginRight: 10,
	},
	selectedIconContainer: {
		borderRadius: 5,
	},
});
