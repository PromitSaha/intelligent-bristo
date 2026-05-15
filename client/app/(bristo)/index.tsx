import { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView }
from "react-native-safe-area-context";

import { COLORS } from "@/constants/colors";

import MenuModal from "@/components/modals/MenuModal";
import CartModal from "@/components/modals/CartModal";
import ConversationList from "@/components/chat/ConversationList";
import ChatInput from "@/components/chat/ChatInput";

export default function BistroScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => setMenuVisible(true)}
        >
          <Text style={styles.buttonText}>☰</Text>
        </TouchableOpacity>

        <Text style={styles.title}>
          Intelligent Bistro
        </Text>

        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => setCartVisible(true)}
        >
          <Text style={styles.buttonText}>🛒</Text>
        </TouchableOpacity>

      </View>

      <ConversationList />

      <ChatInput />

      <MenuModal
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
      />

      <CartModal
        visible={cartVisible}
        onClose={() => setCartVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.primaryText,
  },

  circleButton: {
    width: 44,
    height: 44,
    borderRadius: 22,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: COLORS.glass,

    borderWidth: 1,
    borderColor: COLORS.border,
  },

  buttonText: {
    fontSize: 18,
  },
});