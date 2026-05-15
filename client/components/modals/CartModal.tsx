import React from "react";

import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";

import { BlurView } from "expo-blur";

import { COLORS } from "@/constants/colors";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function CartModal({
  visible,
  onClose,
}: Props) {

  const screenWidth =
    Dimensions.get("window").width;

  const slideAnim =
    React.useRef(
      new Animated.Value(screenWidth)
    ).current;

  React.useEffect(() => {

    if (visible) {

      slideAnim.setValue(screenWidth);

      Animated.spring(slideAnim, {
        toValue: 0,

        friction: 8,
        tension: 70,

        useNativeDriver: true,
      }).start();

    } else {

      Animated.timing(slideAnim, {
        toValue: screenWidth,

        duration: 220,

        useNativeDriver: true,
      }).start();
    }

  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
    >
      <View style={styles.overlay}>

        <Animated.View
          style={{
            transform: [
              { translateX: slideAnim }
            ],
          }}
        >
          <BlurView
            intensity={40}
            tint="light"
            style={styles.modal}
          >
            <View style={styles.header}>
              <Text style={styles.title}>
                Cart
              </Text>

              <TouchableOpacity onPress={onClose}>
                <Text style={styles.close}>
                  ✕
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.cartCard}>
              <Text style={styles.itemText}>
                2x Spicy Burger
              </Text>

              <Text style={styles.price}>
                $24.99
              </Text>
            </View>
          </BlurView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,

    backgroundColor: "rgba(0,0,0,0.12)",

    justifyContent: "center",
    alignItems: "flex-end",
  },

  modal: {
    width: "80%",
    height: "90%",

    padding: 20,

    borderTopLeftRadius: 32,
    borderBottomLeftRadius: 32,

    overflow: "hidden",

    backgroundColor: "rgba(255,255,255,0.12)",

    borderWidth: 1,

    borderColor: "rgba(255,255,255,0.25)",

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 8,
    },

    shadowOpacity: 0.12,

    shadowRadius: 24,

    elevation: 20,
  },

  header: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 24,
  },

  title: {
    fontSize: 24,

    fontWeight: "600",

    color: COLORS.primaryText,
  },

  close: {
    fontSize: 20,

    color: COLORS.primaryText,
  },

  cartCard: {
    padding: 18,

    borderRadius: 20,

    backgroundColor: "rgba(255,255,255,0.18)",

    borderWidth: 1,

    borderColor: "rgba(255,255,255,0.2)",
  },

  itemText: {
    fontSize: 18,

    marginBottom: 8,

    color: COLORS.primaryText,
  },

  price: {
    fontSize: 16,

    color: COLORS.secondaryText,
  },
});