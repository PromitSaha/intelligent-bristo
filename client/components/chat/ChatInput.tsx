import React from "react";

import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";

interface Props {
  value: string;
  onChangeText: (
    text: string
  ) => void;
  onSend: () => void;
  disabled?: boolean;
}

export default function ChatInput({
  value,
  onChangeText,
  onSend,
  disabled,
}: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder= "Ask the AI assistant..."
        placeholderTextColor="#777"
        style={styles.input}
        multiline
      />

      <TouchableOpacity
        onPress={onSend}
        disabled={
          disabled ||
          value.trim() === ""
        }
        style={[
          styles.sendButton,
          (
            disabled ||
            value.trim() === ""
          ) && styles.disabledButton,
        ]}
      >
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
    bottom: 30,
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "rgba(255,255,255,0.45)",
    borderRadius: 40,
    padding: 14,
  },

  input: {
    flex: 1,
    fontSize: 18,
    color: "#1a1a1a",
    minHeight: 52,
    maxHeight: 120,
    paddingHorizontal: 14,
    paddingVertical: 14,
    textAlignVertical: "center",
  },

  sendButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#ff8c1a",
    justifyContent: "center",
    alignItems: "center",
  },

  disabledButton: {
    opacity: 0.4,
  },

  sendText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "600",
  },
});