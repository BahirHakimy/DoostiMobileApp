import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Image,
  Text,
  ScrollView,
} from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
  NextButton,
} from "../components/forms";
import authApi from "../api/auth";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";
import colors from "../configs/colors";
import NativePicker from "../components/forms/NativePicker";
import { capitalize, paginate } from "../utility/tools";
import Button from "../components/Button";
import routes from "../components/navigation/routes";

const validationSchema = Yup.object().shape({
  fullname: Yup.string()
    .required()
    .max(55)
    .matches(/^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+ *$/i, {
      message: "Fullname should be seprated by a space e.g: 'Ahmad Ahmadi",
    })
    .label("Fullname"),
  username: Yup.string().required().max(30).label("Username"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Passwords must match"),
  gender: Yup.string().required("Please select your gender").label("Gender"),
});

const GENDERS = [
  { id: 1, label: "Male", value: "M" },
  { id: 2, label: "Female", value: "FM" },
  { id: 3, label: "Other", value: "O" },
];

const initialValues = {
  fullname: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  gender: "",
};
const icons = {
  fullname: "account-details-outline",
  username: "account",
  email: "email",
  password: "lock",
  confirmPassword: "lock",
};

function RegisterScreen({ navigation }) {
  const [page, setPage] = React.useState(1);
  const registerApi = useApi(authApi.register);
  const loginApi = useApi(authApi.login);

  const handleNext = (errors, setFieldTouched) => {
    const fields = paginate(Object.keys(initialValues), 2, page);
    let hasError = false;
    fields.forEach((key) => {
      setFieldTouched(key, true, true);
    });
    fields.forEach((key) => {
      if (Object.keys(errors).indexOf(key) !== -1) {
        hasError = true;
      }
    });

    if (!hasError) setPage((page) => page + 1);
  };

  const handleSubmit = async (userInfo) => {
    [userInfo.first_name, userInfo.last_name] = userInfo.fullname.split(" ");
    const response = await registerApi.request(userInfo);
    if (response.ok) {
      const { username, password } = userInfo;
      navigation.navigate(routes.ADDITIONALINFO, { username, password });
    } else {
      if (response.data?.errors) {
        Object.keys(response.data.errors).forEach((key) => {
          registerApi.setError(response.data.errors[key][0]);
        });
      }
    }
  };

  return (
    <ImageBackground
      blurRadius={5}
      style={styles.background}
      source={require("../assets/bg2.jpg")}
    >
      <ActivityIndicator visible={loginApi.loading || registerApi.loading} />
      <Screen style={styles.container}>
        <ScrollView>
          <Image
            style={styles.logo}
            source={require("../assets/logo512.png")}
          />
          <Text style={styles.title}>Doosti</Text>
          <Form
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <ErrorMessage
              visible={registerApi.error !== null}
              error={registerApi.error}
            />
            {paginate(Object.keys(initialValues), 2, page).map((key) => {
              return key === "gender" ? (
                <NativePicker
                  items={GENDERS}
                  name="gender"
                  placeholder="Gender"
                  key={key}
                />
              ) : (
                <FormField
                  autoFocus={key === "fullname" || key === "password"}
                  key={key}
                  autoCorrect={false}
                  icon={icons[key]}
                  name={key}
                  keyboardType={key === "email" ? "email-address" : "default"}
                  placeholder={capitalize(key)}
                  secureTextEntry={key.toLowerCase().includes("password")}
                />
              );
            })}
            {page === 1 ? (
              <NextButton title="Next" onPress={handleNext} />
            ) : (
              <>
                <SubmitButton color={colors.cyan} title="Register" />
                <Button
                  title="Back"
                  onPress={() => setPage((current) => current - 1)}
                />
              </>
            )}
          </Form>
        </ScrollView>
      </Screen>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: { flex: 1 },
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.danger,
    textShadowColor: colors.medium,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    textAlign: "center",
    marginBottom: 30,
  },
});

export default RegisterScreen;
