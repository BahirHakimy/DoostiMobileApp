import { Formik } from "formik";

function Form({
  children,
  initialValues,
  onSubmit,
  validationSchema,
  ...rest
}) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      {...rest}
    >
      {() => <>{children}</>}
    </Formik>
  );
}

export default Form;
