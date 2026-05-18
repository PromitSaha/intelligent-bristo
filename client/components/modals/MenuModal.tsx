import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BlurView } from "expo-blur";

import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from "react-native";


import { COLORS } from "@/constants/colors";
import { useMenuApi } from "@/api/hooks/useMenuApi";
import { RootState } from "@/store/store";
import { addItem, removeItem } from "@/store/slices/cartSlice";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function MenuModal({
  visible,
  onClose,
}: Props) {
  const {
    menu,
    getMenu,
  } = useMenuApi();

  const screenWidth =
    Dimensions.get("window").width;

  const slideAnim =
    React.useRef(
      new Animated.Value(-screenWidth)
    ).current;

  const dispatch = useDispatch();
  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  );

  const getItemQuantity = (itemId: string) => {
    const cartItem = cartItems.find(
      (item) => item.item.id === itemId
    );

    return cartItem ? cartItem.quantity : 0;
  };

  // UseEffects Start Here
  React.useEffect(() => {
    if (visible) {
      slideAnim.setValue(-screenWidth);
      Animated.spring(slideAnim, {
        toValue: 0,

        friction: 7,
        tension: 60,

        useNativeDriver: true,
      }).start();
    } else {

      Animated.timing(slideAnim, {
        toValue: -screenWidth,

        duration: 220,

        useNativeDriver: true,
      }).start();
    }
  }, [visible, screenWidth, slideAnim]);

  React.useEffect(() => {
    if (visible) {
      getMenu();
    }
  }, [visible, getMenu]);
  // UseEffects end Here

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
                Menu
              </Text>

              <TouchableOpacity
                onPress={onClose}
                style={styles.closeButton}
              >
                <Text style={styles.closeText}>
                  ✕
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
            >
              {menu.map((item) => (
                <View
                  key={item.id}
                  style={styles.itemCard}
                >
                  <Text style={styles.itemTitle}>
                    {item.name}
                  </Text>

                  <Text style={styles.itemDescription}>
                    {item.shortDetails}
                  </Text>

                  <Text style={styles.itemMeta}>
                    🌶 {item.spiceLevel}
                  </Text>

                  <Text style={styles.itemMeta}>
                    ⏱ {item.preparationTime}
                  </Text>

                  <View style={styles.bottomRow}>
                    <Text style={styles.itemPrice}>
                      ${item.price.toFixed(2)}
                    </Text>

                    {getItemQuantity(item.id) === 0 ? (

                      <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => dispatch(addItem({item, quantity: 1}))}
                      >
                        <Text style={styles.addButtonText}>
                          Add
                        </Text>
                      </TouchableOpacity>

                    ) : (

                      <View style={styles.quantityContainer}>

                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() => dispatch(removeItem({itemId: item.id, quantity: 1}))}
                        >
                          <Text style={styles.quantityButtonText}>
                            −
                          </Text>
                        </TouchableOpacity>

                        <Text style={styles.quantityText}>
                          {getItemQuantity(item.id)}
                        </Text>

                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() => dispatch(addItem({item, quantity: 1}))}
                        >
                          <Text style={styles.quantityButtonText}>
                            +
                          </Text>
                        </TouchableOpacity>

                      </View>
                    )}
                    </View>
                </View>
              ))}
            </ScrollView>
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

    justifyContent: "flex-start",
    paddingTop: 65,
  },

  modal: {
    width: "97%",
    height: "93%",

    padding: 20,

    borderRadius: 32,

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
    position: "relative",

    alignItems: "center",

    justifyContent: "center",

    marginBottom: 24,
  },

  closeButton: {
    position: "absolute",

    right: 0,

    width: 48,
    height: 48,

    borderRadius: 24,

    justifyContent: "center",
    alignItems: "center",
  },

  closeText: {
    fontSize: 28,

    color: COLORS.primaryText,
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

  itemCard: {
    padding: 18,

    borderRadius: 20,

    marginBottom: 16,

    backgroundColor: "rgba(255,255,255,0.18)",

    borderWidth: 1,

    borderColor: "rgba(255,255,255,0.2)",
  },

  itemText: {
    fontSize: 18,

    color: COLORS.primaryText,
  },

  itemTitle: {
    fontSize: 20,

    fontWeight: "600",

    color: COLORS.primaryText,

    marginBottom: 8,
  },

  itemDescription: {
    fontSize: 14,

    lineHeight: 22,

    color: COLORS.secondaryText,

    marginBottom: 14,
  },

  itemMeta: {
    fontSize: 13,

    color: COLORS.secondaryText,

    marginBottom: 6,
  },

  itemPrice: {
    marginTop: 12,

    fontSize: 20,

    fontWeight: "700",

    color: COLORS.accent,
  },

  bottomRow: {
    marginTop: 20,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  quantityContainer: {
    flexDirection: "row",

    alignItems: "center",

    gap: 12,
  },

  quantityButton: {
    width: 36,
    height: 36,

    borderRadius: 18,

    backgroundColor: "rgba(255,255,255,0.2)",

    justifyContent: "center",
    alignItems: "center",
  },

  quantityButtonText: {
    fontSize: 22,

    fontWeight: "600",

    color: COLORS.primaryText,
  },

  quantityText: {
    fontSize: 18,

    fontWeight: "600",

    color: COLORS.primaryText,

    minWidth: 24,

    textAlign: "center",
  },

  addButton: {
    backgroundColor: "rgba(255,255,255,0.35)",

    paddingHorizontal: 18,

    paddingVertical: 10,

    borderRadius: 20,

    justifyContent: "center",

    alignItems: "center",
  },

  addButtonText: {
    color: COLORS.primaryText,
    fontSize: 16,

    fontWeight: "600",
  },
});
