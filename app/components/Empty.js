import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Empty = ({ title }) => {
	return (
		<View style={styles.container}>
			<Text>{title}</Text>
		</View>
	);
};

export default Empty;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
