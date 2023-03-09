import React from "react";
import { useFormikContext } from "formik";

import AppButton from "../AppButton";
import colors from "../../config/colors";

function SubmitButton({ title, bg = colors.primary }) {
  const { handleSubmit } = useFormikContext();

  return (
    <AppButton
      title={title}
      onPress={handleSubmit}
      style={{ marginTop: 10, backgroundColor: bg }}
    />
  );
}

export default SubmitButton;
