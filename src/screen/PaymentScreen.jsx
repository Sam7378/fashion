import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FlatList } from "react-native";

const paymentImages = {
  "Credit Card": require("../assets/credit.png"),
  "Google Pay": require("../assets/google.png"),
  "Phone Pay": require("../assets/phonepe.png"),
  "Cash on Delivery": require("../assets/cash.png"),
};

const PaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [loading, setLoading] = useState(false);
  const { totalPrice = 0, cartItems = [] } = route.params || [];

  useEffect(() => {
    const loadAddress = async () => {
      try {
        const storedAddress = await AsyncStorage.getItem("userAddress");
        if (storedAddress) {
          setSelectedAddress(JSON.parse(storedAddress));
        }
      } catch (error) {
        console.error("Error loading address:", error);
      }
    };
    loadAddress();
  }, []);

  const handleOrder = async () => {
    if (!selectedPayment) {
      Alert.alert("Error", "Please select a payment method.");
      return;
    }

    setLoading(true);
    setTimeout(async () => {
      setLoading(false);

      const orderData = {
        items: cartItems, // Save ordered items
        address: selectedAddress,
        totalPrice,
        paymentMethod: selectedPayment,
      };

      try {
        await AsyncStorage.setItem("orderDetails", JSON.stringify(orderData));
        console.log("Order saved successfully:", orderData);
      } catch (error) {
        console.error("Error saving order details:", error);
      }

      Alert.alert(
        "🎉 Payment Successful!",
        `Your payment using ${selectedPayment} was successful.`,
        [
          {
            text: "OK",
            onPress: () =>
              navigation.navigate("Order", {
                orderDetails: orderData,
              }),
          },
        ]
      );
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <MaterialIcons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Delivery Address</Text>
      <View style={styles.detailsContainer}>
        {selectedAddress.street ? (
          <>
            <Text
              style={styles.detailText}
            >{`Street: ${selectedAddress.street}`}</Text>
            <Text
              style={styles.detailText}
            >{`City: ${selectedAddress.city}`}</Text>
            <Text
              style={styles.detailText}
            >{`State: ${selectedAddress.state}`}</Text>
            <Text
              style={styles.detailText}
            >{`PIN Code: ${selectedAddress.pinCode}`}</Text>
            <Text
              style={styles.detailText}
            >{`Phone: ${selectedAddress.phoneNumber}`}</Text>
          </>
        ) : (
          <Text style={styles.detailText}>No Address Found</Text>
        )}
      </View>

      <Text style={styles.title}>Select Payment Method</Text>
      {Object.keys(paymentImages).map((method) => (
        <TouchableOpacity
          key={method}
          style={[
            styles.option,
            selectedPayment === method && styles.selectedOption,
          ]}
          onPress={() => setSelectedPayment(method)}
        >
          <Image source={paymentImages[method]} style={styles.paymentImage} />
          <Text style={styles.optionText}>{method}</Text>
          <MaterialIcons
            name={
              selectedPayment === method
                ? "radio-button-checked"
                : "radio-button-unchecked"
            }
            size={20}
            color={selectedPayment === method ? "#FFA500" : "#000"}
          />
        </TouchableOpacity>
      ))}

      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>Product Price: ₹{totalPrice}</Text>
        <Text style={styles.detailText}>Total Price: ₹{totalPrice}</Text>
      </View>

      <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
        <Text style={styles.orderButtonText}>
          {loading ? "Processing..." : "Make Payment"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f8f8" },
  backButton: { position: "absolute", top: 20, left: 10 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  detailsContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  detailText: { fontSize: 16, marginBottom: 5 },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedOption: { borderColor: "#4CAF50", backgroundColor: "#E8F5E9" },
  optionText: { fontSize: 18, flex: 1, textAlign: "center" },
  paymentImage: { width: 40, height: 40, resizeMode: "contain" },
  orderButton: {
    backgroundColor: "#E59400",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  orderButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default PaymentScreen;
