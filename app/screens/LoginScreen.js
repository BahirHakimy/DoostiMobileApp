import React from "react";
import { StyleSheet, Image, Text, ImageBackground } from "react-native";
import * as Yup from "yup";
import authApi from "../api/auth";

import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";
import useAuth from "../auth/useAuth";
import colors from "../configs/colors";
import useApi from "../hooks/useApi";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen(props) {
  const loginApi = useApi(authApi.login);
  const auth = useAuth();

  const handleSubmit = async ({ username, password }) => {
    const response = await loginApi.request(username, password);
    console.log(loginApi.error);
    if (response.ok) {
      auth.logIn(response.data);
    }
  };

  return (
    <ImageBackground
      blurRadius={5}
      source={require("../assets/bg2.jpg")}
      style={styles.container}
    >
      <Image style={styles.logo} source={require("../assets/logo512.png")} />
      <Text style={styles.title}>Doosti</Text>

      <Form
        initialValues={{ username: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage visible={loginApi.error} error={loginApi.error} />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="account"
          name="username"
          placeholder="Username"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          name="password"
          icon="lock"
          placeholder="Password"
          secureTextEntry
        />
        <SubmitButton title="Login" />
      </Form>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default LoginScreen;
