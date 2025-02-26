import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useState, useCallback, useRef, useEffect } from "react";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SliderBanner from "./SliderBanner";
import AddressHome from "./AddressHome";
import Tags from "../components/Tags";
import ProductCard from "../components/ProductCard";
import data from "../data/data.json";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const [searchItem, setSearchItem] = useState("");
  const [products, setProducts] = useState(data.products);
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [notificationCount, setNotificationCount] = useState(0);
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

  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const storedNotifications = await AsyncStorage.getItem("notifications");
        if (storedNotifications) {
          setNotificationCount(JSON.parse(storedNotifications).length);
        }
      } catch (error) {
        console.error("Error loading notifications:", error);
      }
    };

    const focusListener = navigation.addListener(
      "focus",
      fetchNotificationCount
    );
    fetchNotificationCount();

    return focusListener;
  }, [navigation]);

  return (
    <LinearGradient colors={["#FDF0F3", "#FFFBFC"]} style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.drawerIcon}
          onPress={() => navigation.openDrawer()}
        >
          <Ionicons name="grid" size={25} color="black" />
        </TouchableOpacity>
        <Text style={styles.headingText}>Match Your Style</Text>
        <TouchableOpacity
          style={styles.notificationIcon}
          onPress={() => navigation.navigate("Notification")}
        >
          <Icon name="notifications" size={30} color="#000" />
          {notificationCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{notificationCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Image
          source={require("../assets/search.png")}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search"
          style={styles.textInput}
          placeholderTextColor="#000000"
          onChangeText={setSearchItem}
          value={searchItem}
        />
      </View>

      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <AddressHome scrollY={scrollY} />

        <SliderBanner />

        {/* <Tags /> */}

        <FlatList
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
          contentContainerStyle={{ paddingBottom: 50 }}
        />
      </Animated.ScrollView>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headingText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  searchContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 10,
  },
  textInput: {
    fontSize: 16,
    color: "black",
    flex: 1,
  },
  drawerIcon: {
    paddingLeft: 10,
  },
  bellIcon: {
    paddingRight: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  title: { fontSize: 22, fontWeight: "bold" },
  notificationIcon: { position: "relative", padding: 10 },
  badge: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "red",
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
});
