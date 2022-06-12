import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
} from "react-native";
import * as Yup from "yup";

import {
  Form,
  FormField,
  FormPicker,
  DateTimePicker,
  SubmitButton,
} from "../components/forms";
import Text from "../components/Text";
import colors from "../configs/colors";

const COUNTRIES = [
  { id: 0, label: "Afghanistan" },
  { id: 1, label: "Iran" },
  { id: 2, label: "England" },
  { id: 3, label: "USA" },
];
const CITIES = [
  [
    { id: 0, label: "Kabul" },
    { id: 1, label: "Balkh" },
    { id: 2, label: "Badakhshan" },
    { id: 3, label: "Laghman" },
  ],
  [
    { id: 0, label: "Tehran" },
    { id: 1, label: "Isfahan" },
  ],
  [
    { id: 0, label: "London" },
    { id: 1, label: "Birmingham" },
  ],
  [
    { id: 0, label: "New York" },
    { id: 1, label: "Florida" },
    { id: 2, label: "W.DC" },
  ],
];
const MARITALSTATES = [
  { id: 1, label: "Single", value: "S" },
  { id: 2, label: "Married", value: "M" },
  { id: 3, label: "Engaged", value: "E" },
];

const validationSchema = Yup.object().shape({
  country: Yup.object().required().label("Country"),
  city: Yup.object().required().label("City"),
  birthdate: Yup.string().required().label("BirthDate"),
  workplace: Yup.string().required().label("Workplace"),
  bio: Yup.string().required().label("Bio"),
  maritalstate: Yup.object().required().label("MaritalState"),
});

function PersonalInfo({ onSubmit }) {
  const [country, setCountry] = React.useState(COUNTRIES[0]);

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView behavior="position">
        <Form
          initialValues={{
            country: "",
            city: "",
            birthdate: "",
            workplace: "",
            bio: "",
            maritalstate: "",
          }}
          onSubmit={onSubmit}
          style={{ flex: 1 }}
          validationSchema={validationSchema}
        >
          <Text style={styles.caption}>Select Your Hometown</Text>
          <FormPicker
            additionalSelectActions={(item) => setCountry(item)}
            icon="earth"
            items={COUNTRIES}
            name="country"
            placeholder="Country"
          />
          <Text style={styles.caption}>Select Your City</Text>
          <FormPicker
            icon="city"
            items={CITIES[country.id]}
            name="city"
            placeholder="City"
          />
          <Text style={styles.caption}>Pick your birthdate</Text>
          <DateTimePicker
            icon="cake"
            mode="date"
            name="birthdate"
            placeholder="Birthdate"
          />
          <Text style={styles.caption}>Where do you work?</Text>
          <FormField
            icon="office-building"
            name="workplace"
            placeholder="Workplace"
          />
          <Text style={styles.caption}>Write something to describe you</Text>
          <FormField name="bio" icon="information-outline" placeholder="Bio" />

          <Text style={styles.caption}>What is your maritale state?</Text>
          <FormPicker
            icon="ring"
            items={MARITALSTATES}
            name="maritalstate"
            placeholder="Marital State"
          />
          <SubmitButton title="Continue" />
        </Form>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  caption: { paddingHorizontal: 10, color: colors.light },
  container: { width: "100%" },
});

export default PersonalInfo;
