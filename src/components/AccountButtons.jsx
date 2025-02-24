import React, { useRef } from "react";
import {
  Animated,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

const AccountButtons = ({ text, imageSource, onPress, isLogout }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      style={[styles.button, isLogout && styles.logoutButton]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <View style={styles.leftContainer}>
        <Image source={imageSource} style={styles.iconImage} />
        <Text style={[styles.buttonText, isLogout && styles.logoutText]}>
          {text}
        </Text>
      </View>
      <Image source={require("../assets/right.png")} style={styles.arrowIcon} />
    </TouchableOpacity>
  );
};

export default AccountButtons;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    justifyContent: "space-between",
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconImage: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 18,
  },
  logoutButton: {
    backgroundColor: "#fff",
  },
  // logoutText: {
  //   color: "w",
  // },
  arrowIcon: {
    width: 20,
    height: 20,
    tintColor: "#888",
  },
});
