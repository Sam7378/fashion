import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";

const AddressHome = ({ scrollY }) => {
  const [address, setAddress] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const fetchAddress = async () => {
      const storedAddress = await AsyncStorage.getItem("userAddress");
      if (storedAddress) {
        try {
          setAddress(JSON.parse(storedAddress));
        } catch (error) {
          console.error("Error parsing address:", error);
        }
      }
    };
    fetchAddress();
  }, []);

  useEffect(() => {
    if (!scrollY) return;

    const listener = scrollY.addListener(({ value }) => {
      Animated.timing(fadeAnim, {
        toValue: value > 50 ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    return () => scrollY.removeListener(listener);
  }, [scrollY, fadeAnim]);

  const toggleModal = () => {
    if (modalVisible) {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setModalVisible(false));
    } else {
      setModalVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      {address && (
        <TouchableOpacity
          onPress={toggleModal}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Ionicons name="home" size={20} color="black" />
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: "#000",
              marginLeft: 5,
            }}
          >
            Home
          </Text>
          <Text
            style={{ flex: 1, color: "#555", marginLeft: 8, fontWeight: "500" }}
          >
            {address.street}, {address.city}, {address.state}
          </Text>
          <Image
            source={require("../assets/right.png")}
            style={{ width: 20, height: 20, tintColor: "black" }}
            onError={() => console.warn("Right arrow image failed to load")}
          />
        </TouchableOpacity>
      )}

      {/* Address Modal */}
      <Modal transparent visible={modalVisible} animationType="none">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "flex-end",
          }}
        >
          <Animated.View
            style={{
              backgroundColor: "#fff",
              padding: 20,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              position: "absolute",
              bottom: 0,
              width: "100%",
              transform: [{ translateY: slideAnim }],
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}
            >
              Your Address
            </Text>
            <Text>Street: {address?.street}</Text>
            <Text>City: {address?.city}</Text>
            <Text>State: {address?.state}</Text>
            <Text>Pincode: {address?.pinCode}</Text>
            <Text>Phone: {address?.phoneNumber}</Text>
            <Text>DOB: {address?.dob}</Text>

            <TouchableOpacity
              onPress={toggleModal}
              style={{
                marginTop: 20,
                backgroundColor: "#FF5E5E",
                padding: 10,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
                Close
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </Animated.View>
  );
};

export default AddressHome;
