import React from "react";
import { StyleSheet, View, Text, GestureResponderEvent } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Button from "./Button";
interface ErrorOverlay {
  message?: string;
  onConfirm?: (e: GestureResponderEvent) => void;
}
const ErrorOverlay: React.FC<ErrorOverlay> = ({ message, onConfirm }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred!</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  );
};

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    color: "white",
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
