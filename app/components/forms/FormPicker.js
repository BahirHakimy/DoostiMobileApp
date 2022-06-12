import { useFormikContext } from "formik";
import React from "react";
import ErrorMessage from "./ErrorMessage";
import Picker from "../Picker";

function FormPicker({ name, additionalSelectActions = null, ...otherProps }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  return (
    <>
      <Picker
        onSelectItem={(item) => {
          setFieldValue(name, item), additionalSelectActions?.(item);
        }}
        selectedItem={values[name]}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormPicker;
