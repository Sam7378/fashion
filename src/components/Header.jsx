import React, { useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fonts } from "../utils/fonts";

const Header = ({ isCart }) => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      {isCart ? (
        <TouchableOpacity
          style={styles.appDrawerContainer}
          onPress={handleBack}
        >
          <Image
            source={require("../assets/arrowback.png")}
            style={styles.appBackIcon}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.appDrawerContainer}
          onPress={() => navigation.openDrawer()}
        >
          <Image
            source={require("../assets/apps.png")}
            style={styles.appDrawerIcon}
          />
        </TouchableOpacity>
      )}

      {/* {isCart && <Text style={styles.titleText}>My Cart</Text>} */}

      <TouchableOpacity onPress={() => navigation.navigate("ACCOUNT")}>
        <Image
          source={require("../assets/Ellipse2.png")}
          style={styles.profileImage}
        />
      </TouchableOpacity>

      {/* Modal Popup */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeText}>✖</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Menu</Text>
            {/* Add menu items here */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("HOME");
              }}
            >
              <Text style={styles.menuText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("CART");
              }}
            >
              <Text style={styles.menuText}>My Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("ACCOUNT");
              }}
            >
              <Text style={styles.menuText}>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  appDrawerContainer: {
    backgroundColor: "white",
    height: 44,
    width: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  appDrawerIcon: {
    height: 30,
    width: 30,
  },
  appBackIcon: {
    height: 24,
    width: 24,
    marginLeft: 10,
  },
  profileImage: {
    height: 44,
    width: 44,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 60,
  },
  titleText: {
    fontSize: 28,
    fontFamily: fonts.regular,
    color: "#000000",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeText: {
    fontSize: 24,
    color: "black",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  menuItem: {
    padding: 10,
    width: "100%",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuText: {
    fontSize: 18,
    fontWeight: "500",
  },
});
