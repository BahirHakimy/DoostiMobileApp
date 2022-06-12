import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ButtonWithIcon from "../components/ButtonWithIcon";
import Screen from "../components/Screen";
import Text from "../components/Text";
import colors from "../configs/colors";
import ImageViewScreen from "./ImageViewScreen";
import InfoField from "../components/profile/InfoField";
import ProfileImages from "../components/profile/ProfileImages";

function ProfileScreen(props) {
  return (
    <Screen style={styles.container}>
      <ProfileImages
        profile={require("../assets/mosh.jpg")}
        coverPhoto={require("../assets/jacket.jpg")}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>Mosh Hamedani</Text>
        <Text style={styles.username}>@MoshHamedani</Text>
        <Text style={styles.bio}>I Will Win Not Immediately But Definetly</Text>
        <InfoField title="Kabul / Afghanistan" icon="map-marker" />
        <InfoField title="Apr/3/2022     35 Years old" icon="calendar" />
        <InfoField title="Married" icon="ring" />
        <InfoField title="Male" icon="gender-male-female" />
        <InfoField
          title="Work's at Netlinks Company"
          icon="facebook-workplace"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  bio: { color: colors.teal, fontSize: 16, paddingVertical: 10 },
  container: { flex: 1, position: "relative" },
  coverPhoto: { width: "100%", height: "75%" },
  editButton: {
    borderRadius: 30,
    bottom: 0,
    height: 40,
    position: "absolute",
    right: 0,
    width: 120,
  },
  imagesContainer: {
    height: "35%",
    position: "relative",
    marginBottom: 0,
    padding: 0,
  },
  infoContainer: {
    flex: 1,
    position: "relative",
    paddingLeft: 15,
  },
  name: {
    color: colors.gray,
    fontWeight: "700",
    paddingTop: 10,
    textAlign: "left",
  },
  profilePhoto: {
    height: "100%",
    width: "100%",
  },
  profilePhotoContainer: {
    borderRadius: 50,
    borderWidth: 5,
    borderColor: colors.white,
    bottom: 0,
    left: 10,
    height: 100,
    overflow: "hidden",
    position: "absolute",
    width: 100,
  },
  username: {
    color: colors.info,
    fontSize: 15,
    fontWeight: "400",
  },
});

export default ProfileScreen;
