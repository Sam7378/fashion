import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";

import Header from "../components/Header";
const MyStatusScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    username: "Guest",
    email: "guest@example.com",
    phone: "N/A",
    gender: "N/A",
    age: "N/A",
    profileImage: require("../assets/Ellipse2.png"),
  });

  const fetchUserData = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem("userName");
      const storedEmail = await AsyncStorage.getItem("userEmail");
      const storedPhone = await AsyncStorage.getItem("phone");
      const storedGender = await AsyncStorage.getItem("gender");
      const storedAge = await AsyncStorage.getItem("age");
      const storedProfileImage = await AsyncStorage.getItem("profileImage");

      setUserData({
        username: storedUsername || "Guest",
        email: storedEmail || "guest@example.com",
        phone: storedPhone || "123456",
        gender: storedGender || "Male",
        age: storedAge || "24",
        profileImage: storedProfileImage
          ? { uri: storedProfileImage }
          : require("../assets/Ellipse2.png"),
      });
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [])
  );
  return (
    <View style={styles.container}>
      <Header isCart={true} />
      {/* <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={30} color="#fff" />
      </TouchableOpacity> */}

      <View style={styles.rowContainer}>
        <Image source={userData.profileImage} style={styles.profileImage} />
        <View>
          <Text style={styles.username}>{userData.username}</Text>
          <Text style={styles.email}>{userData.email}</Text>
        </View>
      </View>

      <View style={styles.rowContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.infoText}>{userData.phone}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Gender</Text>
          <Text style={styles.infoText}>{userData.gender}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Age</Text>
          <Text style={styles.infoText}>{userData.age}</Text>
        </View>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.formRow}>
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.formText}>{userData.username}</Text>
        </View>

        <View style={styles.formRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.formText}>{userData.email}</Text>
        </View>

        <View style={styles.formRow}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.formText}>{userData.phone}</Text>
        </View>

        <View style={styles.formRow}>
          <Text style={styles.label}>Gender:</Text>
          <Text style={styles.formText}>{userData.gender}</Text>
        </View>

        <View style={styles.formRow}>
          <Text style={styles.label}>Age:</Text>
          <Text style={styles.formText}>{userData.age}</Text>
        </View>
      </View>
    </View>
  );
};

export default MyStatusScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#7e4685",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 15,
    backgroundColor: "#acb846",
    borderRadius: 10,
    elevation: 2,
    marginBottom: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  username: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 16,
    color: "#333",
  },
  infoBox: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#c246bc",
    borderRadius: 10,
    elevation: 2,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  infoText: {
    fontSize: 16,
    color: "#333",
  },
  formContainer: {
    backgroundColor: "#c27346",
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    marginTop: 10,
  },
  formRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  formText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
  backButton: {
    marginBottom: 20,
  },
});
