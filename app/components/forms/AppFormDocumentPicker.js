import React from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import DocumentPicker from "../DocumentPicker";

const AppFormDocumentPicker = ({ name }) => {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const files = values[name];

  const handleAdd = async (newFile) => {
    setFieldValue(name, [...files, newFile]);
  };

  const handleRemove = (newFile) => {
    setFieldValue(
      name,
      files.filter((file) => file.name !== newFile.name)
    );
  };

  return (
    <>
      <DocumentPicker
        onAddFile={handleAdd}
        onRemoveFile={handleRemove}
        files={files}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default AppFormDocumentPicker;
