import {
	StyleSheet,
	Text,
	View,
	RefreshControl,
	FlatList,
	Image,
	TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import randomAvatars from '../config/randomAvatars';

const Questions = ({ questions, onRefresh, onSelected, showAnswer }) => {
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
						showAnswer={showAnswer}
						onSelected={() => onSelected({ ...item, randomImage })}
					/>
				);
			}}
		/>
	);
};

export const UserQuestion = ({
	name,
	imageUri,
	text,
	showAnswer,
	onSelected,
}) => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={styles.nameImageWrapper}>
					<Image source={{ uri: imageUri }} style={styles.profileImage} />
					<Text style={styles.name}>{name}</Text>
				</View>
				{showAnswer ? (
					<TouchableOpacity onPress={onSelected}>
						<MaterialIcons name="question-answer" size={22} />
					</TouchableOpacity>
				) : (
					<Text>Answers below</Text>
				)}
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
		justifyContent: 'space-between',
		marginBottom: 8,
	},
	nameImageWrapper: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
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
		color: '#333',
	},
});
