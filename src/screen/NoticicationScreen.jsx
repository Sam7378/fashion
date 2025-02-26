import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NotificationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const slideAnim = useRef(new Animated.Value(300)).current;
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();

    loadNotifications();
  }, []);

  // Load notifications from AsyncStorage
  const loadNotifications = async () => {
    try {
      const storedNotifications = await AsyncStorage.getItem("notifications");
      if (storedNotifications) {
        setNotifications(JSON.parse(storedNotifications));
      }
    } catch (error) {
      console.error("Error loading notifications:", error);
    }
  };

  // Clear all notifications & reset bell icon badge
  const clearNotifications = async () => {
    try {
      await AsyncStorage.removeItem("notifications"); // Remove from storage
      setNotifications([]); // Clear state

      // Reset bell icon badge
      if (route.params?.resetBadge) {
        route.params.resetBadge(); // Call resetBadge from Header
      }
    } catch (error) {
      console.error("Error clearing notifications:", error);
    }
  };

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateX: slideAnim }] }]}
    >
      {/* Close Button */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="close" size={24} color="black" />
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
      </View>

      {/* Notification List */}
      {notifications.length > 0 ? (
        <>
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 80 }} // Prevent overlap with clear button
            renderItem={({ item }) => (
              <View style={styles.notificationItem}>
                <Text style={styles.notificationText}>{item.message}</Text>
                <Text style={styles.notificationDate}>{item.date}</Text>
              </View>
            )}
          />

          {/* Bottom Clear Button */}
          <TouchableOpacity
            style={styles.clearButton}
            onPress={clearNotifications}
          >
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.noNotifications}>No notifications yet!</Text>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  clearButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  clearButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  notificationItem: {
    padding: 15,
    backgroundColor: "#E8F5E9",
    marginBottom: 10,
    borderRadius: 10,
  },
  notificationText: {
    fontSize: 16,
  },
  notificationDate: {
    fontSize: 12,
    color: "#555",
    marginTop: 5,
  },
  noNotifications: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 50,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 10,
  },
});

export default NotificationScreen;
