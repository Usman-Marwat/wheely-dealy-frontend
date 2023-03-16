import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { useFormikContext } from "formik";

import colors from "../../config/colors";
import ErrorMessage from "./ErrorMessage";

const AppPhoneInput = ({ name, onCheck }) => {
  const phoneInput = useRef(null);

  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();

  const handleText = (text) => {
    const valid = phoneInput.current?.isValidNumber(text);
    onCheck(valid);
    let formatted = phoneInput.current?.getNumberAfterPossiblyEliminatingZero();
    setFieldValue(name, formatted.formattedNumber);
  };

  return (
    <>
      <View style={styles.container}>
        <PhoneInput
          ref={phoneInput}
          containerStyle={{ width: "100%", height: 55 }}
          flagButtonStyle={styles.phoneButtonStyle}
          defaultCode="PK"
          layout="first"
          value={values[name]}
          textInputProps={{
            placeholderTextColor: colors.medium,
            onBlur: () => setFieldTouched(name),
            onEndEditing: (e) => {
              handleText(e.nativeEvent.text);
            },
          }}
          textContainerStyle={styles.phoneInputStyle}
          codeTextStyle={styles.code}
        />
      </View>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default AppPhoneInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: "80%",
  },
  code: {
    color: colors.medium,
    fontWeight: "700",
    marginLeft: -20,
  },
  phoneInputStyle: {
    backgroundColor: colors.light,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  phoneButtonStyle: {
    backgroundColor: colors.light,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
});
