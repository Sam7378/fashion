import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const AddressScreen = () => {
  const navigation = useNavigation();
  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    phoneNumber: "",
  });
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    const loadAddress = async () => {
      const savedAddress = await AsyncStorage.getItem("userAddress");
      if (savedAddress) {
        setAddress(JSON.parse(savedAddress));
      }
    };
    loadAddress();

    Animated.timing(animation, {
      toValue: 1,
      duration: 150,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSubmit = async () => {
    await AsyncStorage.removeItem("userAddress"); // Clear existing data
    await AsyncStorage.setItem("userAddress", JSON.stringify(address)); // Save new data

    Alert.alert("Success", "Address saved successfully!");

    // Reset state
    setAddress({
      fullName: "",
      street: "",
      city: "",
      state: "",
      pinCode: "",
      phoneNumber: "",
    });

    // Navigate to Home with params to trigger re-render
    navigation.navigate("Home", { updated: true });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Address</Text>
      </View>

      <Animated.View
        style={[styles.card, { transform: [{ scale: animation }] }]}
      >
        <Text style={styles.subHeader}>Please fill in the following</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={address.fullName}
          onChangeText={(text) => setAddress({ ...address, fullName: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Street"
          value={address.street}
          onChangeText={(text) => setAddress({ ...address, street: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={address.city}
          onChangeText={(text) => setAddress({ ...address, city: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="State"
          value={address.state}
          onChangeText={(text) => setAddress({ ...address, state: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="6-digit PIN Code"
          keyboardType="numeric"
          maxLength={6}
          value={address.pinCode}
          onChangeText={(text) => {
            if (/^\d{0,6}$/.test(text))
              setAddress({ ...address, pinCode: text });
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="numeric"
          maxLength={10}
          value={address.phoneNumber}
          onChangeText={(text) => {
            if (/^\d{0,10}$/.test(text))
              setAddress({ ...address, phoneNumber: text });
          }}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF",
    height: 80,
    marginBottom: 10,
  },
  backButton: {
    position: "absolute",
    left: 15,
    top: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "white",
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});

export default AddressScreen;
