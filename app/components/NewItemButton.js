import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';

import colors from '../config/colors';

function NewItemButton({ onPress }) {
	return (
		<TouchableOpacity onPress={onPress} style={styles.container}>
			<MaterialCommunityIcons
				name="plus-circle"
				color={colors.white}
				size={40}
			/>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: colors.primary,
		borderColor: colors.white,
		borderRadius: 40,
		borderWidth: 7,
		height: 70,
		justifyContent: 'center',
		width: 70,
	},
});

export default NewItemButton;
