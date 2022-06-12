import { View, Image, Text, ImageBackground, StyleSheet } from "react-native";

import Button from "../components/Button";
import colors from "../configs/colors";

function WelcomScreen({ navigation }) {
  return (
    <ImageBackground
      blurRadius={4}
      source={require("../assets/bg1.jpg")}
      style={styles.background}
    >
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo512.png")} style={styles.logo} />
        <Text style={styles.title}>Doosti</Text>
        <Text style={styles.tagline}>Make The World More Friendly</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button title="Login" onPress={() => navigation.navigate("Login")} />
        <Button
          color={colors.blue}
          onPress={() => navigation.navigate("Register")}
          title="Register"
        />
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  logo: { width: 150, height: 150 },
  logoContainer: {
    position: "absolute",
    top: 50,
    alignItems: "center",
  },
  tagline: {
    color: colors.light,
    fontSize: 25,
    fontWeight: "600",
    paddingVertical: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "700",
    color: colors.danger,
    textShadowColor: colors.light,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
});
export default WelcomScreen;
