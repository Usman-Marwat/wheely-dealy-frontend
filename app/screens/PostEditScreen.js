import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import * as Yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  ErrorMessage,
  AppForm,
  AppFormField,
  SubmitButton,
} from "../components/forms";
import Header from "../components/Header";
import FormImagePicker from "../components/forms/FormImagePicker";

const validationSchema = Yup.object().shape({
  text: Yup.string().required().min(1).label("Text"),
  images: Yup.array().min(1, "Please select atleast 1 image"),
});
const initialValues = {
  text: "",
  images: [],
};

const PostEditScreen = ({ navigation }) => {
  const [error, setError] = useState(false);

  const handleSubmit = async (firmProfile, { resetForm }) => {
    console.log("hi");
  };
  return (
    <>
      <Header />
      <View style={styles.container}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <AppForm
                initialValues={{
                  ...initialValues,
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                <ErrorMessage error={error} visible={error} />
                <FormImagePicker name="images" />
                <AppFormField
                  width="70%"
                  icon="card-text"
                  name="text"
                  placeholder="Text"
                />
                <SubmitButton title="Send" />
              </AppForm>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};

export default PostEditScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 70,
  },
});
