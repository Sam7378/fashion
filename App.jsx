import { View, Text, Image, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screen/HomeScreen";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import Entypo from "react-native-vector-icons/dist/Entypo";
import ProductDetailsScreen from "./src/screen/ProductDetailsScreen";
import CartScreen from "./src/screen/CartScreen";
import ReorderScreen from "./src/screen/ReorderScreen";
import AccountScreen from "./src/screen/AccountScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CartContext, CartProvider } from "./src/context/CartContext";
// import CartProvider, { CartContext } from "./CartContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./src/screen/LoginScreen";
import SignUpScreen from "./src/screen/SignUpScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MyHomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HOME" component={HomeScreen} />
      <Stack.Screen name="PRODUCT_DETAILS" component={ProductDetailsScreen} />
    </Stack.Navigator>
  );
};

const BottomTabs = ({ setIsLoggedIn }) => {
  return (
    <CartProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="HOME_STACK"
          component={MyHomeStack}
          options={{
            tabBarIcon: ({ focused, size }) => {
              if (focused) {
                return (
                  <Image
                    source={require("./src/assets/focused/home.png")}
                    style={{
                      height: size,
                      width: size,
                      resizeMode: "center",
                    }}
                  />
                );
              } else {
                return (
                  <Image
                    source={require("./src/assets/normal/home.png")}
                    style={{
                      height: size,
                      width: size,
                      resizeMode: "center",
                    }}
                  />
                );
              }
            },
          }}
        />
        <Tab.Screen
          name="REORDER"
          component={ReorderScreen}
          options={{
            tabBarIcon: ({ focused, size }) => {
              if (focused) {
                return (
                  <Image
                    source={require("./src/assets/focused/reorder.png")}
                    style={{
                      height: size,
                      width: size,
                      resizeMode: "center",
                    }}
                  />
                );
              } else {
                return (
                  <Image
                    source={require("./src/assets/normal/reorder.png")}
                    style={{
                      height: size,
                      width: size,
                      resizeMode: "center",
                    }}
                  />
                );
              }
            },
          }}
        />
        <Tab.Screen
          name="CART"
          component={CartScreen}
          options={{
            tabBarIcon: ({ focused, size }) => {
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
            },
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
          {(props) => (
            <AccountScreen {...props} setIsLoggedIn={setIsLoggedIn} />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </CartProvider>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("userToken");
      setIsLoggedIn(!!token);
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
    <NavigationContainer>
      <CartProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLoggedIn ? (
            <Stack.Screen name="MAIN">
              {(props) => (
                <BottomTabs {...props} setIsLoggedIn={setIsLoggedIn} />
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
        </Stack.Navigator>
      </CartProvider>
    </NavigationContainer>

    // <NavigationContainer>
    //   <CartProvider>
    //     <Tab.Navigator
    //       screenOptions={{
    //         headerShown: false,
    //         tabBarShowLabel: false,
    //       }}
    //     >
    //       <Tab.Screen
    //         name="HOME_STACK"
    //         component={MyHomeStack}
    //         options={{
    //           tabBarIcon: ({ focused, size }) => {
    //             if (focused) {
    //               return (
    //                 <Image
    //                   source={require("./src/assets/focused/home.png")}
    //                   style={{
    //                     height: size,
    //                     width: size,
    //                     resizeMode: "center",
    //                   }}
    //                 />
    //               );
    //             } else {
    //               return (
    //                 <Image
    //                   source={require("./src/assets/normal/home.png")}
    //                   style={{
    //                     height: size,
    //                     width: size,
    //                     resizeMode: "center",
    //                   }}
    //                 />
    //               );
    //             }
    //           },
    //         }}
    //       />
    //       <Tab.Screen
    //         name="REORDER"
    //         component={ReorderScreen}
    //         options={{
    //           tabBarIcon: ({ focused, size }) => {
    //             if (focused) {
    //               return (
    //                 <Image
    //                   source={require("./src/assets/focused/reorder.png")}
    //                   style={{
    //                     height: size,
    //                     width: size,
    //                     resizeMode: "center",
    //                   }}
    //                 />
    //               );
    //             } else {
    //               return (
    //                 <Image
    //                   source={require("./src/assets/normal/reorder.png")}
    //                   style={{
    //                     height: size,
    //                     width: size,
    //                     resizeMode: "center",
    //                   }}
    //                 />
    //               );
    //             }
    //           },
    //         }}
    //       />
    //       <Tab.Screen
    //         name="CART"
    //         component={CartScreen}
    //         options={{
    //           tabBarIcon: ({ focused, size }) => {
    //             const { cartItems } = useContext(CartContext);
    //             if (focused) {
    //               return (
    //                 <View style={{ position: "relative" }}>
    //                   <Image
    //                     source={require("./src/assets/focused/shopping_cart.png")}
    //                     style={{
    //                       height: size,
    //                       width: size,
    //                       resizeMode: "center",
    //                     }}
    //                   />
    //                   <View
    //                     style={{
    //                       position: "absolute",
    //                       right: -3,
    //                       bottom: 22,
    //                       height: 14,
    //                       width: 14,
    //                       backgroundColor: "#E96E6E",
    //                       borderRadius: 7,
    //                       alignItems: "center",
    //                       justifyContent: "center",
    //                     }}
    //                   >
    //                     <Text style={{ color: "white", fontSize: 10 }}>
    //                       {cartItems.length}
    //                     </Text>
    //                   </View>
    //                 </View>
    //               );
    //             } else {
    //               return (
    //                 <View style={{ position: "relative" }}>
    //                   <Image
    //                     source={require("./src/assets/normal/shopping_cart.png")}
    //                     style={{
    //                       height: size,
    //                       width: size,
    //                       resizeMode: "center",
    //                     }}
    //                   />
    //                   <View
    //                     style={{
    //                       position: "absolute",
    //                       right: -3,
    //                       bottom: 22,
    //                       height: 14,
    //                       width: 14,
    //                       backgroundColor: "#C0C0C0",
    //                       borderRadius: 7,
    //                       alignItems: "center",
    //                       justifyContent: "center",
    //                     }}
    //                   >
    //                     <Text style={{ color: "white", fontSize: 10 }}>
    //                       {cartItems.length}
    //                     </Text>
    //                   </View>
    //                 </View>
    //               );
    //             }
    //           },
    //         }}
    //       />
    //       <Tab.Screen
    //         name="ACCOUNT"
    //         component={AccountScreen}
    //         options={{
    //           tabBarIcon: ({ focused, size }) => {
    //             if (focused) {
    //               return (
    //                 <Image
    //                   source={require("./src/assets/focused/account.png")}
    //                   style={{
    //                     height: size,
    //                     width: size,
    //                     resizeMode: "center",
    //                   }}
    //                 />
    //               );
    //             } else {
    //               return (
    //                 <Image
    //                   source={require("./src/assets/normal/account.png")}
    //                   style={{
    //                     height: size,
    //                     width: size,
    //                     resizeMode: "center",
    //                   }}
    //                 />
    //               );
    //             }
    //           },
    //         }}
    //       />
    //     </Tab.Navigator>
    //   </CartProvider>
    // </NavigationContainer>
  );
};

export default App;
