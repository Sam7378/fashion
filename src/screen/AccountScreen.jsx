import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  DeviceEventEmitter, // Corrected import
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

import AccountButtons from "../components/AccountButtons";
import { requestCameraPermission } from "../screen/CameraScreen";

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

        setUsername(storedName || "Guest");
        setEmail(storedEmail || "guest@example.com");

        if (storedImage) {
          setProfileImage({ uri: storedImage });
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

  // Function to update profile image and emit an event
  const updateProfileImage = async (newImageUri) => {
    try {
      await AsyncStorage.setItem("profileImage", newImageUri);
      DeviceEventEmitter.emit("profileUpdated", newImageUri);
    } catch (error) {
      console.error("Error updating profile image:", error);
    }
  };

  // Open Camera to Capture Image
  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert("Permission Denied", "Camera permission is required.");
      return;
    }

    const options = { mediaType: "photo", quality: 1 }; // Defined options

    launchCamera(options, async (response) => {
      if (response.didCancel) {
        Alert.alert("Camera", "User cancelled camera");
      } else if (response.errorMessage) {
        Alert.alert("Camera Error", response.errorMessage);
      } else {
        const newImage = response.assets[0].uri;
        setProfileImage({ uri: newImage });
        updateProfileImage(newImage);
      }
    });
  };

  // Open Gallery to Select Image
  const openGallery = async () => {
    const options = { mediaType: "photo", quality: 1 };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        Alert.alert("Gallery", "User cancelled image selection");
      } else if (response.errorMessage) {
        Alert.alert("Gallery Error", response.errorMessage);
      } else {
        const newImage = response.assets[0].uri;
        setProfileImage({ uri: newImage });
        updateProfileImage(newImage);
      }
    });
  };

  // Show Options (Camera or Gallery)
  const showImageOptions = () => {
    Alert.alert(
      "Profile Picture",
      "Choose an option",
      [
        { text: "Take Photo", onPress: openCamera },
        { text: "Choose from Gallery", onPress: openGallery },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: slideUp.value }],
  }));

  const handleLogout = async () => {
    try {
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
        {/* Profile Image with Camera Icon */}
        <View style={styles.imageWrapper}>
          <Image source={profileImage} style={styles.profileImage} />
          <TouchableOpacity
            style={styles.cameraIcon}
            onPress={showImageOptions}
          >
            <Ionicons name="camera-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <Text style={styles.username}>Hello {username}</Text>
        <Text style={styles.email}>Your Email - {email}</Text>
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
  imageWrapper: {
    position: "relative",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#fff",
    backgroundColor: "#eee",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#007AFF",
    width: 35,
    height: 35,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  username: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginTop: 10,
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
