import React from "react";
import { Dimensions } from "react-native";
import { useFormikContext } from "formik";

import MyMap from "../MyMap";
import ErrorMessage from "./ErrorMessage";

const { height } = Dimensions.get("screen");

const AppFormMap = ({ name, region, onChangeRegion, snapUri, onTakeSnap }) => {
  const { errors, setFieldValue, touched } = useFormikContext();

  const handleAddLocation = (latlan) => {
    setFieldValue(name, latlan);
    onChangeRegion({ ...region, ...latlan });
  };

  return (
    <>
      <MyMap
        onAddlocation={handleAddLocation}
        style={{ height: height / 1.8, marginBottom: 7 }}
        region={region}
        onTakeSnap={onTakeSnap}
        snapUri={snapUri}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default AppFormMap;
