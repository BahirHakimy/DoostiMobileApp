import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Text from "./Text";
import Icon from "./Icon";

type CategoryPickerItemProps = {
  item: {
    name: string;
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    background: string;
  };
  onPress: () => void;
};

function CategoryPickerItem({ item, onPress }: CategoryPickerItemProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View>
        <Icon backgroundColor={item.background} name={item.icon} size={80} />
        <Text style={styles.label}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignItems: "center",
    width: "33%",
  },
  label: { marginTop: 5, textAlign: "center" },
});
export default CategoryPickerItem;
