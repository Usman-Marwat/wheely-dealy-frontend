import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';

const ActionButtons = ({
	updateAble,
	deleteAble,
	saveAble,
	saved,
	onUpdate,
	onSave,
	onDelete,
	sellAble,
	onSell,
}) => {
	return (
		<View style={styles.rowButton}>
			{updateAble && (
				<TouchableOpacity onPress={onUpdate} style={styles.buttonText}>
					<FontAwesome name={'edit'} size={22} />
					<Text style={{ marginTop: 5 }}>Edit </Text>
				</TouchableOpacity>
			)}
			{saveAble && (
				<TouchableOpacity onPress={onSave} style={styles.buttonText}>
					<FontAwesome name={saved ? 'bookmark' : 'bookmark-o'} size={22} />
					<Text style={{ marginTop: 5 }}>save </Text>
				</TouchableOpacity>
			)}
			{deleteAble && (
				<TouchableOpacity onPress={onDelete} style={styles.buttonText}>
					<AntDesign name="delete" size={22} />
					<Text style={{ marginTop: 5 }}>Delete </Text>
				</TouchableOpacity>
			)}
			{sellAble && (
				<TouchableOpacity onPress={onSell} style={styles.buttonText}>
					<MaterialIcons name="money-off" size={22} />
					<Text style={{ marginTop: 5 }}>Mark Sold </Text>
				</TouchableOpacity>
			)}
		</View>
	);
};

export default ActionButtons;

const styles = StyleSheet.create({
	rowButton: {
		flexDirection: 'row',
		padding: 10 * 2,
		paddingVertical: 10,
		justifyContent: 'space-between',
		borderColor: 'rgba(0,0,0,0.1)',
	},
	buttonText: {
		alignItems: 'center',
	},
});
