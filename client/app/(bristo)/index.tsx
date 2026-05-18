import { useEffect, useState } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import MenuModal from "@/components/modals/MenuModal";
import CartModal from "@/components/modals/CartModal";
import ConversationList from "@/components/chat/ConversationList";
import ChatInput from "@/components/chat/ChatInput";

import { COLORS } from "@/constants/colors";
import { ChatMessage } from "@/api/types/chat";
import { initialConversation } from "@/data/initialConversation";
import { useChatApi } from "@/api/hooks/useChatApi";
import { processChatActions } from "@/utils/processChatActions";
import { useMenuApi } from "@/api/hooks/useMenuApi";
import { RootState } from "@/store/store";
import { MenuItem } from "@/api/types/menu";
import { addItem } from "@/store/slices/cartSlice";

export default function BistroScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(initialConversation);

  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  
  const { loading, sendMessage } = useChatApi();
  const { menu, getMenu } = useMenuApi();

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    const currentInput = input;
    setInput("");

    try {
      const recentMessages = messages.slice(-10);
      const response = await sendMessage(currentInput, cart, recentMessages);

      processChatActions(
        response.actions,
        dispatch,
        menu
      );

      const assistantMessage:
      ChatMessage = {
        id: `${Date.now()}_assistant`,
        role: "assistant",
        content: response.reply,
        suggestedItems:
          response.suggestedItems || [],
      };

      setMessages((prev) => [
        ...prev,
        assistantMessage,
      ]);
    } catch {
      const errorMessage:
      ChatMessage = {
        id: `${Date.now()}_error`,
        role: "assistant",
        content:
          "Something went wrong.",
      };

      setMessages((prev) => [
        ...prev,
        errorMessage,
      ]);
    }
  };

  const handleSuggestionPress = (
    item: MenuItem
  ) => {
    dispatch(
      addItem({
        item,
        quantity: 1,
      })
    );

    setCartVisible(true);
  };

  useEffect(() => {
    getMenu();
  }, [getMenu]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}

      behavior={
        Platform.OS === "ios"
          ? "padding"
          : "height"
    }>
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

        <ConversationList
          messages={messages}
          loading={loading}
          menu={menu}
          onSuggestionPress={handleSuggestionPress}
        />

        <ChatInput
          value={input}

          onChangeText={setInput}

          onSend={handleSend}

          disabled={loading}
        />

        <MenuModal
          visible={menuVisible}
          onClose={() => setMenuVisible(false)}
        />

        <CartModal
          visible={cartVisible}
          onClose={() => setCartVisible(false)}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
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
