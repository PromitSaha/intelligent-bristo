import React from "react";

import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
} from "react-native";

import { BlurView } from "expo-blur";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { RootState } from "@/store/store";
import { addItem, removeItem } from "@/store/slices/cartSlice";
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

  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  );

  const totalPrice = cartItems.reduce(
    (total, cartItem) => {
      return (
        total +
        cartItem.item.price *
        cartItem.quantity
      );
    },
    0
  );

  // useEffect Start Here
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
  // UseEffect End Here

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
              contentContainerStyle={{
                paddingBottom: 140,
              }}
            >

              {cartItems.length === 0 ? (

                <View style={styles.emptyContainer}>

                  <Text style={styles.emptyText}>
                    Your cart is empty
                  </Text>

                </View>

              ) : (

                cartItems.map((cartItem) => (

                  <View
                    key={cartItem.item.id}
                    style={styles.cartCard}
                  >

                    <View style={styles.itemTopRow}>

                      <Text style={styles.itemName}>
                        {cartItem.quantity}x{" "}
                        {cartItem.item.name}
                      </Text>

                    </View>

                    <Text style={styles.itemPrice}>
                      $
                      {(
                        cartItem.item.price *
                        cartItem.quantity
                      ).toFixed(2)}
                    </Text>

                    <View style={styles.quantityContainer}>

                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() =>
                          dispatch(
                            removeItem(
                              cartItem.item.id
                            )
                          )
                        }
                      >
                        <Text style={styles.quantityButtonText}>
                          −
                        </Text>
                      </TouchableOpacity>

                      <Text style={styles.quantityText}>
                        {cartItem.quantity}
                      </Text>

                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() =>
                          dispatch(
                            addItem(
                              cartItem.item
                            )
                          )
                        }
                      >
                        <Text style={styles.quantityButtonText}>
                          +
                        </Text>
                      </TouchableOpacity>

                    </View>

                  </View>

                ))

              )}
            </ScrollView>

            <View style={styles.footer}>
              <View>
                <Text style={styles.totalLabel}>
                  Total
                </Text>

                <Text style={styles.totalPrice}>
                  ${totalPrice.toFixed(2)}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.orderButton}
              >
                <Text style={styles.orderButtonText}>
                  Place Order
                </Text>
              </TouchableOpacity>
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

    justifyContent: "flex-start",
    paddingTop: 65,
  },

  modal: {
    width: "75%",
    height: "93%",
    marginLeft: "auto",
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

    paddingBottom: 140,
  },

  header: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

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

  itemText: {
    fontSize: 18,

    marginBottom: 8,

    color: COLORS.primaryText,
  },

  price: {
    fontSize: 16,

    color: COLORS.secondaryText,
  },

  emptyContainer: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",

    marginTop: 120,
  },

  emptyText: {
    fontSize: 18,

    color: COLORS.secondaryText,
  },

  cartCard: {
    backgroundColor: "rgba(255,255,255,0.18)",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",

    borderRadius: 24,

    padding: 18,

    marginBottom: 16,
  },

  itemTopRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  itemName: {
    fontSize: 18,

    fontWeight: "600",

    color: COLORS.primaryText,

    flex: 1,
  },

  itemPrice: {
    marginTop: 12,

    fontSize: 18,

    fontWeight: "700",

    color: COLORS.accent,
  },

  quantityContainer: {
    marginTop: 18,

    flexDirection: "row",

    alignItems: "center",

    gap: 12,
  },

  quantityButton: {
    width: 36,
    height: 36,

    borderRadius: 18,

    backgroundColor: "rgba(255,255,255,0.35)",

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

  footer: {
    position: "absolute",

    left: 20,
    right: 20,
    bottom: 24,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    backgroundColor: "rgba(255,255,255,0.35)",

    borderRadius: 24,

    padding: 18,
  },  

  totalLabel: {
    fontSize: 14,

    color: COLORS.secondaryText,
  },

  totalPrice: {
    marginTop: 4,

    fontSize: 24,

    fontWeight: "700",

    color: COLORS.primaryText,
  },

  orderButton: {
    backgroundColor: COLORS.accent,

    paddingHorizontal: 24,

    paddingVertical: 14,

    borderRadius: 20,
  },

  orderButtonText: {
    color: "#fff",

    fontSize: 16,

    fontWeight: "600",
  },
});