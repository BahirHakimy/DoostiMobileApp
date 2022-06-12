import React from "react";
import {
  View,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Text from "../components/Text";
import { ListItem } from "../components/lists";
import colors from "../configs/colors";
import { Form, SubmitButton } from "../components/forms";
import TextInput from "../components/TextInput";
import ContactSellerForm from "./ContactSellerForm";

function ListingDetailsScreen({ route }) {
  const listing = route.params;

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    >
      <Image style={styles.image} source={{ uri: listing.images[0].image }} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{listing.title}</Text>
        <Text style={styles.price}>${listing.price}</Text>
        <View style={styles.userContainer}>
          <ListItem
            image={require("../assets/mosh.jpg")}
            title="Mosh Hamedani"
            subTitle="5 Listings"
          />
        </View>
        <ContactSellerForm listing={listing} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 15,
  },
  form: { paddingHorizontal: 20, marginBottom: 50 },
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    fontWeight: "bold",
    marginVertical: 10,
    color: colors.secondary,
  },
  title: { fontWeight: "500", fontSize: 23 },
  userContainer: { marginTop: 10 },
});

export default ListingDetailsScreen;
