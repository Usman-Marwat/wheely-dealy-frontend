import { TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import Icon from '../components/Icon';
import colors from '../config/colors';

const BackButton = ({
	iconName = 'chevron-left',
	iconBg = '#fff',
	containerStyle,
}) => {
	const navigation = useNavigation();

	// return (
	// 	<TouchableOpacity
	// 		onPress={() => navigation.goBack()}
	// 		style={containerStyle}
	// 	>
	// 		<Icon
	// 			family="mci"
	// 			name={iconName}
	// 			backgroundColor={iconBg}
	// 			iconColor="#222"
	// 			size={34}
	// 		/>
	// 	</TouchableOpacity>
	// );
	return (
		<TouchableOpacity
			onPress={() => navigation.goBack()}
			style={styles.conatiner}
		>
			<Ionicons
				name="arrow-back-circle-outline"
				size={30}
				color={colors.medium}
			/>
		</TouchableOpacity>
	);
};

export default BackButton;

const styles = StyleSheet.create({
	conatiner: {
		position: 'absolute',
		top: 20,
		left: 10,
		backgroundColor: 'white',
		zIndex: 1,
		borderRadius: 13,
	},
});
