import React from "react";
import { Alert, StyleSheet, ImageBackground, Image, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

import Button from "../components/ButtonWithIcon";
import Screen from "../components/Screen";
import UploadScreen from "./UploadScreen";
import Text from "../components/Text";
import PersonalInfo from "./PersonalInfo";
import colors from "../configs/colors";
import profile from "../api/profile";
import useApi from "../hooks/useApi";
import auth from "../api/auth";
import useAuth from "../auth/useAuth";
import ActivityIndicator from "../components/ActivityIndicator";

function Additionalnfo({ route }) {
  const [page, setPage] = React.useState(1);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [uploadVisible, setUploadVisible] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const profileApi = useApi(profile.registerProfile);
  const loginApi = useApi(auth.login);
  const { logIn: authenticate } = useAuth();

  React.useEffect(() => {
    requestPermission();
  }, []);

  async function handleCapturePhoto() {
    if (status.granted) {
      try {
        const { cancelled, uri } = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          aspect: [1, 1],
          quality: 0.7,
        });
        if (!cancelled) {
          setSelectedImage(uri);
        }
      } catch (error) {
        console.log("An unexpected error occured", error);
      }
    } else if (status.canAskAgain) {
      await requestPermission();
      handleCapturePhoto();
    } else {
      Alert.alert(
        "Access blocked",
        "You must allow accessing the camera to take a photo"
      );
    }
  }

  async function handleSelectPhoto() {
    try {
      const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [1, 1],
        quality: 0.7,
      });
      if (!cancelled) {
        setSelectedImage(uri);
      }
    } catch (error) {
      console.log("An unexpected error occured", error);
    }
  }

  function goToNextPage() {
    setPage(2);
  }
  function handleTryagain() {
    setPage(1);
    setSelectedImage(null);
  }

  async function handleSubmit(data) {
    setUploadVisible(true);
    if (selectedImage) {
      data["image"] = selectedImage;
    }
    data.username = route.params?.username;

    const response = await profileApi.request(data, (progress) =>
      setUploadProgress(progress)
    );

    console.log(response);
  }

  async function handleLogin() {
    const { username, password } = route.params;
    const response = await loginApi.request(username, password);
    if (response.ok) {
      authenticate(response.data);
    } else {
      Alert.alert("Sorry :(", "Something went wrong please login manualy.");
      console.log(response);
    }
    setUploadVisible(false);
  }

  return (
    <ImageBackground
      blurRadius={5}
      style={styles.background}
      source={require("../assets/bg2.jpg")}
    >
      <ActivityIndicator visible={loginApi.loading} />
      <Screen style={styles.container}>
        <UploadScreen
          visible={uploadVisible}
          progress={uploadProgress}
          onAnimationDone={handleLogin}
        />
        <Text style={styles.topCaption}>
          Please Take a minute and complete your account setup
        </Text>
        {page === 1 ? (
          <>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={
                  selectedImage
                    ? { uri: selectedImage }
                    : require("../assets/defaults/Male.png")
                }
              />
            </View>
            <Text style={styles.topCaption}>
              Let's start with your profile picture
            </Text>
            <View style={styles.buttonsContainer}>
              <Button
                title={selectedImage ? "Try Again" : "Take a photo"}
                icon={selectedImage ? "refresh" : "camera"}
                onPress={selectedImage ? handleTryagain : handleCapturePhoto}
              />
              <Button
                title={selectedImage ? "Looks Good" : "Select a photo"}
                icon={selectedImage ? "thumb-up" : "upload"}
                onPress={selectedImage ? goToNextPage : handleSelectPhoto}
              />
            </View>
            <Button
              color={colors.light}
              onPress={goToNextPage}
              textColor={colors.gray}
              title="Skip for now"
            />
          </>
        ) : (
          <PersonalInfo onSubmit={handleSubmit} />
        )}
      </Screen>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  buttonsContainer: { flexDirection: "row", marginVertical: 20 },
  container: { alignItems: "center" },
  image: {
    borderColor: colors.medium,
    borderRadius: 125,
    borderWidth: 3,
    height: 250,
    width: 250,
  },
  imageContainer: {
    alignItems: "center",
    padding: 10,
    width: "100%",
  },
  topCaption: { color: colors.light, textAlign: "center", marginVertical: 15 },
});

export default Additionalnfo;
