import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
interface IIConButton {
  icon: string;
  size?: number;
  color?: string;
  onPress?: (e: GestureResponderEvent) => void;
}
const IconButton: React.FC<IIConButton> = ({ icon, color, size, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={onPress}
    >
      <View style={styles.buttonContainer}>
        <Ionicons name={icon as any} size={size} color={color} />
      </View>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.75,
  },
});
