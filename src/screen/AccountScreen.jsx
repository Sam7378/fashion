import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions, useNavigation } from "@react-navigation/native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

import AccountButtons from "../components/AccountButtons";

const AccountScreen = ({ setIsLoggedIn }) => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(
    require("../assets/woman.png")
  );
  const slideUp = useSharedValue(300);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedName = await AsyncStorage.getItem("userName");
        const storedEmail = await AsyncStorage.getItem("userEmail");
        const storedImage = await AsyncStorage.getItem("profileImage");
        const hasImage = await AsyncStorage.getItem("profileImage");

        setUsername(storedName || "Guest");
        setEmail(storedEmail || "guest@example.com");

        if (hasImage === "true") {
          setProfileImage(require("../assets/Ellipse2.png"));
        } else if (storedImage) {
          setProfileImage({ uri: storedImage });
        } else {
          setProfileImage(require("../assets/Ellipse2.png"));
        }

        slideUp.value = withSpring(0, { damping: 12 });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    const unsubscribe = navigation.addListener("focus", fetchUserData);
    fetchUserData();
    return unsubscribe;
  }, [navigation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: slideUp.value }],
  }));

  // const handleMyStatus = () => navigation.navigate("MyStatus");
  // const handleSettings = () => navigation.navigate("Settings");
  const handleHelp = () =>
    Alert.alert("Help", "For support, contact support@example.com");
  const handleLogout = async () => {
    try {
      // await AsyncStorage.clear();
      Alert.alert("Success", "Logged out successfully!", [
        { text: "OK", onPress: () => setIsLoggedIn(false) },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to logout. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={profileImage} style={styles.profileImage} />
        <Text style={styles.username}>Hello {username}</Text>
        <Text style={styles.email}> Your Email- {email}</Text>
      </View>

      <Animated.View style={[styles.listContainer, animatedStyle]}>
        <View style={styles.card}>
          <AccountButtons
            imageSource={require("../assets/user-avatar.png")}
            text="Edit Profile"
            onPress={() => navigation.navigate("EditProfile")}
          />
          <AccountButtons
            imageSource={require("../assets/status.png")}
            text="My Status"
            onPress={() => navigation.navigate("MyStatus")}
          />
          <AccountButtons
            imageSource={require("../assets/setting.png")}
            text="Settings"
            onPress={() => navigation.navigate("Settings")}
          />
        </View>

        <View style={styles.card}>
          <AccountButtons
            imageSource={require("../assets/helpdesk.png")}
            text="Help"
            onPress={() => navigation.navigate("Help")}
          />
          <AccountButtons
            imageSource={require("../assets/logout.png")}
            text="Logout"
            onPress={handleLogout}
            isLogout
          />
        </View>
      </Animated.View>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c2c997",
    alignItems: "center",
    paddingTop: 50,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#fff",
    backgroundColor: "#eee",
  },
  username: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  email: {
    fontSize: 16,
    color: "#1c1c1a",
    fontWeight: "500",
  },
  listContainer: {
    width: "90%",
    position: "absolute",
    bottom: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
