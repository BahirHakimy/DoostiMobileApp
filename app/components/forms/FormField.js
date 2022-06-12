import { useFormikContext } from "formik";
import React from "react";
import TextInput from "../TextInput";
import ErrorMessage from "./ErrorMessage";

function FormField({ name, ...otherProps }) {
  const { errors, handleChange, setFieldTouched, touched, values } =
    useFormikContext();
  return (
    <>
      <TextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        value={values[name]}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormField;
