import React, { useRef, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Keyboard,
  TouchableOpacity,
} from "react-native";

import { ChatMessage } from "@/api/types/chat";
import { MenuItem } from "@/api/types/menu";
import { COLORS } from "@/constants/colors";

interface Props {
  messages: ChatMessage[];
  loading: boolean;
  menu: MenuItem[];
  onSuggestionPress: (
    item: MenuItem
  ) => void;
}

export default function ConversationList({
  messages,
  loading,
  menu,
  onSuggestionPress,
}: Props) {

  const scrollViewRef = useRef<ScrollView>(null);

  const getSuggestedItems = (
    message: ChatMessage
  ) => {
    if (
      message.role !== "assistant" ||
      !message.suggestedItems?.length
    ) {
      return [];
    }

    return message.suggestedItems
      .map((suggestedItem) =>
        menu.find(
          (item) =>
            item.id === suggestedItem.itemId
        )
      )
      .filter((item): item is MenuItem =>
        Boolean(item)
      );
  };

  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current
        ?.scrollToEnd({
          animated: true,
        });
    }, 100);
  }, [messages, loading]);

  useEffect(() => {
    const keyboardListener =
      Keyboard.addListener(
        "keyboardDidShow",
        () => {
          setTimeout(() => {
            scrollViewRef.current
              ?.scrollToEnd({
                animated: true,
              });
          }, 100);
        }
      );

    return () => {
      keyboardListener.remove();
    };
  }, []);

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {messages.map((message) => {
        const suggestedItems =
          getSuggestedItems(message);

        return (
          <View
            key={message.id}
            style={[
              styles.messageWrapper,
              message.role === "user"
                ? styles.userWrapper
                : styles.assistantWrapper,
            ]}
          >
            <View
              style={[
                styles.bubble,
                message.role === "user"
                  ? styles.userBubble
                  : styles.assistantBubble,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  message.role === "user"
                    ? styles.userText
                    : styles.assistantText,
                ]}
              >
                {message.content}
              </Text>
            </View>

            {suggestedItems.length > 0 && (
              <View style={styles.suggestions}>
                {suggestedItems.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.suggestionButton}
                    onPress={() =>
                      onSuggestionPress(item)
                    }
                  >
                    <Text style={styles.suggestionText}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        );
      })}
      {loading && (
        <View
          style={styles.assistantWrapper}
        >
          <View
            style={[
              styles.bubble,
              styles.assistantBubble,
            ]}
          >
            <Text style={styles.typing}>
              ...
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 20,
    paddingBottom: 140,
    gap: 18,
  },

  messageWrapper: {
    width: "100%",
  },

  assistantWrapper: {
    alignItems: "flex-start",
  },

  userWrapper: {
    alignItems: "flex-end",
  },

  bubble: {
    maxWidth: "78%",
    borderRadius: 28,
    paddingHorizontal: 18,
    paddingVertical: 16,
  },

  assistantBubble: {
    backgroundColor:
      "rgba(255,255,255,0.45)",
  },

  userBubble: {
    backgroundColor: "#ff8c1a",
  },

  messageText: {
    fontSize: 18,
    lineHeight: 28,
  },

  assistantText: {
    color: "#1a1a1a",
  },

  userText: {
    color: "#ffffff",
  },

  typing: {
    fontSize: 28,
    color: "#666",
    letterSpacing: 4,
  },

  suggestions: {
    marginTop: 10,
    maxWidth: "88%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  suggestionButton: {
    backgroundColor: COLORS.accent,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },

  suggestionText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
});
