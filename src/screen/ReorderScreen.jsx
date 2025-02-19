import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ReorderScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ReorderScreen</Text>
    </View>
  );
};

export default ReorderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});
