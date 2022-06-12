import React from "react";
import LottieView from "lottie-react-native";
import { Modal, StyleSheet, View } from "react-native";
import ProgressBar from "react-native-progress/Bar";
import colors from "../configs/colors";

function UploadScreen({ progress = 0, onAnimationDone, visible = false }) {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        {progress < 1 ? (
          <ProgressBar progress={progress} color={colors.primary} />
        ) : (
          <LottieView
            resizeMode="cover"
            autoPlay
            loop={false}
            onAnimationFinish={onAnimationDone}
            source={require("../assets/animations/done.json")}
            style={styles.animation}
          />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  animation: { width: 150 },
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default UploadScreen;
