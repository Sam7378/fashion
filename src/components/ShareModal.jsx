import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  Linking,
} from "react-native";

const ShareModal = ({ visible, onClose }) => {
  const openWhatsApp = () => {
    Linking.openURL("https://wa.me/?text=Check%20out%20this%20awesome%20app!");
    onClose();
  };

  const openFacebook = () => {
    Linking.openURL("https://www.facebook.com/");
    onClose();
  };

  const openInstagram = () => {
    Linking.openURL("https://www.instagram.com/");
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Share this app on</Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={openWhatsApp}>
              <Image
                source={require("../assets/whatsapp.png")}
                // source={require("../assets/whatsapp.png")}
                style={styles.iconImage}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={openFacebook}>
              <Image
                source={require("../assets/facebook.png")}
                // source={require("../assets/facebook.png")}
                style={styles.iconImage}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={openInstagram}>
              <Image
                source={require("../assets/instagram.png")}
                // source={require("../assets/instagram.png")}
                style={styles.iconImage}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  iconImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  closeButton: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ShareModal;
