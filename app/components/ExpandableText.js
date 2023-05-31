import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import colors from '../config/colors';

const ExpandableText = ({ children, maxChars = 100 }) => {
	const [isExpanded, setExpanded] = useState(false);

	if (children.length <= maxChars) return <Text>{children}</Text>;

	const text = isExpanded ? children : children.substring(0, maxChars);

	return (
		<Text>
			{text}...
			<TouchableOpacity onPress={() => setExpanded(!isExpanded)}>
				<MaterialIcons
					name={isExpanded ? 'expand-less' : 'expand-more'}
					size={20}
					color={colors.medium}
					style={styles.icon}
				/>
			</TouchableOpacity>
		</Text>
	);
};

export default ExpandableText;

const styles = StyleSheet.create({
	icon: {
		top: 5,
		left: 5,
	},
});
