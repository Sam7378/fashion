import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const SettingsScreen = () => {
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(900)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Animated Card */}
      <Animated.View
        style={[styles.card, { transform: [{ translateY: slideAnim }] }]}
      >
        <SettingsButton
          icon="location-outline"
          text="Address"
          onPress={() => navigation.navigate("Address")}
        />
        <SettingsButton
          icon="lock-closed-outline"
          text="Privacy Policy"
          onPress={() => navigation.navigate("Policy")}
        />
        <SettingsButton
          icon="chatbubble-ellipses-outline"
          text="Feedback"
          onPress={() => navigation.navigate("Feedback")}
        />
        <SettingsButton
          icon="help-outline"
          text="Help & Support"
          onPress={() => navigation.navigate("Help")}
        />
      </Animated.View>
    </View>
  );
};

const SettingsButton = ({ icon, text, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name={icon} size={35} color="#555" />
      <Text style={styles.text}>{text}</Text>
      <Ionicons name="chevron-forward-outline" size={28} color="#555" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1C45AB",
    paddingTop: "20%",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  card: {
    width: "90%",
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    paddingVertical: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    justifyContent: "space-evenly",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  text: {
    flex: 1,
    fontSize: 18,
    color: "#333",
    marginLeft: 10,
  },
});

export default SettingsScreen;
