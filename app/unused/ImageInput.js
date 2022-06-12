import React from "react";
import {
  Alert,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as imagePicker from "expo-image-picker";

import colors from "../configs/colors";

function ImageInput({ imageUri, onChangeImage }) {
  React.useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { granted } = await imagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert(
        "You must enable access to media library in order to add images"
      );
    }
  };

  const handlePress = async () => {
    if (!imageUri) {
      try {
        const response = await imagePicker.launchImageLibraryAsync({
          mediaTypes: imagePicker.MediaTypeOptions.Images,
          quality: 0.5,
        });
        if (!response.cancelled) {
          onChangeImage(response.uri);
        }
      } catch (error) {
        console.log("Error while reading the image", error);
      }
    } else {
      Alert.alert(
        "Delete Image",
        "Are you sure to remove image from the list?",
        [
          {
            text: "Yes",
            onPress: () => {
              onChangeImage(null);
            },
          },
          { text: "No" },
        ]
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <MaterialCommunityIcons
            name="camera"
            color={colors.medium}
            size={50}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 15,
    height: 100,
    justifyContent: "center",
    marginRight: 5,
    overflow: "hidden",
    width: 100,
  },
  image: {
    height: "100%",
    width: "100%",
  },
});

export default ImageInput;
