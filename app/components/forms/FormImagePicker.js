import React from "react";
import { useFormikContext } from "formik";

import { ErrorMessage } from ".";
import ImageInputList from "../../unused/ImageInputList";

function FormImagePicker({ name }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  const handleAdd = (uri) => {
    setFieldValue(name, [...values[name], uri]);
  };

  const handleDelete = (imageUri) => {
    setFieldValue(
      name,
      values[name].filter((uri) => uri !== imageUri)
    );
  };

  return (
    <>
      <ImageInputList
        imageUris={values[name]}
        onAddImage={handleAdd}
        onRemoveImage={handleDelete}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormImagePicker;
