import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Empty = ({ title, children }) => {
	return (
		<View style={styles.container}>
			<Text>{title}</Text>
			{children}
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
