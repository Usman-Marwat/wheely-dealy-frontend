import { SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity } from 'react-native';

const SIZE = 30;

const BackButton = ({
	iconName = 'chevron-left',
	iconBg = '#fff',
	containerStyle,
	position = 'absolute',
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
			style={[
				styles.conatiner,
				{
					position,
					top: position === 'relative' ? 0 : 25,
					left: position === 'relative' ? 0 : 17,
				},
			]}
		>
			<SimpleLineIcons name="arrow-left" size={SIZE - 15} />
		</TouchableOpacity>
	);
};

export default BackButton;

const styles = StyleSheet.create({
	conatiner: {
		justifyContent: 'center',
		alignItems: 'center',

		backgroundColor: 'white',
		zIndex: 1,
		borderRadius: SIZE / 2,
		width: SIZE,
		height: SIZE,
	},
});
