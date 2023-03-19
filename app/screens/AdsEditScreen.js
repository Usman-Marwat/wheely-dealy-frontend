import React, { useState } from "react";
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
  AppFormPicker as Picker,
  SubmitButton,
} from "../components/forms";

import FormImagePicker from "../components/forms/FormImagePicker";
import useLocations from "../hooks/useLocations";
import UploadScreen from "./UploadScreen";
import BackButton from "../navigation/BackButton";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  contactNo: Yup.string().required().label("Contact No"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  model: Yup.string().required().label("Car Model"),
  engineCapacity: Yup.number().required().label("Engine Capacity"),
  feulType: Yup.string().required().label("Feul Type"),
  transmissiontype: Yup.string().required().label("Transmission Type"),
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

function AdsEditScreen() {
  const location = useLocations();
  const [uploadVisible, setuploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

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

    console.log(adsData.images);
  };

  return (
    <>
      <BackButton />
      <View style={styles.container}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Form
              initialValues={{
                title: "",
                contactNo: "",
                price: "",
                description: "",
                images: [],
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <FormImagePicker name="images" />
              <FormField maxLength={255} name="title" placeholder="Title" />
              <FormField
                keyboardType="numeric"
                maxLength={8}
                name="price"
                placeholder="Price"
                width={120}
              />
              <FormField
                maxLength={255}
                multiline
                name="description"
                numberOfLines={3}
                placeholder="Description"
              />
              <SubmitButton title="Post" />
            </Form>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
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
    padding: 10,
  },
});
export default AdsEditScreen;
