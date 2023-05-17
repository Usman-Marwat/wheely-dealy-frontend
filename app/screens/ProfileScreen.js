import React, { useState } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	Button,
} from 'react-native';
import * as Yup from 'yup';

import { AppForm, AppFormField, SubmitButton } from '../components/forms';
import AppModal from '../components/AppModal';
import colors from '../config/colors';
import Header from '../components/Header';
import ImageInput from '../components/ImageInput';
import Icon from '../components/Icon';
import useAuth from '../auth/useAuth';

const validationSchema = Yup.object().shape({
	name: Yup.string().required().min(1).label('Name'),
	email: Yup.string().required().email().label('Email'),
});

function ProfileScreen({ navigation }) {
	const [visible, setVisible] = useState(false);
	const [imageUri, setImageUri] = useState();
	const { user } = useAuth();

	const updateProfile = () => {
		console.log('hi');
	};

	return (
		<View style={styles.container}>
			<Header />

			<View style={styles.profileDetailsSection}>
				<View style={styles.row}>
					<View style={styles.statisticsContainer}>
						<Text style={styles.statisticsText}>135</Text>
						<Text style={styles.statisticsTitle}>Completed Tasks</Text>
					</View>
					<Image
						style={styles.profilePhoto}
						source={{
							uri: 'user.image',
						}}
					/>
					<View style={styles.statisticsContainer}>
						<Text style={styles.statisticsText}>20</Text>
						<Text style={styles.statisticsTitle}>Ongoing Tasks</Text>
					</View>
				</View>
				<View style={styles.profileCenterSection}>
					<Text style={styles.name}>{user.name}</Text>
					<Text style={styles.designationText}>{user.account_type}</Text>
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
					<TouchableOpacity style={styles.singleExplore}>
						<Icon
							family="ionicons"
							name="people"
							backgroundColor="transparent"
							iconColor={colors.secondary}
							size={44}
						/>
						<Text style={styles.exploreText}>Members</Text>
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
					<TouchableOpacity style={styles.singleExplore}>
						<Icon
							family="fontisto"
							name="pie-chart-1"
							backgroundColor="transparent"
							iconColor={colors.primary}
							size={44}
						/>
						<Text style={styles.exploreText}>Report</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.singleExplore}>
						<Icon
							family="antDesign"
							name="setting"
							backgroundColor="transparent"
							iconColor={colors.secondary}
							size={44}
						/>
						<Text style={styles.exploreText}>Settings</Text>
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
						name: 'user.name',
						email: 'user.email',
					}}
					onSubmit={updateProfile}
					validationSchema={validationSchema}
				>
					<AppFormField
						width={'70%'}
						icon="ornament"
						name="name"
						placeholder="Name"
						backgroundColor={colors.light}
					/>
					<AppFormField
						autoCapitalize="none"
						autoCorrect={false}
						icon="email"
						keyboardType="email-address"
						name="email"
						placeholder="Email"
						textContentType="emailAddress"
					/>
					<ImageInput
						imageUri={imageUri}
						onChangeImage={(uri) => setImageUri(uri)}
					/>
					<SubmitButton title="Update" />
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
		display: 'flex',
		alignItems: 'center',
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
});
