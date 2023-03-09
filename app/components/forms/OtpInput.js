import React, { useState } from "react";
import { Button, Modal, StyleSheet, Text, View } from "react-native";
import OTPTextInput from "react-native-otp-textinput";
import colors from "../../config/colors";
import AppButton from "../AppButton";

const otpLength = 6;

const OtpInput = ({ otpVisible, onOtpVisible, onSendOtp, color }) => {
  const [disabled, setDisabled] = useState(true);
  const [otp, setOtp] = useState("");

  const handleInputText = (text) => {
    setOtp(text);
    if (text.length === otpLength) setDisabled(false);
    else setDisabled(true);
  };

  return (
    <Modal
      animationType="slide"
      visible={otpVisible}
      style={{ backgroundColor: "red", flex: 1 }}
    >
      <Button title="Close" onPress={() => onOtpVisible(!otpVisible)} />
      <View style={[styles.modalContainer]}>
        <View style={[styles.wrapper, { backgroundColor: color }]}>
          <Text style={[styles.text]}>Enter Email Otp</Text>
          <OTPTextInput
            textInputStyle={styles.textInput}
            handleTextChange={handleInputText}
            inputCount={6}
            tintColor={color}
          />
          <AppButton
            disabled={disabled}
            title="Send"
            titleStyle={{ color }}
            style={styles.buttonStyle}
            onPress={() => {
              onSendOtp(otp);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default OtpInput;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: colors.white,
    width: 120,
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    display: "flex",
    top: 270,
    backgroundColor: "rgba(0,0,0,0)",
  },
  text: {
    color: "white",
    fontWeight: "700",
    fontSize: 30,
    textTransform: "uppercase",
  },
  textInput: {
    marginHorizontal: 7,
    marginTop: 20,
    borderWidth: 1,
    backgroundColor: "white",
  },
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginHorizontal: 2,
    marginVertical: 10,
    borderRadius: 10,
  },
});
