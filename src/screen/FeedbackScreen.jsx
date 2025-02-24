import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const FeedbackScreen = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleRating = (index) => {
    setRating(index + 1);
  };

  const handleSubmit = () => {
    Alert.alert("Feedback Submitted", "Thank you for your feedback!", [
      {
        text: "OK",
        onPress: () => navigation.navigate("Home"), // Navigate to Home screen
      },
    ]);
    setRating(0);
    setComment("");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Feedback</Text>
      </View>

      {/* Feedback Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/feedback.png")}
          style={styles.image}
        />
      </View>

      {/* Star Rating */}
      <View style={styles.starContainer}>
        {[...Array(5)].map((_, index) => (
          <TouchableOpacity key={index} onPress={() => handleRating(index)}>
            <Icon
              name="star"
              size={32}
              color={index < rating ? "#1C45AB" : "#ccc"}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Comment Box */}
      <View style={styles.commentContainer}>
        <Text style={styles.commentLabel}>Comment / Suggestion</Text>
        <TextInput
          style={styles.input}
          placeholder="Write your feedback here..."
          value={comment}
          onChangeText={setComment}
          multiline
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: { alignItems: "center", marginBottom: 20 },
  headerText: { fontSize: 22, fontWeight: "bold", color: "#1C45AB" },
  imageContainer: { alignItems: "center", marginBottom: 20 },
  image: { width: 100, height: 100, resizeMode: "contain" },
  starContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  commentContainer: { marginBottom: 20 },
  commentLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1C45AB",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#1C45AB",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  submitText: { color: "white", fontSize: 18, fontWeight: "bold" },
});

export default FeedbackScreen;
