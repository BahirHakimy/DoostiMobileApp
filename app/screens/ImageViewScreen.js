import { View, Image, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../configs/colors";

function ImageViewScreen({ image }) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.closeIcon}>
        <MaterialCommunityIcons name="close" size={30} color="white" />
      </View>
      <View style={styles.deleteIcon}>
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={30}
          color="white"
        />
      </View>
      <Image source={image} resizeMode="contain" style={styles.image} />
    </View>
  );
}
const styles = StyleSheet.create({
  closeIcon: {
    position: "absolute",
    top: 40,
    left: 30,
  },
  deleteIcon: {
    position: "absolute",
    top: 40,
    right: 30,
  },
  image: { width: "100%", height: "100%" },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
});
export default ImageViewScreen;
