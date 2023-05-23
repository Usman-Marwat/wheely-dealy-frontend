import React from 'react';
import { StyleSheet, View } from 'react-native';

import iconComponents from '../config/icons';

function Icon({
	name,
	size = 40,
	backgroundColor = '#000',
	iconColor = '#fff',
	style,
	family = 'mci',
}) {
	const RenderComponent = iconComponents[family];
	return (
		<View
			style={[
				{
					width: size,
					height: size,
					borderRadius: size / 2,
					backgroundColor,
				},
				styles.container,
				style,
			]}
		>
			<RenderComponent name={name} color={iconColor} size={size * 0.5} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default Icon;
