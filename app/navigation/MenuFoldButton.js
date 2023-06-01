import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';

import colors from '../config/colors';
import DrawerAnimationContext from '../contexts/drawerAnimationContext';
import { translateMenuFold } from './navigationAnimations';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const SIZE = 30;

const MenuFoldButton = ({
	position = 'absolute',
	backgroundColor = colors.primary,
	iconColor = 'white',
}) => {
	const navigation = useNavigation();
	const { animatedValue } = useContext(DrawerAnimationContext);
	const translateX = translateMenuFold(animatedValue);

	return (
		<AnimatedTouchable
			onPress={() => navigation.openDrawer()}
			style={[
				styles.conatiner,

				{
					position: position,
					backgroundColor,
					transform: [{ translateX: translateX }],
					top: position === 'relative' ? 0 : 25,
					right: position === 'relative' ? 0 : 17,
				},
			]}
		>
			<AntDesign name="menufold" size={SIZE - 15} color={iconColor} />
		</AnimatedTouchable>
	);
};

export default MenuFoldButton;

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
