import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import colors from '../config/colors';

const TableRow = ({ column1, column2, onReject, onApprove, onPending }) => {
	return (
		<View style={styles.row}>
			<View style={styles.column}>
				<Text style={styles.columnText}>{column1}</Text>
			</View>
			<View style={styles.column}>
				<Text style={styles.columnText}>{column2}</Text>
			</View>
			<View style={[styles.column]}>
				<Button title="Approve" onPress={onApprove} color={colors.primary} />
				<Button title="Reject" onPress={onReject} color={colors.primary} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		// borderBottomWidth: 1,
		borderWidth: 0.7,
		borderRadius: 10,
		borderBottomColor: '#ccc',
	},
	column: {
		flex: 1,
		paddingHorizontal: 5,
		borderRightWidth: 0.7,
		alignItems: 'center',
		justifyContent: 'center',
		// borderWidth: 1,
		minHeight: 120,
	},
	columnText: {
		fontSize: 16,
		color: '#333',
	},
});

export default TableRow;
