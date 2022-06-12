import React from "react";
import { useFormikContext } from "formik";

import Button from "../Button";

function NextButton({ title, onPress, ...otherProps }) {
  const { setFieldTouched, errors } = useFormikContext();
  return (
    <Button
      title={title}
      onPress={() => onPress(errors, setFieldTouched)}
      {...otherProps}
    />
  );
}

export default NextButton;
