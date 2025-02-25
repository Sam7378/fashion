import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  PermissionsAndroid,
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";

// Function to request camera permission (Android only)
export const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Camera Permission",
        message: "This app needs camera access to take pictures.",
        buttonPositive: "OK",
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

const CameraScreen = () => {
  const [photo, setPhoto] = useState(null);

  // Function to open the camera
  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert("Permission Denied", "Camera permission is required.");
      return;
    }

    const options = { mediaType: "photo", saveToPhotos: true };

    launchCamera(options, async (response) => {
      if (response.didCancel) {
        Alert.alert("Camera", "User cancelled camera");
      } else if (response.errorMessage) {
        Alert.alert("Camera Error", response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const newImage = response.assets[0].uri;
        setPhoto({ uri: newImage });
        await AsyncStorage.setItem("profileImage", newImage);
      }
    });
  };

  const openGallery = async () => {
    const options = { mediaType: "photo" };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        Alert.alert("Gallery", "User cancelled image selection");
      } else if (response.errorMessage) {
        Alert.alert("Gallery Error", response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const newImage = response.assets[0].uri;
        setPhoto({ uri: newImage });
        await AsyncStorage.setItem("profileImage", newImage);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Camera Access</Text>

      <TouchableOpacity style={styles.cameraButton} onPress={openCamera}>
        <Ionicons name="camera-outline" size={40} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.galleryButton} onPress={openGallery}>
        <Ionicons name="images-outline" size={40} color="white" />
      </TouchableOpacity>

      {photo && <Image source={photo} style={styles.previewImage} />}

      {photo && (
        <TouchableOpacity style={styles.captureAgain} onPress={openCamera}>
          <Text style={styles.captureText}>Capture Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cameraButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  galleryButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#34C759",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  previewImage: {
    width: 250,
    height: 300,
    borderRadius: 10,
    marginTop: 20,
  },
  captureAgain: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 10,
  },
  captureText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CameraScreen;
