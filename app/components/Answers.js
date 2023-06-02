import { StyleSheet, Text, View, RefreshControl, FlatList } from 'react-native';
import React from 'react';

const Answers = ({ answers, onRefresh }) => {
	return (
		<FlatList
			data={answers}
			keyExtractor={(item) => item.answerDateTime}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 10 }}
			refreshControl={<RefreshControl onRefresh={onRefresh} />}
			renderItem={({ item, index }) => {
				return <UserAnswer name={item.user.name} text={item.answerText} />;
			}}
		/>
	);
};

const UserAnswer = ({ name, text }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.name}>{name}</Text>
			<Text style={styles.answerText}>{text}</Text>
		</View>
	);
};

export default Answers;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		borderRadius: 10,
		padding: 16,
		marginBottom: 16,
		borderWidth: 1,
		borderColor: '#ccc',
	},
	name: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#333',
		marginBottom: 8,
	},
	answerText: {
		fontSize: 16,
		color: '#333',
	},
});
