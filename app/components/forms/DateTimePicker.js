import React from "react";
import Picker from "@react-native-community/datetimepicker";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFormikContext } from "formik";

import Text from "../Text";
import colors from "../../configs/colors";
import { formatDate } from "../../utility/tools";
import ErrorMessage from "./ErrorMessage";

function DateTimePicker({ name = "", placeholder, icon, ...rest }) {
  const { values, setFieldValue, errors, touched } = useFormikContext();
  const [show, setShow] = React.useState(false);

  const openPicker = () => {
    setShow(true);
  };
  const handleChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setFieldValue(name, selectedDate);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={openPicker}>
        <View style={styles.container}>
          <MaterialCommunityIcons
            style={styles.icon}
            name={icon}
            size={20}
            color={colors.medium}
          />
          {show && (
            <Picker
              testID="dateTimePicker"
              value={new Date()}
              maximumDate={new Date()}
              onChange={handleChange}
              {...rest}
            />
          )}
          <Text style={values[name] ? styles.input : styles.placeholder}>
            {values[name] ? formatDate(values[name]) : placeholder}
          </Text>
        </View>
      </TouchableOpacity>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
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

export default DateTimePicker;
