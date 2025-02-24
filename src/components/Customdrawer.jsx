import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";

const CustomDrawer = (props) => {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      {/* <TouchableOpacity
        onPress={() => props.navigation.closeDrawer()}
        style={styles.closeButton}
      >
        {/* <Image
          source={require("../assets/delete.png")}
          style={styles.closeIcon}
        /> */}
      {/* </TouchableOpacity> */}
      <View style={styles.drawerContent}>
        <Text style={styles.menuText}>Home</Text>
        <Text style={styles.menuText}>Profile</Text>
        <Text style={styles.menuText}>Settings</Text>
        <Text style={styles.menuText}>Logout</Text>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  drawerContent: {
    marginTop: 40,
  },
  menuText: {
    fontSize: 18,
    paddingVertical: 10,
    color: "#333",
  },
});
