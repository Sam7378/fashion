import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import MenuItem from "../components/MenuItem";
import ShareModal from "../components/ShareModal";

const CustomDrawer = ({ onLogout }) => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("Guest");
  const [userImage, setUserImage] = useState(require("../assets/Ellipse2.png"));
  const [modalVisible, setModalVisible] = useState(false);

  const fetchUserName = async () => {
    try {
      const storedName = await AsyncStorage.getItem("userName");
      setUserName(storedName || "Guest");
    } catch (error) {
      console.log("Error fetching username:", error);
    }
  };

  useEffect(() => {
    fetchUserName();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={userImage} style={styles.profileImage} />
        </TouchableOpacity>
        <Text style={styles.username}>Hello {userName}</Text>
      </View>

      {/* Navigation Menu */}
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

        {/* Logout Button */}
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

      {/* Share Modal */}
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
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 35,
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
