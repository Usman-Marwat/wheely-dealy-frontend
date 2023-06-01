import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const UserCard = ({ name, email, imageUri }) => {
	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<Image source={{ uri: imageUri }} style={styles.profileImage} />
				<View>
					<Text style={styles.name}>{name}</Text>
					<Text style={styles.email}>{email}</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		borderRadius: 10,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	profileImage: {
		width: 80,
		height: 80,
		borderRadius: 40,
		marginRight: 17,
	},
	name: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 4,
	},
	email: {
		fontSize: 16,
		color: 'gray',
	},
});

export default UserCard;
