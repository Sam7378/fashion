import { View, Text, Image, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screen/HomeScreen";
import ProductDetailsScreen from "./src/screen/ProductDetailsScreen";
import CartScreen from "./src/screen/CartScreen";
import ReorderScreen from "./src/screen/ReorderScreen";
import AccountScreen from "./src/screen/AccountScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CartProvider, CartContext } from "./src/context/CartContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./src/screen/LoginScreen";
import SignUpScreen from "./src/screen/SignUpScreen";
import DrawerNavigator from "./src/drawer/DrawerNavigator";
import EditProfileScreen from "./src/screen/EditProfileScreen";
import SettingsScreen from "./src/screen/SettingsScreen";
import MyStatusScreen from "./src/screen/MyStatusScreen";
import OrderScreen from "./src/screen/OrderScreen";
import HelpSupportScreen from "./src/screen/HelpSupportScreen";
import AddressScreen from "./src/screen/AddressScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import PaymentScreen from "./src/screen/PamentScreen";
import FeedbackScreen from "./src/screen/FeedbackScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MyHomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HOME" component={HomeScreen} />
    <Stack.Screen name="PRODUCT_DETAILS" component={ProductDetailsScreen} />
  </Stack.Navigator>
);

// Separate cart icon component to avoid hook issues
const CartIcon = ({ focused, size }) => {
  const { cartItems } = useContext(CartContext);
  const iconSource = focused
    ? require("./src/assets/focused/shopping_cart.png")
    : require("./src/assets/normal/shopping_cart.png");

  const badgeColor = focused ? "#E96E6E" : "#C0C0C0";

  return (
    <View style={{ position: "relative" }}>
      <Image
        source={iconSource}
        style={{ height: size, width: size, resizeMode: "center" }}
      />
      {cartItems.length > 0 && (
        <View
          style={{
            position: "absolute",
            right: -3,
            bottom: 22,
            height: 14,
            width: 14,
            backgroundColor: badgeColor,
            borderRadius: 7,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 10 }}>
            {cartItems.length}
          </Text>
        </View>
      )}
    </View>
  );
};

export const BottomTabs = ({ setIsLoggedIn }) => (
  <CartProvider>
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
    >
      <Tab.Screen
        name="HOME_STACK"
        component={MyHomeStack}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={
                focused
                  ? require("./src/assets/focused/home.png")
                  : require("./src/assets/normal/home.png")
              }
              style={{ height: size, width: size, resizeMode: "center" }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="REORDER"
        component={ReorderScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={
                focused
                  ? require("./src/assets/tracking2.png")
                  : require("./src/assets/tracking1.png")
              }
              style={{ height: size, width: size, resizeMode: "center" }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CART"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <CartIcon focused={focused} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ACCOUNT"
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={
                focused
                  ? require("./src/assets/focused/account.png")
                  : require("./src/assets/normal/account.png")
              }
              style={{ height: size, width: size, resizeMode: "center" }}
            />
          ),
        }}
      >
        {(props) => <AccountScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Tab.Screen>
    </Tab.Navigator>
  </CartProvider>
);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        console.log("Checking login status...");
        const token = await AsyncStorage.getItem("userToken");
        const loggedIn = !!token;
        setIsLoggedIn(loggedIn);
        console.log("Updated isLoggedIn:", loggedIn);
      } catch (error) {
        console.error("Error Checking status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isLoggedIn ? (
              <Stack.Screen name="DRAWER">
                {(props) => (
                  <DrawerNavigator {...props} setIsLoggedIn={setIsLoggedIn} />
                )}
              </Stack.Screen>
            ) : (
              <Stack.Screen name="LOGIN">
                {(props) => (
                  <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />
                )}
              </Stack.Screen>
            )}
            <Stack.Screen name="SIGNUP" component={SignUpScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="MyStatus" component={MyStatusScreen} />
            <Stack.Screen name="Order" component={OrderScreen} />
            <Stack.Screen name="Help" component={HelpSupportScreen} />
            <Stack.Screen name="Address" component={AddressScreen} />
            <Stack.Screen name="Pament" component={PaymentScreen} />
            <Stack.Screen name="Feedback" component={FeedbackScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </GestureHandlerRootView>
  );
};

export default App;
