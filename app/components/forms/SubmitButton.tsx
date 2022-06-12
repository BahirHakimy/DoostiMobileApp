import React from "react";
import { useFormikContext } from "formik";

import Button, { ButtonProps } from "../Button";

function SubmitButton(props: ButtonProps) {
  const { handleSubmit } = useFormikContext();
  return <Button onPress={handleSubmit} {...props} />;
}

export default SubmitButton;
