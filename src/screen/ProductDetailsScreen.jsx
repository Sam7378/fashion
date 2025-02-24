import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import Header from "../components/Header";
import { fonts } from "../utils/fonts";
import { useNavigation, useRoute } from "@react-navigation/native";
import { addToCart } from "../utils/helper";
import { CartContext } from "../context/CartContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import SliderBanner from "./SliderBanner";

const colorsArray = [
  "#91A1B0",
  "#B11D1D",
  "#1F44A3",
  "#9F632A",
  "#1D752B",
  "#000000",
];

const ProductDetailsScreen = () => {
  const { addToCartItem } = useContext(CartContext);
  const route = useRoute();
  const navigation = useNavigation();
  const product = route.params.item;
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("#B11D1D");

  const handleAddToCart = () => {
    product.color = selectedColor;
    product.size = selectedSize;
    addToCartItem(product);
    navigation.navigate("CART");
  };
  return (
    <LinearGradient colors={["#66787d", "#cfdcdf"]} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {/* <SliderBanner style={styles.sliderBanner} /> */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.coverImage} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.fontText}>{product.title}</Text>
          <Text style={styles.fontText}>₹{product.price}</Text>
        </View>
        <Text style={[styles.fontText, styles.sizeText]}>Size</Text>
        {/* size container */}
        <View style={styles.sizeContainer}>
          {["S", "M", "L", "XL"].map((size) => (
            <TouchableOpacity
              key={size}
              style={styles.sizeValueContainer}
              onPress={() => setSelectedSize(size)}
            >
              <Text
                style={[
                  styles.sizeValueText,
                  selectedSize === size && styles.selectedText,
                ]}
              >
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* color container */}
        <View style={styles.colorContainer}>
          {colorsArray.map((color, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedColor(color)}
            >
              <View
                style={[
                  styles.borderColorCircle,
                  selectedColor === color && {
                    borderColor: color,
                    borderWidth: 2,
                    borderRadius: 24,
                  },
                ]}
              >
                <View
                  style={[styles.colorCircle, { backgroundColor: color }]}
                ></View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        {/* cart button */}
        <View>
          <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  backButton: {
    marginRight: 10,
  },
  sliderBanner: {
    height: 30,
    width: "10%",
  },
  imageContainer: {
    height: 420,
    width: "100%",
  },
  coverImage: {
    resizeMode: "cover",
    flex: 1,
  },
  contentContainer: {
    padding: 8,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fontText: {
    fontSize: 20,
    fontFamily: fonts.regular,
    fontWeight: "700",
    color: "#444444",
  },
  sizeText: {
    marginTop: 7,
  },
  sizeContainer: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
  },
  sizeValueContainer: {
    backgroundColor: "#ec4777",
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  sizeValueText: {
    fontSize: 18,
    fontFamily: fonts.regular,
    fontWeight: "700",
  },
  selectedText: {
    color: "#fff",
  },
  colorContainer: {
    flexDirection: "row",
  },
  borderColorCircle: {
    height: 48,
    width: 48,
    padding: 5,
    marginHorizontal: 5,
  },
  colorCircle: {
    flex: 1,
    borderRadius: 18,
  },
  button: {
    backgroundColor: "#E96E6E",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "700",
    fontFamily: fonts.regular,
  },
});
