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

import ActivityIndicator from '../components/ActivityIndicator';

import authApi from '../api/auth';
import useAuth from '../auth/useAuth';
import Icon from '../components/Icon';
import {
	AppForm,
	AppFormField,
	ErrorMessage,
	SubmitButton,
} from '../components/forms';
import colors from '../config/colors';
import useApi from '../hooks/useApi';

const { width } = Dimensions.get('screen');
const DURATION = 400;

const validationSchema = Yup.object().shape({
	username: Yup.string().required().label('Username'),
	password: Yup.string().required().min(4).label('Password'),
});

function LoginScreen({ navigation, route }) {
	const { item, bg } = route.params;
	const [error, setError] = useState();
	const loginApi = useApi(authApi.login);
	const { logIn } = useAuth();

	const handleSubmit = async (formData) => {
		const { data } = await loginApi.request({ ...formData });
		if (data?.statusCode !== 200) return setError(data.message);
		logIn(data.token);
	};

	return (
		<>
			<ActivityIndicator visible={loginApi.loading} />
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
						<AppForm
							initialValues={{ username: '', password: '' }}
							onSubmit={handleSubmit}
							validationSchema={validationSchema}
						>
							<ErrorMessage error={error} visible={error} />
							<AppFormField
								autoCorrect={false}
								icon="account"
								name="username"
								placeholder="Username"
							/>
							<AppFormField
								autoCapitalize="none"
								autoCorrect={false}
								icon="lock"
								name="password"
								placeholder="Password"
								secureTextEntry
								textContentType="password"
							/>
							<SubmitButton title="Login" bg={bg} />
						</AppForm>
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
		padding: 10,
		paddingTop: 10,
	},
	headingConatiner: {
		alignItems: 'center',
		marginBottom: 20,
	},
	image: {
		width: width / 2,
		height: width / 2.5,
		marginTop: 30,
		resizeMode: 'contain',
		zIndex: 1,
	},
	title: {
		fontWeight: '800',
		fontSize: 32,
		textTransform: 'uppercase',
		color: colors.medium,
		marginVertical: 20,
	},
});

export default LoginScreen;

// const user = {
// 	name: 'aman',
// 	role: 'Seller',
// 	user_id: '63390ba766243cb0ff33ecd5',
// 	image: 'https://cdn-icons-png.flaticon.com/256/8662/8662305.png',
// };
// setUser(user);
