import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {
	Dimensions,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SharedElement } from 'react-navigation-shared-element';
import * as Yup from 'yup';

import authApi from '../api/auth';
import ActivityIndicator from '../components/ActivityIndicator';
import Icon from '../components/Icon';
import {
	ErrorMessage,
	AppForm as Form,
	AppFormField as FormField,
	SubmitButton,
} from '../components/forms';
import AppPhoneInput from '../components/forms/AppPhoneInput';
import OtpInput from '../components/forms/OtpInput';
import colors from '../config/colors';
import useApi from '../hooks/useApi';

const { width } = Dimensions.get('screen');
const DURATION = 400;

const schemaFunction = (isValid) => {
	const validationSchema = Yup.object().shape({
		name: Yup.string().required().label('Name'),
		username: Yup.string().required().label('Username'),
		email: Yup.string().required().email().label('Email'),
		password: Yup.string().required().min(4).label('Password'),
		about: Yup.string().label('About'),
		phoneNo: Yup.string()
			.required()
			.test(
				'test-name',
				'phone input should be like (0)3125103497',
				(value) => isValid
			),
	});
	return validationSchema;
};

function RegisterScreen({ navigation, route }) {
	const { item, bg, account } = route.params;
	const [otpVisible, setOtpVisible] = useState(false);
	const [isValid, setIsValid] = useState(false);
	const [formData, setFormData] = useState({
		accountTypeGId: account.alternateKey,
	});
	const [error, setError] = useState();

	const registerApi = useApi(authApi.register);
	const verifyEmailApi = useApi(authApi.verifyEmail);

	const handleOtp = async (otp) => {
		setOtpVisible(!otpVisible);

		const result = await verifyEmailApi.request({
			email: formData.email,
			otp,
		});
		if (result.data?.statusCode !== 200) return setError(result.data.message);
		setError(null);
		alert('User registered successfully!!');
	};

	const handleSubmit = async (userInfo, { resetForm }) => {
		const { data } = await registerApi.request({ ...formData, ...userInfo });

		if (data?.statusCode !== 200) return setError(data.message);

		setOtpVisible(!otpVisible);
		setFormData({ ...formData, ...userInfo });
		resetForm();
	};

	return (
		<>
			<ActivityIndicator
				visible={registerApi.loading || verifyEmailApi.loading}
			/>
			<KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.container}>
					<View style={styles.headingConatiner}>
						<SharedElement id={`item.${item.key}.image`}>
							<Image source={{ uri: item.image }} style={styles.image} />
						</SharedElement>
						<Animatable.View animation="fadeInUp" delay={DURATION / 2}>
							<Text style={styles.title}>{item.role}</Text>
						</Animatable.View>
					</View>
					<Animatable.View animation="fadeInUp" delay={DURATION}>
						<Form
							initialValues={{ name: '', email: '', password: '' }}
							onSubmit={handleSubmit}
							validationSchema={schemaFunction(isValid)}
						>
							<ErrorMessage error={error} visible={error} />
							<FormField
								autoCorrect={false}
								icon="account"
								name="name"
								placeholder="Name"
								width="80%"
							/>
							<FormField
								autoCorrect={false}
								icon="account"
								name="username"
								placeholder="Username"
								width="50%"
							/>
							<FormField
								autoCapitalize="none"
								autoCorrect={false}
								icon="email"
								keyboardType="email-address"
								name="email"
								placeholder="Email"
								textContentType="emailAddress"
								width="95%"
							/>
							<FormField
								autoCapitalize="none"
								autoCorrect={false}
								icon="lock"
								name="password"
								placeholder="Password"
								secureTextEntry
								textContentType="password"
								width="95%"
							/>
							<AppPhoneInput
								name="phoneNo"
								onCheck={(val) => setIsValid(val)}
							/>
							<FormField
								maxLength={255}
								multiline
								name="about"
								numberOfLines={3}
								placeholder="About"
							/>
							{registerApi.data?.statusCode === 200 && (
								<TouchableOpacity
									style={styles.otpInput}
									onPress={() => setOtpVisible(true)}
								>
									<Text>OTP:{'  '}</Text>
									<MaterialIcons name="input" size={30} />
								</TouchableOpacity>
							)}

							<SubmitButton title="Register" bg={bg} />
						</Form>
						<TouchableOpacity
							style={styles.backButton}
							onPress={() => navigation.goBack()}
						>
							<Icon
								family="mci"
								name="keyboard-backspace"
								backgroundColor="#fff"
								iconColor={colors.medium}
							/>
							<Text style={{ color: colors.medium }}>back</Text>
						</TouchableOpacity>
					</Animatable.View>
					<OtpInput
						otpVisible={otpVisible}
						onOtpVisible={(v) => setOtpVisible(v)}
						onSendOtp={handleOtp}
						color={bg}
					/>
				</View>
			</KeyboardAwareScrollView>
		</>
	);
}

const styles = StyleSheet.create({
	backButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20,
	},

	container: {
		paddingHorizontal: 10,
	},
	headingConatiner: {
		alignItems: 'center',
	},
	image: {
		width: width / 2.5,
		height: width / 3,
		resizeMode: 'contain',
		zIndex: 1,
	},

	title: {
		fontWeight: '800',
		fontSize: 32,
		textTransform: 'uppercase',
		color: colors.medium,
	},
	otpInput: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 20,
	},
});

export default RegisterScreen;
