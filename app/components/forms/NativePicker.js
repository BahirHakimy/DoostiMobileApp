import React from "react";
import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import colors from "../../configs/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFormikContext } from "formik";
import { ErrorMessage } from ".";

function NativePicker({ items, name, placeholder }) {
  const [pickerFocused, setPickerFocused] = React.useState(false);

  const { values, setFieldValue, errors, setFieldTouched, touched } =
    useFormikContext();

  return (
    <>
      <View style={styles.container}>
        <MaterialCommunityIcons
          style={styles.icon}
          name="gender-male-female"
          size={25}
        />
        <Picker
          onValueChange={(value) => setFieldValue(name, value)}
          selectedValue={values[name]}
          style={styles.picker}
          onFocus={() => setPickerFocused(true)}
          onBlur={() => {
            setPickerFocused(false);
            setFieldTouched(name);
          }}
        >
          <Picker.Item
            style={styles.placeholder}
            enabled={!pickerFocused}
            label={placeholder}
            value=""
          />
          {items.map((item) => (
            <Picker.Item
              key={item.id.toString()}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
      </View>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 25,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  icon: { color: colors.medium },
  picker: {
    flex: 1,
    color: colors.medium,
  },
  placeholder: {
    color: colors.medium,
  },
});

export default NativePicker;
