import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import listingApi from "../api/profile";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../configs/colors";
import routes from "../components/navigation/routes";
import Screen from "../components/Screen";
import Text from "../components/Text";
import useApi from "../hooks/useApi";

function ListingScreen({ navigation }) {
  const listingEndpoint = useApi(listingApi.getListings);

  React.useEffect(() => {
    listingEndpoint.request();
  }, []);
  return (
    <>
      <ActivityIndicator visible={listingEndpoint.loading} />
      <Screen style={styles.screen}>
        {
          <>
            {listingEndpoint.error && (
              <>
                <Text> Failed to load listings</Text>
                <Button title="Retry" onPress={listingEndpoint.request} />
              </>
            )}
            <FlatList
              style={styles.list}
              data={listingEndpoint.data}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Card
                  title={item.title}
                  subTitle={"$" + item.price}
                  imageUri={item.images[0].image}
                  onPress={() =>
                    navigation.navigate(routes.LISTITNG_DETAILS, item)
                  }
                />
              )}
            />
          </>
        }
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  list: { paddingVertical: 20 },
  screen: { padding: 20, backgroundColor: colors.light },
});

export default ListingScreen;
