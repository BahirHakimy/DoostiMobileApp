import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../configs/colors";
import ButtonWithIcon from "../ButtonWithIcon";
import useAuth from "../../auth/useAuth";

type ProfileImagesProps = { coverPhoto: any; editMode: boolean; profile: any };

function ProfileImages({
  coverPhoto,
  editMode = true,
  profile,
}: ProfileImagesProps) {
  const { logOut } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.coverPhotoContainer}>
        <Image
          blurRadius={editMode ? 5 : 0}
          source={coverPhoto}
          style={styles.coverPhoto}
          resizeMode="cover"
        />
        {editMode && (
          <TouchableOpacity style={styles.profileEditButton}>
            <MaterialCommunityIcons
              name="plus-box"
              size={22}
              color={colors.light}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.profilePhotoContainer}>
        <Image
          blurRadius={editMode ? 5 : 0}
          source={profile}
          style={styles.profilePhoto}
          resizeMode="contain"
        />
        {editMode && (
          <TouchableOpacity style={styles.profileEditButton}>
            <MaterialCommunityIcons
              name="plus-box"
              size={22}
              color={colors.light}
            />
          </TouchableOpacity>
        )}
      </View>

      <ButtonWithIcon
        color={colors.light}
        icon={editMode ? "cancel" : "circle-edit-outline"}
        onPress={() => logOut()}
        style={styles.editButton}
        textColor={editMode ? colors.warning : colors.info}
        title={editMode ? "Cancel" : "Edit profile"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "35%",
    position: "relative",
    marginBottom: 0,
    padding: 0,
  },
  coverPhoto: { width: "100%", height: "100%" },
  coverPhotoContainer: {
    width: "100%",
    height: "75%",
  },
  editButton: {
    borderRadius: 30,
    bottom: 0,
    height: 40,
    position: "absolute",
    right: 0,
    width: 120,
  },
  profileEditButton: {
    alignItems: "center",
    backgroundColor: "#5555",
    height: "100%",
    justifyContent: "center",
    position: "absolute",
    width: "100%",
  },
  profileEditIcon: {},
  profilePhoto: {
    height: "100%",
    width: "100%",
  },
  profilePhotoContainer: {
    borderRadius: 50,
    borderWidth: 5,
    borderColor: colors.white,
    bottom: 5,
    left: 10,
    height: 100,
    overflow: "hidden",
    position: "absolute",
    width: 100,
  },
});

export default ProfileImages;
