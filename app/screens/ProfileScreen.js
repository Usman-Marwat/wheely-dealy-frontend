import { useEffect, useState } from 'react';
import {
	Button,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import * as Yup from 'yup';

import authApi from '../api/auth';
import userApi from '../api/user';
import useAuth from '../auth/useAuth';
import ActivityIndicator from '../components/ActivityIndicator';
import AppModal from '../components/AppModal';
import Empty from '../components/Empty';
import Icon from '../components/Icon';
import { AppForm, AppFormField, SubmitButton } from '../components/forms';
import colors from '../config/colors';
import randomAvatars from '../config/randomAvatars';
import useApi from '../hooks/useApi';
import BackButton from '../navigation/BackButton';
import MenuFoldButton from '../navigation/MenuFoldButton';

const validationSchema = Yup.object().shape({
	name: Yup.string().required().min(1).label('Name'),
	email: Yup.string().required().email().label('Email'),
});

function ProfileScreen({ navigation }) {
	const [visible, setVisible] = useState(false);
	const [passwordVisible, setPasswordVisble] = useState(false);
	const [otpDisable, setOtpDisable] = useState(false);
	const [imageUri, setImageUri] = useState();
	const { user: currentUser } = useAuth();

	const updateProdileApi = useApi(userApi.updateProfile);
	const myAccountApi = useApi(authApi.getMyAccount);
	const passwordOtpApi = useApi(authApi.getPasswordOtp);
	const resetPasswordApi = useApi(authApi.resetPassword);

	const updateProfile = async (formData) => {
		const { data } = await updateProdileApi.request({ ...formData });
		alert(data?.message);
	};
	const changePassword = async (formData) => {
		const { data } = await resetPasswordApi.request({
			email: myAccountApi.data.email,
			...formData,
		});
		if (data?.statusCode === 200) alert(data.message);
	};
	const generateOtp = () => {
		passwordOtpApi.request(myAccountApi.data.email);
	};

	useEffect(() => {
		myAccountApi.request();
	}, []);

	if (!myAccountApi.data)
		return (
			<>
				<ActivityIndicator visible={myAccountApi.loading} />
				<Empty title="Could not fetch profile" />
			</>
		);

	const user = myAccountApi.data;

	return (
		<View style={styles.container}>
			<BackButton />
			<MenuFoldButton />
			<ActivityIndicator
				visible={myAccountApi.loading || resetPasswordApi.loading}
			/>

			<View style={styles.profileDetailsSection}>
				<View style={styles.row}>
					<View style={styles.statisticsContainer}>
						<Text style={styles.statisticsText}>{user.followersCount}</Text>
						<Text style={styles.statisticsTitle}>Followers Count</Text>
					</View>
					<Image
						style={styles.profilePhoto}
						source={{
							uri: user.profilePictureURL || randomAvatars(),
						}}
					/>
					<View style={styles.statisticsContainer}>
						<Text style={styles.statisticsText}>{user.adsCount}</Text>
						<Text style={styles.statisticsTitle}>Ads Count</Text>
					</View>
				</View>
				<View style={styles.profileCenterSection}>
					<Text style={styles.name}>{user.name}</Text>
					<Text style={styles.designationText}>{user.accountType.type}</Text>
					<Button
						color={colors.medium}
						title="change"
						onPress={() => setVisible(true)}
					/>
				</View>
			</View>

			<View style={styles.exploreSection}>
				<Text style={styles.exploreHeader}>Explore</Text>
				<View style={styles.exploreContent}>
					<TouchableOpacity
						style={styles.singleExplore}
						onPress={() => navigation.navigate('PostList')}
					>
						<Icon
							family="ionicons"
							name="people"
							backgroundColor="transparent"
							iconColor={colors.secondary}
							size={44}
						/>
						<Text style={styles.exploreText}>Posts</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.singleExplore}
						onPress={() => navigation.navigate('Todos')}
					>
						<Icon
							family="mci"
							name="crown"
							backgroundColor="transparent"
							iconColor={colors.primary}
							size={44}
						/>
						<Text style={styles.exploreText}>My-Todos</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.singleExplore}
						onPress={() => setPasswordVisble(true)}
					>
						<Icon
							family="antDesign"
							name="setting"
							backgroundColor="transparent"
							iconColor={colors.secondary}
							size={44}
						/>
						<Text style={styles.exploreText}> Password</Text>
					</TouchableOpacity>
				</View>
			</View>

			<AppModal
				heading="Update Profile"
				visible={visible}
				onVisible={() => setVisible(false)}
			>
				<AppForm
					initialValues={{
						username: currentUser.username,
						name: currentUser.name,
						email: currentUser.email,
						about: currentUser.about,
					}}
					onSubmit={updateProfile}
					// validationSchema={validationSchema}
				>
					<AppFormField width={'70%'} name="username" placeholder="User Name" />
					<AppFormField name="name" placeholder="Name" />
					<AppFormField name="email" placeholder="Email" />
					<AppFormField name="about" placeholder="About" />
					{/* <ImageInput
						imageUri={imageUri}
						onChangeImage={(uri) => setImageUri(uri)}
					/> */}
					<SubmitButton title="Update" />
				</AppForm>
			</AppModal>

			<AppModal
				heading="Change Password"
				visible={passwordVisible}
				onVisible={() => setPasswordVisble(false)}
			>
				<AppForm
					initialValues={{
						otp: '',
						password: '',
					}}
					onSubmit={() => {
						setPasswordVisble(false);
						changePassword();
					}}
				>
					<View style={styles.otpField}>
						<AppFormField
							width="60%"
							name="otp"
							maxLength={6}
							placeholder="OTP"
							keyboardType="numeric"
						/>
						<Button
							title="generate"
							onPress={() => {
								setOtpDisable(true);
								generateOtp();
							}}
							disabled={otpDisable}
						/>
					</View>
					<AppFormField
						autoCapitalize="none"
						name="password"
						placeholder="New Password"
					/>
					<SubmitButton title="Change " />
				</AppForm>
			</AppModal>
		</View>
	);
}

export default ProfileScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fafafa',
	},
	headerTitle: {
		fontWeight: 'bold',
		fontSize: 20,
	},
	leftHeaderWrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	backButton: {
		marginRight: 10,
	},
	profileDetailsSection: {
		paddingTop: 40,
		backgroundColor: '#fff',
		paddingHorizontal: 16,
		borderBottomStartRadius: 30,
		borderBottomEndRadius: 30,
		paddingBottom: 30,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.5,
		shadowRadius: 1,
		elevation: 1,
	},
	row: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 20,
	},
	profilePhoto: {
		height: 80,
		width: 80,
		borderRadius: 50,
		borderWidth: 1,
		borderColor: colors.primary,
		right: 20,
	},
	statisticsContainer: {
		display: 'flex',
		alignItems: 'center',
	},
	statisticsText: {
		color: colors.primary,
		fontSize: 13,
		fontWeight: 'bold',
	},
	statisticsTitle: {
		fontSize: 13,
		color: colors.medium,
	},
	profileCenterSection: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	name: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
	designationText: {
		fontSize: 12,
		color: colors.medium,
		marginBottom: 20,
	},
	editProfileWrapper: {
		backgroundColor: colors.primary,
		paddingHorizontal: 25,
		borderRadius: 5,
		paddingVertical: 10,
	},
	editProfileText: {
		color: '#fff',
	},
	exploreSection: {
		paddingHorizontal: 16,
		paddingTop: 30,
	},
	exploreHeader: {
		fontWeight: 'bold',
		marginBottom: 30,
		fontSize: 14,
	},
	exploreContent: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
	singleExplore: {
		height: 80,
		width: '28%',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.5,
		shadowRadius: 1,
		elevation: 1,
		backgroundColor: '#fff',
		margin: 1,
		marginBottom: 20,
		borderRadius: 20,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'flex-start',
	},
	exploreText: {
		fontWeight: 'bold',
		fontSize: 14,
		color: colors.medium,
	},
	otpField: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});
