import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SimpleLineIcons } from '@expo/vector-icons';

import MenuFoldButton from '../navigation/MenuFoldButton';
import BackButton from '../navigation/BackButton';
import colors from '../config/colors';

const Header = ({ heading, backButton }) => {
	return (
		<View style={[styles.headerContainer, styles.shadow]}>
			{backButton ? (
				<BackButton position="relative" />
			) : (
				<MenuFoldButton position="relative" />
			)}
			{heading && (
				<View style={[styles.holder]}>
					<Text style={[styles.title]}>{heading}</Text>
				</View>
			)}

			<View style={{ zIndex: -10 }}>
				<SimpleLineIcons name="arrow-left" size={30} color="white" />
			</View>
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	headerContainer: {
		alignItems: 'center',
		backgroundColor: 'white',
		flexDirection: 'row',
		height: 70,
		justifyContent: 'space-between',
		width: '100%',
		paddingTop: 20,
		paddingHorizontal: 17,
		borderBottomColor: 'silver',
		top: 2,
		zIndex: 1,
	},
	title: {
		fontWeight: '500',
		fontSize: 15,
		zIndex: 1,
	},
	shadow: {
		shadowColor: 'silver',
		shadowOffset: {
			width: 0,
			height: 13,
		},
		shadowOpacity: 0.5,
		shadowRadius: 20,
	},
	holder: {
		// height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		// marginTop: 10,
		paddingHorizontal: 20,
		borderRadius: 50,
		backgroundColor: 'white',
		// borderWidth: 0.7,
		borderColor: colors.primary,
	},
});
