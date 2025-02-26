import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CartCard from "../components/CartCard";
import { useFocusEffect } from "@react-navigation/native";

const ReorderScreen = () => {
  const [reorderItems, setReorderItems] = useState([]);
  const [address, setAddress] = useState(null);

  // Refresh when screen is focused
  useFocusEffect(
    useCallback(() => {
      const fetchReorderData = async () => {
        // Fetch Reorder Items
        const storedItems = await AsyncStorage.getItem("reorderItems");
        if (storedItems) {
          setReorderItems(JSON.parse(storedItems));
        }

        // Fetch Address
        const storedAddress = await AsyncStorage.getItem("userAddress");
        if (storedAddress) {
          setAddress(JSON.parse(storedAddress));
        }
      };
      fetchReorderData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📦 Order Items</Text>

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

      {/* Reorder Items */}
      {reorderItems.length > 0 ? (
        <FlatList
          data={reorderItems}
          renderItem={({ item }) => (
            <CartCard item={item} showDeleteIcon={false} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={styles.emptyText}>No reorder items found!</Text>
      )}
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
  emptyText: {
    fontSize: 18,
    textAlign: "center",
    color: "#999",
    marginTop: 20,
  },
});

export default ReorderScreen;
