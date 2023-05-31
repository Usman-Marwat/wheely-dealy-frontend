import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import MenuFoldButton from '../navigation/MenuFoldButton';
import BackButton from '../navigation/BackButton';

const Header = ({ heading }) => {
	return (
		<View style={[styles.headerContainer, styles.shadow]}>
			<BackButton position="relative" />
			{heading && (
				<View style={[styles.holder]}>
					<Text style={[styles.title]}>{heading}</Text>
				</View>
			)}

			<MenuFoldButton menuFoldPosition="relative" />
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	headerContainer: {
		alignItems: 'center',
		backgroundColor: 'white',
		flexDirection: 'row',
		height: 60,
		justifyContent: 'space-between',
		width: '100%',
		paddingTop: 20,
		paddingHorizontal: 17,
		borderBottomColor: 'silver',

		// position: "absolute",
		top: 2,
		zIndex: 1,
	},
	title: {
		fontWeight: '500',
		fontSize: 15,
		zIndex: 1,
	},
	shadow: {
		// backgroundColor: "white",
		shadowColor: 'silver',
		shadowOffset: {
			width: 0,
			height: 13,
		},
		shadowOpacity: 0.5,
		shadowRadius: 20,
	},
	holder: {
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 17,
		paddingHorizontal: 20,
		borderRadius: 50,
		backgroundColor: 'white',
		borderWidth: 0.3,
	},
});
