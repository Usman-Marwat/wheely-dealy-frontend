import { SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../config/colors';

const SIZE = 30;

const BackButton = ({
	position = 'absolute',
	backgroundColor = colors.primary,
	iconColor = 'white',
}) => {
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			onPress={() => navigation.goBack()}
			style={[
				styles.conatiner,
				{
					position,
					backgroundColor,
					top: position === 'relative' ? 0 : 25,
					left: position === 'relative' ? 0 : 17,
				},
			]}
		>
			<SimpleLineIcons name="arrow-left" size={SIZE - 15} color={iconColor} />
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
