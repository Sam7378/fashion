import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useContext } from "react";
import LinearGradient from "react-native-linear-gradient";
import CartCard from "../components/CartCard";
import { fonts } from "../utils/fonts";
import { CartContext } from "../context/CartContext";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";

const CartScreen = () => {
  const { cartItems, deleteCartItem, totalPrice, clearCart } =
    useContext(CartContext);
  const navigation = useNavigation();

  const handleDeleteItem = async (id) => {
    try {
      await deleteCartItem(id);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      Alert.alert("Your cart is empty!");
      return;
    }

    const orderDetails = {
      id: new Date().getTime(),
      items: cartItems,
      totalPrice: totalPrice,
    };

    try {
      await AsyncStorage.setItem("orderDetails", JSON.stringify(orderDetails));
      clearCart();
      navigation.navigate("Payment", { cartItems, totalPrice });
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  return (
    <LinearGradient colors={["#f0d58b", "#edede9"]} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={({ item }) => (
            <CartCard item={item} handleDelete={handleDeleteItem} />
          )}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ marginTop: 40, paddingBottom: 100 }}
          ListFooterComponent={
            <>
              <View style={styles.bottomContentContainer}>
                <View style={styles.flexRowContainer}>
                  <Text style={styles.titleText}>Total:</Text>
                  <Text style={styles.priceText}>₹{totalPrice}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.flexRowContainer}>
                  <Text style={styles.titleText}>Grand Total:</Text>
                  <Text style={[styles.priceText, styles.grandPriceText]}>
                    ₹{totalPrice}
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.button} onPress={handleCheckout}>
                <Text style={styles.buttonText}>Checkout</Text>
              </TouchableOpacity>
            </>
          }
        />
      )}
    </LinearGradient>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    padding: 10,
  },
  flexRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  bottomContentContainer: {
    marginHorizontal: 10,
    marginTop: 30,
  },
  titleText: {
    fontSize: 18,
    color: "#1d1045",
    fontWeight: "500",
  },
  priceText: {
    fontSize: 18,
    color: "#1d1045",
    fontWeight: "600",
  },
  divider: {
    borderWidth: 1,
    borderColor: "#C0C0C0",
    marginTop: 10,
    marginBottom: 5,
  },
  grandPriceText: {
    color: "#3C3C3C",
    fontWeight: "700",
  },
  button: {
    backgroundColor: "#E96E6E",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 30,
  },
  buttonText: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "700",
    fontFamily: fonts.regular,
  },
  emptyCartText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginTop: 50,
  },
});
