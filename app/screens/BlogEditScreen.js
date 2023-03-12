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
  AppFormCategoriesPicker,
  SubmitButton,
} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Header from "../components/Header";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(1).label("Name"),
  tagline: Yup.string().required().min(1).label("Tagline"),
  email: Yup.string().required().email().label("Email"),
  address: Yup.string().required().min(1).label("Address"),
  categories: Yup.array().min(1, "Please select atleast 1 category"),
  blog: Yup.string().label("About Us"),
});
const initialValues = {
  name: "",
  tagline: "",
  email: "",
  address: "",
  services: [],
  blog: "There is no denying the importance of a well-designed, secure website for your ecommerce needs. An online store provides many opportunities for you to connect with your audience on a more personal level based on the content you publish and the stories you tell. And when it comes to personalizing your online store, nothing is more effective than an About Us page.",
};
const categories = [
  {
    image: "https://cdn-icons-png.flaticon.com/128/1001/1001327.png",
    label: "Painting",
    value: 1,
  },
  {
    image: "https://cdn-icons-png.flaticon.com/128/313/313022.png",
    label: "Plumbing",
    value: 2,
  },
  {
    image: "https://cdn-icons-png.flaticon.com/128/7899/7899526.png",
    label: "Roofing",
    value: 3,
  },
  {
    image: "https://cdn-icons-png.flaticon.com/128/360/360129.png",
    label: "Partition",
    value: 4,
  },
  {
    image: "https://cdn-icons-png.flaticon.com/128/4647/4647616.png",
    label: "Flooring",
    value: 5,
  },
  {
    image: "https://cdn-icons-png.flaticon.com/128/3540/3540105.png",
    label: "Wiring",
    value: 6,
  },
  {
    image: "https://cdn-icons-png.flaticon.com/128/7482/7482326.png",
    label: "Carpentry",
    value: 7,
  },
  {
    image: "https://cdn-icons-png.flaticon.com/128/8530/8530581.png",
    label: "Dry Lining",
    value: 8,
  },
  {
    image: "https://cdn-icons-png.flaticon.com/128/2508/2508203.png",
    label: "Decorating",
    value: 9,
  },
];

const BlogEditScreen = ({ navigation }) => {
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
                <AppFormField
                  width="70%"
                  icon="emoticon-outline"
                  name="name"
                  placeholder="Name"
                />
                <AppFormField
                  width="80%"
                  icon="subtitles-outline"
                  name="tagline"
                  placeholder="Tagline"
                />
                <AppFormField
                  width="80%"
                  name="email"
                  icon="email"
                  placeholder="Email"
                />
                <AppFormField name="address" placeholder="Address" />
                <AppFormCategoriesPicker
                  items={categories}
                  name="services"
                  numberOfcolumns={3}
                  PickerItemComponent={CategoryPickerItem}
                />
                <AppFormField
                  maxLength={255}
                  multiline
                  name="blog"
                  numberOfLines={3}
                  placeholder="About Us"
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

export default BlogEditScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 70,
  },
});
