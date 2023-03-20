import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from "react-native";
import * as Yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormSwitch,
  SubmitButton,
} from "../components/forms";

import ad from "../api/ad";
import BackButton from "../navigation/BackButton";
import FormImagePicker from "../components/forms/FormImagePicker";
import UploadScreen from "./UploadScreen";
import MapLocationPicker from "../components/MapLocationPicker";
import TouchableIcon from "../components/TouchableIcon";
import useLocations from "../hooks/useLocations";
import useApi from "../hooks/useApi";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  contactNo: Yup.string().required().label("Contact No"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  model: Yup.string().required().label("Car Model"),
  engineCapacity: Yup.number().required().label("Engine Capacity"),
  feulType: Yup.string().required().label("Feul Type"),
  transmissionType: Yup.string().required().label("Transmission Type"),
  bodyType: Yup.string().required().label("Body Type"),
  assemblyType: Yup.string().required().label("Assembly Type"),
  vehicleType: Yup.string().required().label("Vehicle Type"),
  registerationCity: Yup.string().required().label("Registeration City"),
  exteriorColor: Yup.string().required().label("Exterior Color"),
  status: Yup.boolean().label("Status"),
  images: Yup.array().min(1, "Please select atleast 1 image"),
  //user
  description: Yup.string().label("Description"),
  mileage: Yup.number().required().label("Mileage"),
  location: Yup.string().label("Location"),
  //lat lang
});
const initialValues = {
  title: "",
  contactNo: "",
  price: "",
  model: "",
  engineCapacity: "",
  feulType: "",
  transmissionType: "",
  bodyType: "",
  assemblyType: "",
  vehicleType: "",
  registerationCity: "",
  exteriorColor: "",
  status: true,
  description: "",
  mileage: "",
  location: "",
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

  useEffect(() => {
    setRegion((prev) => ({ ...prev, ...currentLatlang }));
  }, [currentLatlang]);

  handleSubmit = async (adsData, { resetForm }) => {
    // setProgress(0);
    // setuploadVisible(true);
    // const result = await listingsApi.addListing(
    //   { ...listings, location },
    //   (prog) => setProgress(prog)
    // );

    // if (!result.ok) {
    //   setuploadVisible(false);
    //   return alert("Could not save the Ads");
    // }
    // resetForm();

    console.log(adsData);
  };

  return (
    <>
      <BackButton />
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
              />
              <FormField
                keyboardType="numeric"
                maxLength={8}
                name="price"
                placeholder="Price"
                width="65%"
              />
              <FormField width="50%" name="model" placeholder="Car Model" />
              <FormField
                keyboardType="numeric"
                name="engineCapacity"
                placeholder="Engine Capacity"
                width="50%"
              />
              <FormField width="60%" name="feulType" placeholder="Feul Type" />
              <FormField
                width="60%"
                name="transmissionType"
                placeholder="Transmission Type"
              />
              <FormField width="60%" name="bodyType" placeholder="Body Type" />
              <FormField
                width="60%"
                name="assemblyType"
                placeholder="Assembly Type"
              />
              <FormField
                width="70%"
                name="vehicleType"
                placeholder="Vehicle Type"
              />
              <FormField
                width="65%"
                name="registerationCity"
                placeholder="Registeration City"
              />
              <FormField
                width="50%"
                name="exteriorColor"
                placeholder="Exterior Color"
              />
              <AppFormSwitch placeholder="Status ?" name="status" />
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
                <FormField width="80%" name="location" placeholder="Location" />
                <TouchableIcon
                  name="location-pin"
                  family="entypo"
                  backgroundColor="dodgerblue"
                  iconColor="white"
                  style={50}
                />
              </View>

              <FormImagePicker name="images" />
              <SubmitButton title="Post" />
            </Form>
          </TouchableWithoutFeedback>
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
    paddingBottom: 50,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 10,
  },
});
export default AdsEditScreen;
