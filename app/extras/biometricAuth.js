import { Alert, Text, View } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import AppButton from "../components/AppButton";

const checkHardawareSupport = async () => {
  return await LocalAuthentication.hasHardwareAsync();
};

const handleBiometricAuth = async () => {
  const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
  if (!savedBiometrics)
    return Alert.alert(
      "Biometric record not found",
      "You have been logged in based on your cached credentials",
      "OK",
      () => console.log("Fall back to default Auth")
    );
  return savedBiometrics;
};

export const doBiometricAuth = async () => {
  const compatible = await checkHardawareSupport();
  if (!compatible) return;
  const savedBiometrics = await handleBiometricAuth();
  if (savedBiometrics) {
    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Your auth credentials are cashed but give biometrics",
    });
    return biometricAuth;
  }
  return { success: true };
};

export const BiometricComponent = ({ onBiometric }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Your credentials are cached please provide biometric auth</Text>
      <AppButton
        title="Auth again"
        onPress={onBiometric}
        style={{ width: "50%" }}
      />
    </View>
  );
};
