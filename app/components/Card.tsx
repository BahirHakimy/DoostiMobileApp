import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

import colors from "../configs/colors";
import Text from "./Text";

type CardProps = {
  imageUri: string;
  onPress?: () => void;
  subTitle?: string;
  title: string;
};

function Card({ imageUri, onPress, subTitle, title }: CardProps) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image style={styles.image} source={{ uri: imageUri }} />
        <View style={styles.detailsContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
          <Text numberOfLines={2} style={styles.subTitle}>
            {subTitle}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
  },
  detailsContainer: { padding: 20 },
  image: {
    width: "100%",
    height: 200,
  },
  subTitle: { color: colors.secondary, fontWeight: "bold" },
  title: { marginBottom: 7 },
});

export default Card;
