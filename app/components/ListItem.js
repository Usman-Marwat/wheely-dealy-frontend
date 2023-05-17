import React from 'react';
import {
	View,
	StyleSheet,
	Image,
	TouchableHighlight,
	Text,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';
const SPACING = 20;

function ListItem({
	title,
	subTitle,
	image,
	IconComponent,
	onPress,
	renderRightActions,
	style,
}) {
	return (
		<Swipeable renderRightActions={renderRightActions}>
			<TouchableHighlight underlayColor={colors.light} onPress={onPress}>
				<View style={[styles.container, style]}>
					{/* Either Icon Or Image is gonna show up */}
					{IconComponent}
					{image && <Image style={styles.image} source={{ uri: image }} />}
					<View style={styles.detailsContainer}>
						<Text numberOfLines={1} style={styles.title}>
							{title}
						</Text>
						{subTitle && (
							<Text numberOfLines={2} style={styles.subTitle}>
								{subTitle}
							</Text>
						)}
					</View>
					<MaterialCommunityIcons
						name="chevron-right"
						color={colors.medium}
						size={25}
					/>
				</View>
			</TouchableHighlight>
		</Swipeable>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flexDirection: 'row',
		padding: 15,
		marginBottom: SPACING / 2,
		borderRadius: 12,
		backgroundColor: colors.light,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.3,
		shadowRadius: 20,
	},
	detailsContainer: {
		flex: 1,
		marginLeft: 10,
		justifyContent: 'center',
		padding: SPACING,
	},
	image: {
		width: 70,
		height: 70,
		borderRadius: 35,
	},
	subTitle: {
		color: colors.medium,
		fontSize: 15,
	},
	title: {
		fontWeight: '500',
	},
});

export default ListItem;
