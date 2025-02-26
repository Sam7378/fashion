import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    fetchNotificationCount();
  }, []);

  const fetchNotificationCount = async () => {
    const storedNotifications = await AsyncStorage.getItem("notifications");
    if (storedNotifications) {
      setNotificationCount(JSON.parse(storedNotifications).length);
    }
  };

  const resetBadge = () => {
    setNotificationCount(0); // Reset badge count
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
      }}
    >
      {/* Bell Icon with Badge */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("NotificationScreen", { resetBadge })
        }
      >
        <Icon name="notifications" size={28} color="black" />
        {notificationCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{notificationCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  badge: {
    position: "absolute",
    right: -6,
    top: -3,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
};

export default Header;
