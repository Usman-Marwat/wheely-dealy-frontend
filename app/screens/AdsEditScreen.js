import React, { useEffect, useState } from 'react';
import {
	Button,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
	Keyboard,
	Text,
} from 'react-native';
import * as Yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
	AppForm as Form,
	AppFormField as FormField,
	AppFormSwitch,
	SubmitButton,
	AppFormPicker as Picker,
} from '../components/forms';

import FormImagePicker from '../components/forms/FormImagePicker';
import UploadScreen from './UploadScreen';
import MapLocationPicker from '../components/MapLocationPicker';
import TouchableIcon from '../components/TouchableIcon';
import useLocations from '../hooks/useLocations';
import sellerApi from '../api/seller';
import generalApi from '../api/general';
import useApi from '../hooks/useApi';
import MenuFoldButton from '../navigation/MenuFoldButton';
import useAuth from '../auth/useAuth';
import Header from '../components/Header';
import colors from '../config/colors';

const validationSchema = Yup.object().shape({
	title: Yup.string().required().min(1).label('Title'),
	contactNo: Yup.number().required().label('Contact No'),
	price: Yup.number().required().min(1000).label('Price'),
	model: Yup.number().required().label('Car Model'),
	engineCapacity: Yup.number().required().label('Engine Capacity'),
	fuelType: Yup.object().required().nullable().label('Feul Type'),
	transmissionType: Yup.object()
		.required()
		.nullable()
		.label('Transmission Type'),
	bodyType: Yup.object().required().nullable().label('Body Type'),
	assemblyType: Yup.object().required().nullable().label('Assembly Type'),
	vehicleType: Yup.object().required().nullable().label('Vehicle Type'),
	registrationCity: Yup.object()
		.required()
		.nullable()
		.label('Registration City'),
	exteriorColor: Yup.object().required().nullable().label('Exterior Color'),
	images: Yup.array().min(1, 'Please select atleast 1 image').max(20),
	description: Yup.string().label('Description'),
	mileage: Yup.number().required().label('Mileage'),
	otp: Yup.number().required().label('Otp'),
});
const initialValues = {
	title: '',
	contactNo: '',
	price: '',
	model: '',
	engineCapacity: '',
	fuelType: '',
	transmissionType: '',
	bodyType: '',
	assemblyType: '',
	vehicleType: '',
	registrationCity: '',
	exteriorColor: '',
	description: '',
	mileage: '',
	location: '',
	images: [],
};
const mapRegion = {
	latitude: 33.34,
	longitude: 37.347,
	latitudeDelta: 0.09,
	longitudeDelta: 0.09,
};

function AdsEditScreen() {
	const currentLatlang = useLocations();
	const [uploadVisible, setuploadVisible] = useState(false);
	const [progress, setProgress] = useState(0);
	const [mapVisible, setMapVisible] = useState(false);
	const [region, setRegion] = useState(mapRegion);
	const { user } = useAuth();

	const adsDataApi = useApi(sellerApi.getTypes);
	const postAdApi = useApi(sellerApi.postAd);
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

	if (!adsDataApi.data)
		return (
			<>
				<Header heading="Create Ad" />
				<View style={styles.noTypes}>
					<Text>Fetching Types data</Text>
				</View>
			</>
		);

	return (
		<>
			<Header heading="Create Ad" />
			<View style={styles.container}>
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
								keyboardType="numeric"
								width="50%"
								name="model"
								placeholder="Car Model"
							/>
							<FormField
								keyboardType="numeric"
								name="engineCapacity"
								placeholder="Engine Capacity"
								width="50%"
							/>
							<Picker
								items={adsDataApi.data.fuelTypeResponses}
								width="50%"
								name="fuelType"
								placeholder="Feul Type"
							/>
							<Picker
								items={adsDataApi.data.transmissionTypeResponses}
								width="60%"
								name="transmissionType"
								placeholder="Transmission Type"
							/>
							<Picker
								items={adsDataApi.data.bodyTypeResponses}
								width="60%"
								name="bodyType"
								placeholder="Body Type"
							/>
							<Picker
								items={adsDataApi.data.assemblyTypeResponses}
								name="assemblyType"
								placeholder="Assembly Type"
								width="50%"
							/>
							<Picker
								items={adsDataApi.data.vehicleTypeResponses}
								width="40%"
								name="vehicleType"
								placeholder="Vehicle Type"
							/>
							<Picker
								items={adsDataApi.data.registrationCityResponses}
								width="65%"
								name="registrationCity"
								placeholder="Registeration City"
							/>
							<Picker
								items={adsDataApi.data.exteriorColorResponses}
								width="50%"
								name="exteriorColor"
								placeholder="Exterior Color"
							/>
							<FormField
								maxLength={255}
								multiline
								name="description"
								numberOfLines={3}
								placeholder="Description"
							/>
							<FormField
								keyboardType="numeric"
								maxLength={8}
								name="mileage"
								placeholder="Mileage"
								width="50%"
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
		justifyContent: 'space-between',
		paddingRight: 10,
	},
	noTypes: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	otpField: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});
export default AdsEditScreen;
