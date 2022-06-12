import { TouchableOpacity, StyleSheet, Text } from "react-native";

import colors from "../configs/colors";
export type ButtonProps = {
  title: string;
  onPress: (event: any) => void;
  color?: string;
};

function Button({ title, onPress, color = colors.primary }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor: color }]}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    borderColor: colors.light,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "700",
    textTransform: "uppercase",
  },
});

export default Button;
