import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import MenuItem from "../components/MenuItem";
import ShareModal from "../components/ShareModal";
import { EventEmitter } from "react-native";
import { DeviceEventEmitter } from "react-native";

const CustomDrawer = ({ onLogout }) => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("Guest");
  const [profileImage, setProfileImage] = useState(
    require("../assets/woman.png")
  );
  const [modalVisible, setModalVisible] = useState(false);

  // Function to fetch user data from AsyncStorage
  const fetchUserData = async () => {
    try {
      const storedName = await AsyncStorage.getItem("userName");
      const storedImage = await AsyncStorage.getItem("profileImage");

      setUserName(storedName || "Guest");
      if (storedImage) {
        setProfileImage({ uri: storedImage });
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserData();

      const subscription = DeviceEventEmitter.addListener(
        "profileUpdated",
        (newImageUri) => {
          setProfileImage({ uri: newImageUri });
        }
      );

      return () => subscription.remove();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={profileImage} style={styles.profileImage} />
        </TouchableOpacity>
        <Text style={styles.username}>Hello {userName}</Text>
      </View>

      <View style={styles.menuContainer}>
        <MenuItem
          icon="home"
          text="Home"
          onPress={() => navigation.navigate("Home")}
        />
        <MenuItem
          icon="settings"
          text="Settings"
          onPress={() => navigation.navigate("Settings")}
        />
        <MenuItem
          icon="card-giftcard"
          text="My Reward"
          onPress={() => navigation.navigate("Reward")}
        />
        <MenuItem
          icon="support-agent"
          text="Customer Support"
          onPress={() => navigation.navigate("Help")}
        />
        <MenuItem
          icon="menu-book"
          text="User Manual"
          onPress={() => navigation.navigate("UserManual")}
        />
        <MenuItem
          icon="ondemand-video"
          text="Videos"
          onPress={() => navigation.navigate("Videos")}
        />
        <MenuItem
          icon="photo-library"
          text="Gallery"
          onPress={() => navigation.navigate("Gallery")}
        />
        <MenuItem
          icon="share"
          text="Share App"
          onPress={() => setModalVisible(true)}
        />
        <MenuItem
          icon="error-outline"
          text="Report an Issue"
          onPress={() => navigation.navigate("ReportIssue")}
        />
        <MenuItem
          icon="feedback"
          text="Feedback"
          onPress={() => navigation.navigate("Feedback")}
        />
        <MenuItem
          icon="gavel"
          text="Terms and Conditions"
          onPress={() => navigation.navigate("TermsAndConditions")}
        />

        <TouchableOpacity
          style={[styles.menuItem, styles.logoutButton]}
          onPress={() =>
            Alert.alert("Logout", "Are you sure you want to log out?", [
              { text: "Cancel", style: "cancel" },
              { text: "Logout", style: "destructive", onPress: onLogout },
            ])
          }
        >
          <Icon name="logout" size={24} color="white" />
          <Text style={[styles.menuText, { color: "white", marginLeft: 10 }]}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>

      <ShareModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    backgroundColor: "blue",
    height: 150,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "white",
  },
  username: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
  },
  menuContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuText: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
    color: "#1C45AB",
  },
  logoutButton: {
    marginTop: "auto",
    backgroundColor: "red",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default CustomDrawer;
