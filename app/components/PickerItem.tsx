import { StyleSheet, TouchableOpacity } from "react-native";

import Text from "./Text";

type PickerItemProps = {
  item: { label: string };
  onPress: () => void;
};

function PickerItem({ item, onPress }: PickerItemProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>{item.label}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  text: { padding: 20 },
});
export default PickerItem;
