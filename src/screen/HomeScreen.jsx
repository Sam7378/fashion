import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState, useCallback } from "react";
import LinearGradient from "react-native-linear-gradient";
import Header from "../components/Header";
import Tags from "../components/Tags";
import ProductCard from "../components/ProductCard";
import data from "../data/data.json";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [searchItem, setSearchItem] = useState("");
  const [products, setProducts] = useState(data.products);
  const navigation = useNavigation();

  const handleProductDetails = useCallback(
    (item) => {
      navigation.navigate("PRODUCT_DETAILS", { item });
    },
    [navigation]
  );

  const toggleFavorite = useCallback(
    (item) => {
      setProducts((prevProducts) =>
        prevProducts.map((prod) =>
          prod.id === item.id ? { ...prod, isFavorite: !prod.isFavorite } : prod
        )
      );
    },
    [setProducts]
  );

  const filteredLists = products.filter((product) =>
    product.title.toLowerCase().includes(searchItem.toLowerCase())
  );

  return (
    <LinearGradient colors={["#FDF0F3", "#FFFBFC"]} style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <Header />
            <View>
              <Text style={styles.headingText}>Match Your Style</Text>
              <View style={styles.inputContainer}>
                <Image
                  source={require("../assets/search.png")}
                  style={styles.searchIcon}
                />
                <TextInput
                  placeholder="Search"
                  style={styles.textInput}
                  placeholderTextColor="#000000"
                  onChangeText={setSearchItem}
                  state
                  value={searchItem}
                />
              </View>
            </View>
            <Tags />
          </>
        }
        data={filteredLists}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            handleProductClick={handleProductDetails}
            toggleFavorite={toggleFavorite}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headingText: {
    fontSize: 28,
    color: "#000000",
    marginVertical: 20,
    fontFamily: "Poppins-Regular",
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 12,
  },
  searchIcon: {
    height: 26,
    width: 26,
    marginRight: 10,
  },
  textInput: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    color: "black",
    flex: 1,
  },
});
