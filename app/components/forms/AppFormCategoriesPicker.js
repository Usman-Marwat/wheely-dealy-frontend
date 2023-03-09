import { StyleSheet } from "react-native";
import React from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import CategoriesPicker from "../CategoriesPicker";

const AppFormCategoriesPicker = ({
  name,
  items,
  PickerItemComponent,
  numberOfcolumns,
}) => {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const categories = values[name];

  const handleAdd = async (category) => {
    setFieldValue(name, [...categories, category.label]);
  };

  const handleRemove = (label) => {
    setFieldValue(
      name,
      categories.filter((categoryLabel) => categoryLabel !== label)
    );
  };

  return (
    <>
      <CategoriesPicker
        items={items}
        categories={categories}
        numberOfcolumns={numberOfcolumns}
        onAddCategory={handleAdd}
        onRemoveCategory={handleRemove}
        PickerItemComponent={PickerItemComponent}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default AppFormCategoriesPicker;

const styles = StyleSheet.create({});
