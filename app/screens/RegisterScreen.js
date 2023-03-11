import React, { useState } from "react";
import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";
import { SharedElement } from "react-navigation-shared-element";
import * as Animatable from "react-native-animatable";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import _ from "lodash";

import {
  ErrorMessage,
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from "../components/forms";
import ActivityIndicator from "../components/ActivityIndicator";
import colors from "../config/colors";
import Icon from "../components/Icon";

const images = [
  "https://cdn-icons-png.flaticon.com/256/4105/4105443.png",
  "https://cdn-icons-png.flaticon.com/256/4105/4105444.png",
  "https://cdn-icons-png.flaticon.com/256/4105/4105445.png",
  "https://cdn-icons-png.flaticon.com/256/4105/4105446.png",
  "https://cdn-icons-png.flaticon.com/256/4105/4105447.png",
  "https://cdn-icons-png.flaticon.com/256/4105/4105448.png",
  "https://cdn-icons-png.flaticon.com/256/4105/4105449.png",
  "https://cdn-icons-png.flaticon.com/256/4105/4105450.png",
  "https://cdn-icons-png.flaticon.com/256/4105/4105451.png",
  "https://cdn-icons-png.flaticon.com/256/4105/4105452.png",
  "https://cdn-icons-png.flaticon.com/256/4105/4105453.png",
  "https://cdn-icons-png.flaticon.com/256/4105/4105454.png",
  "https://cdn-icons-png.flaticon.com/256/4105/4105455.png",
  "https://cdn-icons-png.flaticon.com/256/4105/4105456.png",
  "https://cdn-icons-png.flaticon.com/256/4105/4105457.png",
  "https://cdn-icons-png.flaticon.com/256/4105/4105458.png",
  "https://cdn-icons-png.flaticon.com/256/4105/4105459.png",
  "https://cdn-icons-png.flaticon.com/256/4105/4105460.png",
  "https://cdn-icons-png.flaticon.com/256/4105/4105461.png",
  "https://cdn-icons-png.flaticon.com/256/4105/4105462.png",
  "https://cdn-icons-png.flaticon.com/256/4359/4359980.png",
  "https://cdn-icons-png.flaticon.com/256/4105/4105447.png",
  "https://cdn-icons-png.flaticon.com/256/4105/4105445.png",
  "https://cdn-icons-png.flaticon.com/256/4359/4359995.png",
  "https://cdn-icons-png.flaticon.com/256/7102/7102052.png",
  "https://cdn-icons-png.flaticon.com/256/4392/4392529.png",
  "https://cdn-icons-png.flaticon.com/256/6823/6823056.png",
  "https://cdn-icons-png.flaticon.com/256/6599/6599071.png",
  "https://cdn-icons-png.flaticon.com/256/8326/8326716.png",
  "https://cdn-icons-png.flaticon.com/256/8326/8326730.png",
  "https://cdn-icons-png.flaticon.com/256/5907/5907040.png",
  "https://cdn-icons-png.flaticon.com/256/4193/4193253.png",
  "https://cdn-icons-png.flaticon.com/256/4193/4193257.png",
  "https://cdn-icons-png.flaticon.com/256/4193/4193258.png",
  "https://cdn-icons-png.flaticon.com/256/4193/4193276.png",
  "https://cdn-icons-png.flaticon.com/256/4193/4193278.png",
  "https://cdn-icons-png.flaticon.com/256/4193/4193281.png",
  "https://cdn-icons-png.flaticon.com/256/4193/4193286.png",
  "https://cdn-icons-png.flaticon.com/256/4193/4193289.png",
  "https://cdn-icons-png.flaticon.com/256/4193/4193305.png",
  "https://cdn-icons-png.flaticon.com/256/8587/8587562.png",
  "https://cdn-icons-png.flaticon.com/256/7402/7402922.png",
  "https://cdn-icons-png.flaticon.com/256/8662/8662349.png",
  "https://cdn-icons-png.flaticon.com/256/8662/8662176.png",
  "https://cdn-icons-png.flaticon.com/256/8662/8662182.png",
  "https://cdn-icons-png.flaticon.com/256/8662/8662190.png",
  "https://cdn-icons-png.flaticon.com/256/8662/8662204.png",
  "https://cdn-icons-png.flaticon.com/256/8662/8662218.png",
  "https://cdn-icons-png.flaticon.com/256/8662/8662230.png",
  "https://cdn-icons-png.flaticon.com/256/8662/8662245.png",
  "https://cdn-icons-png.flaticon.com/256/8662/8662187.png",
  "https://cdn-icons-png.flaticon.com/256/8662/8662276.png",
  "https://cdn-icons-png.flaticon.com/256/8662/8662299.png",
  "https://cdn-icons-png.flaticon.com/256/8662/8662311.png",
  "https://cdn-icons-png.flaticon.com/256/8662/8662349.png",
  "https://cdn-icons-png.flaticon.com/256/8662/8662201.png",
  "https://cdn-icons-png.flaticon.com/256/8662/8662216.png",
  "https://cdn-icons-png.flaticon.com/256/8662/8662222.png",
  "https://cdn-icons-png.flaticon.com/256/8662/8662228.png",
  "https://cdn-icons-png.flaticon.com/256/8662/8662234.png",
  "https://cdn-icons-png.flaticon.com/256/8662/8662241.png",
  "https://cdn-icons-png.flaticon.com/256/8662/8662248.png",
  "https://cdn-icons-png.flaticon.com/256/8662/8662255.png",
  "https://cdn-icons-png.flaticon.com/256/8662/8662264.png",
  "https://cdn-icons-png.flaticon.com/256/8662/8662274.png",
  "https://cdn-icons-png.flaticon.com/256/8662/8662283.png",
  "https://cdn-icons-png.flaticon.com/256/8662/8662291.png",
  "https://cdn-icons-png.flaticon.com/256/8662/8662298.png",
  "https://cdn-icons-png.flaticon.com/256/8662/8662305.png",
  "https://cdn-icons-png.flaticon.com/256/8662/8662310.png",
  "https://cdn-icons-png.flaticon.com/256/8662/8662316.png",
  "https://cdn-icons-png.flaticon.com/256/8662/8662329.png",
  "https://cdn-icons-png.flaticon.com/256/8662/8662338.png",
  "https://cdn-icons-png.flaticon.com/256/8662/8662347.png",
  "https://cdn-icons-png.flaticon.com/256/8662/8662356.png",
  "https://cdn-icons-png.flaticon.com/256/8662/8662363.png",
];

const { width, height } = Dimensions.get("screen");
const DURATION = 400;

const schemaFunction = (isValid) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("Name"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password"),
    phone: Yup.string()
      .required()
      .test(
        "test-name",
        "phone input should be like (0)3125103497",
        (value) => isValid
      ),
  });
  return validationSchema;
};

function RegisterScreen({ navigation, route }) {
  const { item, bg } = route.params;
  const [otpVisible, setOtpVisible] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({ actor: item.actor });
  const [error, setError] = useState();

  const handleSubmit = async (userInfo, { resetForm }) => {
    console.log(userInfo);
    // resetForm();
  };

  return (
    <>
      {/* <ActivityIndicator visible={registerApi.loading || otpApi.loading} /> */}
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.headingConatiner}>
            <SharedElement id={`item.${item.key}.image`}>
              <Image source={{ uri: item.image }} style={styles.image} />
            </SharedElement>
            <Animatable.View animation="fadeInUp" delay={DURATION / 2}>
              <Text style={styles.title}>{item.actor}</Text>
            </Animatable.View>
          </View>
          <Animatable.View animation="fadeInUp" delay={DURATION}>
            <Form
              initialValues={{ name: "", email: "", password: "" }}
              onSubmit={handleSubmit}
              validationSchema={schemaFunction(isValid)}
            >
              <ErrorMessage error={error} visible={error} />
              <FormField
                autoCorrect={false}
                icon="account"
                name="name"
                placeholder="Name"
              />
              <FormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="email"
                keyboardType="email-address"
                name="email"
                placeholder="Email"
                textContentType="emailAddress"
              />
              <FormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="lock"
                name="password"
                placeholder="Password"
                secureTextEntry
                textContentType="password"
              />
              <SubmitButton title="Register" bg={bg} />
            </Form>
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
        {/* <Button title="open" onPress={() => setOtpVisible(!otpVisible)} /> */}
      </KeyboardAwareScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  container: {
    padding: 10,
    paddingTop: 10,
  },
  headingConatiner: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: width / 2,
    height: width / 2.5,
    marginTop: 30,
    resizeMode: "contain",
    zIndex: 1,
  },

  title: {
    fontWeight: "800",
    fontSize: 32,
    textTransform: "uppercase",
    color: colors.medium,
    marginVertical: 20,
  },
});

export default RegisterScreen;

/* 
Comments in handleSubmit before - if (!result.ok) 

if (!result.ok) returns true that means the result failed
    //if result has data that means the server properly processed our request and sent us an error
    // else if the server did not send us the data that means something unexpected happen
    // maybe the server is offline or we do not have internet connection; we have offline notice
    // to care of this but its good to show a generic error message
    if (!result.ok) {
*/

/* 
"console.log(data)"
this gives us "null" when printed directly after setData()

"setData({ ...data, otp });
console.log(data);"
In handleOTP(), doing this above "const result = await registerApi.request(data)" sends the previous data without otp
The reason is because the component rerenders which redefines the handleotp() but the previous handleOtp 
funtion is executed. May be becasue its an asynchronous function because of logic of react.

*/
