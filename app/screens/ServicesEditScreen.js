import { useEffect, useState } from 'react';
import {
	Button,
	Keyboard,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';
import {
	AppForm as Form,
	AppFormField as FormField,
	AppFormPicker as Picker,
	SubmitButton,
} from '../components/forms';

import generalApi from '../api/general';
import sellerApi from '../api/seller';
import useAuth from '../auth/useAuth';
import Header from '../components/Header';
import MapLocationPicker from '../components/MapLocationPicker';
import TouchableIcon from '../components/TouchableIcon';
import FormImagePicker from '../components/forms/FormImagePicker';
import useApi from '../hooks/useApi';
import useLocations from '../hooks/useLocations';
import UploadScreen from './UploadScreen';
import Empty from '../components/Empty';
import colors from '../config/colors';

const validationSchema = Yup.object().shape({
	title: Yup.string().required().min(1).label('Title'),
	contactNo: Yup.number().required().label('Contact No'),
	price: Yup.number().required().min(1000).label('Price'),
	description: Yup.string().label('Description'),
	serviceType: Yup.object().required().nullable().label('Service Type'),
	images: Yup.array().min(1, 'Please select atleast 1 image').max(20),
	otp: Yup.number().required().label('Otp'),
});
const initialValues = {
	title: '',
	contactNo: '',
	price: '',
	description: '',
	serviceType: null,
	images: [],
	otp: '',
};
const mapRegion = {
	latitude: 33.34,
	longitude: 37.347,
	latitudeDelta: 0.09,
	longitudeDelta: 0.09,
};

function ServicesEditScreen() {
	const currentLatlang = useLocations();
	const [uploadVisible, setuploadVisible] = useState(false);
	const [progress, setProgress] = useState(0);
	const [mapVisible, setMapVisible] = useState(false);
	const [region, setRegion] = useState(mapRegion);
	const { user } = useAuth();

	const adsDataApi = useApi(sellerApi.getServiceTypes);
	const postAdApi = useApi(sellerApi.postServiceAd);
	const postOtpApi = useApi(generalApi.getPostOtp);

	useEffect(() => {
		adsDataApi.request();
	}, []);

	useEffect(() => {
		setRegion((prev) => ({ ...prev, ...currentLatlang }));
	}, [currentLatlang]);

	const generateOtp = () => {
		postOtpApi.request();
	};

	handleSubmit = async (adsData, { resetForm }) => {
		// console.log(adsData);
		setProgress(0);
		setuploadVisible(true);

		const result = await postAdApi.request(
			{
				...adsData,
				latitude: region.latitude,
				longitude: region.longitude,
				userGId: user.user_id,
			},
			(prog) => setProgress(prog)
		);

		if (!result.ok) {
			setuploadVisible(false);
			return alert(result.data.message);
		}

		// resetForm();
	};

	return (
		<>
			<Header heading="Create Ad" />
			<View style={styles.container}>
				{!adsDataApi.data && <Empty title="Fetching Types data" />}

				<KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<Form
							initialValues={{ ...initialValues }}
							onSubmit={handleSubmit}
							validationSchema={validationSchema}
						>
							<FormField maxLength={255} name="title" placeholder="Title" />
							<FormField
								width="80%"
								name="contactNo"
								placeholder="Contact No"
								keyboardType="numeric"
							/>
							<FormField
								keyboardType="numeric"
								maxLength={8}
								name="price"
								placeholder="Price"
								width="65%"
							/>
							<FormField
								maxLength={255}
								multiline
								name="description"
								numberOfLines={3}
								placeholder="Description"
							/>
							<Picker
								items={adsDataApi.data}
								width="50%"
								name="serviceType"
								placeholder="Service Type"
							/>

							<View style={styles.location}>
								<TouchableIcon
									name="location-pin"
									family="entypo"
									backgroundColor={colors.primary}
									iconColor="white"
									style={50}
									onPress={() => setMapVisible(true)}
								/>
							</View>

							<FormImagePicker name="images" />
							<View style={styles.otpField}>
								<FormField
									width="60%"
									name="otp"
									maxLength={6}
									placeholder="Generate OTP"
									keyboardType="numeric"
								/>
								<Button
									title="generate"
									onPress={generateOtp}
									color={colors.primary}
								/>
							</View>
							<SubmitButton title="Post" />
						</Form>
					</TouchableWithoutFeedback>
					<View style={{ height: 100 }} />
				</KeyboardAwareScrollView>

				<MapLocationPicker
					visible={mapVisible}
					onPress={() => setMapVisible(false)}
					region={currentLatlang ? { ...region, ...currentLatlang } : region}
					onAddlocation={(coords) =>
						setRegion((prev) => ({ ...prev, ...coords }))
					}
				/>

				<UploadScreen
					onDone={() => setuploadVisible(false)}
					progress={progress}
					visible={uploadVisible}
				/>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		paddingBottom: 10,
	},
	location: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		paddingRight: 10,
	},
	otpField: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});
export default ServicesEditScreen;
