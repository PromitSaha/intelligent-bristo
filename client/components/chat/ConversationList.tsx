import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import { COLORS } from "@/constants/colors";

export default function ConversationList() {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.aiMessage}>
        <Text style={styles.aiText}>
          Welcome to Intelligent Bistro.
          What would you like today?
        </Text>
      </View>

      <View style={styles.userMessage}>
        <Text style={styles.userText}>
          Add two spicy burgers.
        </Text>
      </View>

      <View style={styles.aiMessage}>
        <Text style={styles.aiText}>
          Added 2 spicy burgers to your cart.
        </Text>
      </View>

      <View style={styles.loadingContainer}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 120,
    gap: 16,
  },

  aiMessage: {
    alignSelf: "flex-start",

    maxWidth: "80%",

    padding: 16,

    borderRadius: 24,

    backgroundColor: COLORS.glass,

    borderWidth: 1,
    borderColor: COLORS.border,
  },

  aiText: {
    color: COLORS.primaryText,
    fontSize: 16,
    lineHeight: 24,
  },

  userMessage: {
    alignSelf: "flex-end",

    maxWidth: "80%",

    padding: 16,

    borderRadius: 24,

    backgroundColor: COLORS.accent,
  },

  userText: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 24,
  },

  loadingContainer: {
    flexDirection: "row",
    gap: 8,

    paddingLeft: 12,
    marginTop: 4,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,

    backgroundColor: COLORS.secondaryText,
  },

});