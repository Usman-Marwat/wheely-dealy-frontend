import {
	StyleSheet,
	Text,
	View,
	RefreshControl,
	FlatList,
	Image,
} from 'react-native';
import React from 'react';
import { useState } from 'react';

import randomAvatars from '../config/randomAvatars';

const Questions = ({ questions, onRefresh }) => {
	const [randomImage, _] = useState(randomAvatars());
	return (
		<FlatList
			data={questions}
			keyExtractor={(item) => item.alternateKey}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ paddingVertical: 60, paddingHorizontal: 10 }}
			refreshControl={<RefreshControl onRefresh={onRefresh} />}
			renderItem={({ item, index }) => {
				const questioner = item.questioner;
				return (
					<UserQuestion
						name={questioner.name}
						imageUri={questioner.profilePictureURL || randomImage}
						text={item.questionText}
					/>
				);
			}}
		/>
	);
};

const UserQuestion = ({ name, imageUri, text }) => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image source={{ uri: imageUri }} style={styles.profileImage} />
				<Text style={styles.name}>{name}</Text>
			</View>
			<View style={styles.separator} />
			<Text style={styles.questionText}>{text}</Text>
		</View>
	);
};

export default Questions;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#f1f1f1',
		borderRadius: 20,
		padding: 16,
		marginBottom: 16,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 8,
	},
	profileImage: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 8,
	},
	name: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#333',
	},
	separator: {
		height: 1,
		backgroundColor: '#ccc',
		marginBottom: 8,
	},
	questionText: {
		fontSize: 15,
		// fontWeight: '',
		color: '#333',
	},
});
