import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CartCard from "../components/CartCard";
import { useNavigation } from "@react-navigation/native";

const OrderScreen = () => {
  const navigation = useNavigation();
  const [orderItems, setOrderItems] = useState([]);
  const [address, setAddress] = useState(null);
  const [savedTotalPrice, setSavedTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("N/A");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // Fetch Ordered Items
        const storedOrder = await AsyncStorage.getItem("orderDetails");
        if (storedOrder) {
          const parsedOrder = JSON.parse(storedOrder);
          setOrderItems(parsedOrder.items || []);
          setSavedTotalPrice(parsedOrder.totalPrice || 0);
          setPaymentMethod(parsedOrder.paymentMethod || "N/A");

          // **Update Reorder Screen instantly**
          await AsyncStorage.setItem(
            "reorderItems",
            JSON.stringify(parsedOrder.items || [])
          );
        }

        // Fetch Address
        const storedAddress = await AsyncStorage.getItem("userAddress");
        if (storedAddress) {
          setAddress(JSON.parse(storedAddress));
        }
      } catch (error) {
        console.error("Error loading order:", error);
      }
    };
    fetchOrderDetails();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🛍️ Order Summary</Text>

      {address && (
        <View style={styles.addressContainer}>
          <Text style={styles.addressTitle}>📍 Delivery Address</Text>
          <Text style={styles.addressText}>
            {address.street}, {address.city}, {address.state}, {address.pinCode}
          </Text>
          <Text style={styles.addressText}>📞 {address.phoneNumber}</Text>
        </View>
      )}

      {orderItems.length > 0 ? (
        <FlatList
          data={orderItems}
          renderItem={({ item }) => (
            <CartCard item={item} showDeleteIcon={false} />
          )}
          keyExtractor={(item) =>
            item.id?.toString() || Math.random().toString()
          }
        />
      ) : (
        <Text style={styles.emptyText}>No orders found!</Text>
      )}

      <View style={styles.footer}>
        <Text style={styles.detailText}>
          💰 Grand Total: ₹{savedTotalPrice}
        </Text>
        <Text style={styles.detailText}>
          💳 Payment Method: {paymentMethod}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("HOME_STACK")}
      >
        <Text style={styles.buttonText}>Reorders</Text>
      </TouchableOpacity>
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
    marginBottom: 10,
  },
  addressContainer: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  addressTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  addressText: { fontSize: 16, color: "#555", marginTop: 5 },
  emptyText: {
    fontSize: 18,
    textAlign: "center",
    color: "#999",
    marginTop: 20,
  },
  footer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#f8f8f8",
  },
  detailText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
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
