import { StyleSheet, Modal, View } from 'react-native';
import React from 'react';
import CloseButton from './CloseButton';

const WholeScreenModal = ({ visible, onClose, children }) => {
	return (
		<Modal visible={visible} animationType="slide">
			<View style={styles.container}>
				<View style={styles.closeButton}>
					<CloseButton onPress={onClose} />
				</View>
				{children}
			</View>
		</Modal>
	);
};

export default WholeScreenModal;

const styles = StyleSheet.create({
	container: {
		padding: 20,
		paddingTop: 50,
		flex: 1,
	},
	closeButton: {
		marginBottom: 30,
		flexDirection: 'row',
		justifyContent: 'center',
	},
});
