import React from "react";
import { StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import CategoryPickerItem from "../components/CategoryPickerItem";
import { Form, FormField, FormPicker, SubmitButton } from "../components/forms";
import FormImagePicker from "../components/forms/FormImagePicker";
import useLocation from "../hooks/useLocation";
import useApi from "../hooks/useApi";
import listingApi from "../api/profile";
import UploadScreen from "../screens/UploadScreen";

const validationSchema = Yup.object().shape({
  images: Yup.array().min(1, "Please select at least one image"),
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number()
    .typeError("Price should be a valid number like 99.99")
    .required()
    .min(1)
    .max(10000)
    .label("Price"),
  category: Yup.object().required().nullable().label("Category"),
  description: Yup.string().label("Description"),
});

const initialValues = {
  images: [],
  title: "",
  price: "",
  description: "",
  category: null,
};

function ListingEditScreen(props) {
  const location = useLocation();
  const categoriesEndpoint = useApi(listingApi.getCategories);
  const [uploadVisible, setUploadVisible] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);

  React.useEffect(() => categoriesEndpoint.request(), []);

  async function handleSubmit(data, { resetForm }) {
    setUploadVisible(true);
    const response = await listingApi.addListing(
      { ...data, location },
      (progress) => setUploadProgress(progress)
    );
    if (!response.ok) {
      setUploadVisible(false);
      return alert("Failed to upload the listing");
    }
    resetForm(initialValues);
  }

  function handleReset() {
    setUploadVisible(false);
    setUploadProgress(0);
  }

  return (
    <Screen>
      <UploadScreen
        visible={uploadVisible}
        progress={uploadProgress}
        onAnimationDone={handleReset}
      />
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
      >
        <Form
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <FormImagePicker name="images" />
          <FormField maxLength={255} name="title" placeholder="Title" />
          <FormField
            keyboardType="numeric"
            maxLength={8}
            name="price"
            placeholder="Price"
            width={150}
          />
          <FormPicker
            name="category"
            numberOfColumns={3}
            items={categoriesEndpoint.data || []}
            PickerItemComponent={CategoryPickerItem}
            placeholder="Category"
            width="50%"
          />
          <FormField
            multiline
            name="description"
            numberOfLines={3}
            placeholder="Description"
          />
          <SubmitButton title="Post" />
        </Form>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default ListingEditScreen;
