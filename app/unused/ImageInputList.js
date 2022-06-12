import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import ImageInput from "./ImageInput";

function ImageInputList({ imageUris, onAddImage, onRemoveImage }) {
  const listRef = React.useRef();

  return (
    <>
      <View style={styles.container}>
        <FlatList
          ref={listRef}
          onContentSizeChange={() => listRef.current.scrollToEnd()}
          horizontal
          data={imageUris}
          keyExtractor={(uri) => uri}
          renderItem={({ item }) => (
            <ImageInput
              imageUri={item}
              onChangeImage={() => onRemoveImage(item)}
            />
          )}
          ListFooterComponent={<ImageInput onChangeImage={onAddImage} />}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    justifyContent: "center",
    marginHorizontal: 5,
    marginVertical: 10,
  },
});

export default ImageInputList;
