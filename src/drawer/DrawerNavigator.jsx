import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../drawer/CustomDrawer";
import { BottomTabs } from "../../App";
import MyStatusScreen from "../screen/MyStatusScreen";
import AccountScreen from "../screen/AccountScreen"; // Import AccountScreen

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ setIsLoggedIn }) => {
  const handleLogout = () => setIsLoggedIn(false);
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawer {...props} onLogout={handleLogout} />
      )}
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: "#fff" },
      }}
    >
      <Drawer.Screen name="Home" component={BottomTabs} />
      <Drawer.Screen name="MyStatus" component={MyStatusScreen} />
      <Drawer.Screen name="Account">
        {(props) => <AccountScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
