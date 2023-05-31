import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { SimpleLineIcons } from '@expo/vector-icons';
import colors from '../config/colors';

const CloseButton = ({ onPress }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<SimpleLineIcons name="close" size={25} color={colors.primary} />
		</TouchableOpacity>
	);
};

export default CloseButton;

const styles = StyleSheet.create({});
