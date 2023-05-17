import React, { useContext, useState } from 'react';
import {
	Dimensions,
	StyleSheet,
	Image,
	Text,
	View,
	TouchableOpacity,
} from 'react-native';
import * as Yup from 'yup';
import { SharedElement } from 'react-navigation-shared-element';
import * as Animatable from 'react-native-animatable';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import ActivityIndicator from '../components/ActivityIndicator';

import AuthContext from '../auth/context';
import authStorage from '../auth/storage';

import {
	ErrorMessage,
	AppForm,
	AppFormField,
	SubmitButton,
} from '../components/forms';
import authApi from '../api/auth';
import useAuth from '../auth/useAuth';
import useApi from '../hooks/useApi';
import Icon from '../components/Icon';
import colors from '../config/colors';

const { width, height } = Dimensions.get('screen');
const DURATION = 400;

const validationSchema = Yup.object().shape({
	email: Yup.string().required().email().label('Email'),
	password: Yup.string().required().min(4).label('Password'),
});

function LoginScreen({ navigation, route }) {
	const { item, bg } = route.params;
	const [error, setError] = useState();
	const { user, setUser } = useContext(AuthContext);
	const loginApi = useApi(authApi.login);
	const { logIn } = useAuth();

	const handleSubmit = async (userInfo) => {
		// console.log(userInfo);
		const user = {
			name: 'aman',
			role: 'Seller',
			user_id: '63390ba766243cb0ff33ecd5',
			image: 'https://cdn-icons-png.flaticon.com/256/8662/8662305.png',
		};
		setUser(user);
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
							initialValues={{ email: '', password: '' }}
							onSubmit={handleSubmit}
							validationSchema={validationSchema}
						>
							<ErrorMessage error={error} visible={error} />
							<AppFormField
								autoCapitalize="none"
								autoCorrect={false}
								icon="email"
								keyboardType="email-address"
								name="email"
								placeholder="Email"
								textContentType="emailAddress"
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
