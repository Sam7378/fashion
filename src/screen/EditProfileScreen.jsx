import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedName = await AsyncStorage.getItem("userName");
        const storedEmail = await AsyncStorage.getItem("userEmail");
        if (storedName) setUserName(storedName);
        if (storedEmail) setEmail(storedEmail);
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    const unsubscribe = navigation.addListener("focus", () => {
      loadUserData();
    });

    return () => unsubscribe(); // Proper cleanup
  }, [navigation]);

  const handleUpdate = async () => {
    if (!username.trim() || !email.trim()) {
      Alert.alert("Error", "Username and email cannot be empty");
      return;
    }
    try {
      await AsyncStorage.setItem("userName", username);
      await AsyncStorage.setItem("userEmail", email);
      Alert.alert("Success", "Profile updated successfully");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating user data:", error);
      Alert.alert("Error", "Failed to update profile. Try again!");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/edit2.png")}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Edit Profile</Text>
        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="#555" style={styles.icon} />
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUserName}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="#555" style={styles.icon} />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity onPress={handleUpdate}>
          <LinearGradient colors={["#FF6F61", "#E94057"]} style={styles.button}>
            <Text style={styles.buttonText}>Update</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.cancleButton]}
          onPress={() => navigation.goBack("ACCOUNT")}
        >
          <Text style={styles.cancleText}>Cancle</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "70%",
  },
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 30,
    borderRadius: 10,
    width: "85%",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 8,
    elevation: 2,
  },
  icon: { marginRight: 10 },
  input: { flex: 1, height: 50, fontSize: 16 },
  button: { paddingVertical: 12, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
  loginText: {
    marginTop: 15,
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  loginLink: { color: "#E94057", fontWeight: "bold" },
  cancleButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
});
