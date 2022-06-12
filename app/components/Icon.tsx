import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export type IconProps = {
  name: keyof typeof MaterialCommunityIcons.glyphMap;
  size?: number;
  backgroundColor?: string;
  iconColor?: string;
};

function Icon({
  name,
  size = 40,
  backgroundColor = "#000",
  iconColor = "#fff",
}: IconProps) {
  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor,
        borderRadius: size / 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MaterialCommunityIcons name={name} size={size / 2} color={iconColor} />
    </View>
  );
}

export default Icon;
