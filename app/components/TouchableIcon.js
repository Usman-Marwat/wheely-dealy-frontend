import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

import Icon from './Icon';

const TouchableIcon = ({
	onPress,
	name,
	size = 40,
	backgroundColor = '#fff',
	iconColor = '#000',
	style,
	family,
}) => {
	return (
		<TouchableOpacity
			style={[styles.shadow, { alignItems: 'center' }]}
			onPress={onPress}
		>
			<Icon
				family={family}
				name={name}
				size={size}
				iconColor={iconColor}
				style={style}
				backgroundColor={backgroundColor}
			/>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	shadow: {
		// shadowColor: 'black',
		// shadowOffset: {
		// 	width: 3,
		// 	height: 3,
		// },
		// shadowOpacity: 0.3,
		// shadowRadius: 5,
		borderWidth: 0.4,
		borderRadius: '50%',
	},
});

export default TouchableIcon;
