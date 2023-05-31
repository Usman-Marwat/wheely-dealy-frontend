import { TouchableOpacity } from 'react-native';
import React from 'react';
import { useFormikContext } from 'formik';
import { Feather } from '@expo/vector-icons';

import AppButton from '../AppButton';
import colors from '../../config/colors';

function SubmitButton({ title, bg = colors.primary, isIcon }) {
	const { handleSubmit } = useFormikContext();

	if (isIcon)
		return (
			<TouchableOpacity onPress={handleSubmit}>
				<Feather name="send" size={25} color={colors.medium} />
			</TouchableOpacity>
		);

	return (
		<AppButton
			title={title}
			onPress={handleSubmit}
			style={{ marginTop: 10, backgroundColor: bg }}
		/>
	);
}

export default SubmitButton;
