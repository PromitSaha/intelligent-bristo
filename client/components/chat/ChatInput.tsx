import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

import { COLORS } from "@/constants/colors";

export default function ChatInput() {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Ask the AI assistant..."
        placeholderTextColor={COLORS.secondaryText}
        style={styles.input}
      />

      <TouchableOpacity style={styles.sendButton}>
        <Text style={styles.sendText}>
          ↑
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    position: "absolute",

    left: 20,
    right: 20,
    bottom: 24,

    flexDirection: "row",
    alignItems: "center",

    padding: 10,

    borderRadius: 32,

    backgroundColor: COLORS.glass,

    borderWidth: 1,
    borderColor: COLORS.border,
  },

  input: {
    flex: 1,

    paddingHorizontal: 16,

    fontSize: 16,
    color: COLORS.primaryText,
  },

  sendButton: {
    width: 44,
    height: 44,

    borderRadius: 22,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: COLORS.accent,
  },

  sendText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

});