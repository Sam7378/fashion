import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartContext } from "../context/CartContext";
import CartCard from "../components/CartCard";
import { useNavigation } from "@react-navigation/native";

const OrderScreen = () => {
  const navigation = useNavigation();
  const { cartItems, totalPrice } = useContext(CartContext);
  const [address, setAddress] = useState(null);

  // Fetch Address from AsyncStorage
  useEffect(() => {
    const fetchAddress = async () => {
      const storedAddress = await AsyncStorage.getItem("userAddress");
      if (storedAddress) {
        setAddress(JSON.parse(storedAddress));
      }
    };
    fetchAddress();
  }, []);

  // Save Order Data to AsyncStorage
  // const handleCheckout = async () => {
  //   if (cartItems.length > 0) {
  //     await AsyncStorage.setItem("reorderItems", JSON.stringify(cartItems));
  //     alert("Order saved for reordering!");
  //     navigation.navigate("ReorderScreen"); // Navigate to ReorderScreen
  //   } else {
  //     alert("Cart is empty!");
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🛍️ Order Summary</Text>

      {/* Display Address */}
      {address && (
        <View style={styles.addressContainer}>
          <Text style={styles.addressTitle}>📍 Delivery Address</Text>
          <Text style={styles.addressText}>
            {address.street}, {address.city}, {address.state}, {address.pinCode}
          </Text>
          <Text style={styles.addressText}>📞 {address.phoneNumber}</Text>
        </View>
      )}

      {/* Order List */}
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <CartCard item={item} showDeleteIcon={false} />
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <Text style={styles.sectionHeader}>🚚 Shipping Charge: ₹ 0.00</Text>
        <Text style={styles.sectionHeader}>💰 Grand Total: ₹{totalPrice}</Text>

        {/* Checkout Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Go to Reorder</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  addressContainer: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  addressTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  addressText: { fontSize: 16, color: "#555", marginTop: 5 },
  footer: { marginTop: 20, padding: 15, borderRadius: 8 },
  sectionHeader: { fontSize: 18, fontWeight: "bold", color: "#333" },
  button: {
    marginTop: 20,
    backgroundColor: "#E96E6E",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { fontSize: 18, color: "#fff", fontWeight: "bold" },
});

export default OrderScreen;
