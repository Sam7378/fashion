import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const HelpSupportScreen = () => {
  const navigation = useNavigation();

  const handlePress = (type) => {
    switch (type) {
      case "mail":
        console.log("Navigate to Mail Support");
        break;
      case "whatsapp":
        console.log("Navigate to WhatsApp Support");
        break;
      case "call":
        console.log("Navigate to Call Support");
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Customer Support</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingBottom: 30 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Icon */}
        <View style={styles.iconPlaceholder}>
          <Image
            source={require("../assets/help.png")}
            style={styles.futureIcon}
          />
        </View>

        <View style={styles.wrapContact}>
          <Text style={styles.contactText}>Contact us</Text>
        </View>

        {/* Cards */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => handlePress("mail")}
        >
          <View style={styles.cardLeft}>
            <Ionicons name="mail-outline" style={styles.cardIcon} />
            <Text style={styles.iconText}>Mail</Text>
          </View>
          <Text style={styles.cardMiddleText}>Mail Support</Text>
          <Ionicons name="chevron-forward" style={styles.cardArrow} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => handlePress("whatsapp")}
        >
          <View style={styles.cardLeft}>
            <Ionicons name="logo-whatsapp" style={styles.cardIcon} />
            <Text style={styles.iconText}>WhatsApp</Text>
          </View>
          <Text style={styles.cardMiddleText}>WhatsApp Support</Text>
          <Ionicons name="chevron-forward" style={styles.cardArrow} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => handlePress("call")}
        >
          <View style={styles.cardLeft}>
            <Ionicons name="call-outline" style={styles.cardIcon} />
            <Text style={styles.iconText}>Call</Text>
          </View>
          <Text style={styles.cardMiddleText}>Call Support</Text>
          <Ionicons name="chevron-forward" style={styles.cardArrow} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    height: 150,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 15,
    top: 15,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  scrollContainer: {
    flex: 1,
    width: "100%",
  },
  iconPlaceholder: {
    width: 99.5,
    height: 128.73,
    marginTop: 35,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  futureIcon: {
    width: 99.5,
    height: 128.73,
    resizeMode: "contain",
  },
  wrapContact: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  contactText: {
    color: "#3061AC",
    fontSize: 28,
    fontWeight: "bold",
  },
  card: {
    width: "90%",
    height: 108,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    elevation: 3,
    justifyContent: "space-between",
    alignSelf: "center",
  },
  cardLeft: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 80,
  },
  cardIcon: {
    fontSize: 30,
    color: "#007AFF",
    marginBottom: 5,
  },
  iconText: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  cardMiddleText: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    color: "#000",
  },
  cardArrow: {
    fontSize: 28,
    color: "#999",
  },
});

export default HelpSupportScreen;
