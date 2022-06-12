import React from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Button,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../configs/colors";
import Text from "./Text";
import PickerItem from "./PickerItem";

type PickerProps = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  items: [item: any];
  numberOfColumns?: number;
  onSelectItem: (item: any) => void;
  PickerItemComponent: (item: any, onPress: () => void) => JSX.Element;
  placeholder: string;
  selectedItem: any;
  width: string | number;
};

function Picker({
  icon,
  items,
  numberOfColumns = 1,
  onSelectItem,
  PickerItemComponent = PickerItem,
  placeholder,
  selectedItem,
  width = "100%",
}: PickerProps) {
  const [modelVisible, setModelVisible] = React.useState(false);

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          setModelVisible(true);
        }}
      >
        <View style={[styles.container, { width }]}>
          {icon && (
            <MaterialCommunityIcons
              style={styles.icon}
              name={icon}
              size={20}
              color={colors.medium}
            />
          )}
          {selectedItem ? (
            <Text style={styles.input}>{selectedItem.label}</Text>
          ) : (
            <Text style={styles.placeholder}>{placeholder}</Text>
          )}

          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modelVisible} animationType="slide">
        <Button title="Close" onPress={() => setModelVisible(false)} />
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numberOfColumns}
          renderItem={({ item }) => (
            <PickerItemComponent
              item={item}
              onPress={() => {
                setModelVisible(false), onSelectItem(item);
              }}
            />
          )}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 25,
    flexDirection: "row",
    marginVertical: 10,
    padding: 15,
  },
  icon: { marginRight: 10 },
  input: { color: colors.dark, flex: 1, fontSize: 18 },
  placeholder: { color: colors.medium, flex: 1 },
});

export default Picker;
