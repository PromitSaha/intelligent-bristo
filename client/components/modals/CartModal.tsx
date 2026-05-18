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
  Alert,
} from "react-native";

import { BlurView } from "expo-blur";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { RootState } from "@/store/store";
import { addItem, clearCart, removeItem } from "@/store/slices/cartSlice";
import { COLORS } from "@/constants/colors";
import { useOrderApi } from "@/api/hooks/useOrderApi";
import { OrderResponse } from "@/api/types/order";

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
  const {
    loading,
    placeOrder,
  } = useOrderApi();

  const [
    confirmedOrder,
    setConfirmedOrder,
  ] = React.useState<OrderResponse | null>(null);

  const [
    currentTime,
    setCurrentTime,
  ] = React.useState(Date.now());

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

  const totalKitchenSeconds =
    confirmedOrder
      ? confirmedOrder.estimatedKitchenTime * 60
      : 0;

  const elapsedSeconds =
    confirmedOrder
      ? Math.max(
          0,
          Math.floor(
            (
              currentTime -
              new Date(confirmedOrder.createdAt).getTime()
            ) / 1000
          )
        )
      : 0;

  const remainingSeconds =
    confirmedOrder
      ? Math.max(
          totalKitchenSeconds - elapsedSeconds,
          0
        )
      : 0;

  const remainingMinutes =
    Math.ceil(remainingSeconds / 60);

  const progress =
    totalKitchenSeconds > 0
      ? Math.min(
          elapsedSeconds / totalKitchenSeconds,
          1
        )
      : 0;

  const handlePlaceOrder =
    async () => {
      if (cartItems.length === 0) {
        Alert.alert(
          "Cart is empty",
          "Add something delicious before placing your order."
        );

        return;
      }

      try {
        const order =
          await placeOrder(cartItems);

        setConfirmedOrder(order);
        dispatch(clearCart());
      } catch {
        Alert.alert(
          "Order failed",
          "We could not place your order. Please try again."
        );
      }
    };

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
  }, [visible, screenWidth, slideAnim]);

  React.useEffect(() => {
    if (!confirmedOrder) return;

    setCurrentTime(Date.now());

    const intervalId =
      setInterval(() => {
        setCurrentTime(Date.now());
      }, 1000);

    return () => clearInterval(intervalId);
  }, [confirmedOrder]);

  React.useEffect(() => {
    if (
      confirmedOrder &&
      cartItems.length > 0
    ) {
      setConfirmedOrder(null);
    }
  }, [cartItems.length, confirmedOrder]);
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
                {confirmedOrder
                  ? "Order Status"
                  : "Cart"}
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

              {confirmedOrder ? (

                <View style={styles.orderStatusCard}>
                  <Text style={styles.confirmationKicker}>
                    Order confirmed
                  </Text>

                  <Text style={styles.confirmationTitle}>
                    Your kitchen ticket is in.
                  </Text>

                  <View style={styles.orderMetaRow}>
                    <Text style={styles.orderMetaLabel}>
                      Order
                    </Text>

                    <Text style={styles.orderMetaValue}>
                      {confirmedOrder.orderId}
                    </Text>
                  </View>

                  <View style={styles.progressHeader}>
                    <Text style={styles.progressLabel}>
                      Remaining time
                    </Text>

                    <Text style={styles.progressTime}>
                      {remainingSeconds === 0
                        ? "Ready"
                        : `${remainingMinutes} min`}
                    </Text>
                  </View>

                  <View style={styles.progressTrack}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${progress * 100}%`,
                        },
                      ]}
                    />
                  </View>

                  <Text style={styles.progressHint}>
                    Estimated kitchen time:{" "}
                    {confirmedOrder.estimatedKitchenTime} mins
                  </Text>

                  <View style={styles.orderItems}>
                    {confirmedOrder.items.map((cartItem) => (
                      <View
                        key={cartItem.item.id}
                        style={styles.confirmedItemRow}
                      >
                        <Text style={styles.confirmedItemName}>
                          {cartItem.quantity}x{" "}
                          {cartItem.item.name}
                        </Text>

                        <Text style={styles.confirmedItemPrice}>
                          ${cartItem.lineTotal.toFixed(2)}
                        </Text>
                      </View>
                    ))}
                  </View>

                  <View style={styles.confirmedTotalRow}>
                    <Text style={styles.confirmedTotalLabel}>
                      Total
                    </Text>

                    <Text style={styles.confirmedTotalPrice}>
                      ${confirmedOrder.subtotal.toFixed(2)}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.newOrderButton}
                    onPress={() => setConfirmedOrder(null)}
                  >
                    <Text style={styles.newOrderButtonText}>
                      Start New Order
                    </Text>
                  </TouchableOpacity>
                </View>

              ) : cartItems.length === 0 ? (

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
                              {itemId: cartItem.item.id, quantity: 1}
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
                              {item: cartItem.item, quantity: 1}
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

            {!confirmedOrder && (
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
                style={[
                  styles.orderButton,
                  (
                    loading ||
                    cartItems.length === 0
                  ) &&
                    styles.orderButtonDisabled,
                ]}
                onPress={handlePlaceOrder}
                disabled={
                  loading ||
                  cartItems.length === 0
                }
              >
                <Text style={styles.orderButtonText}>
                  {loading
                    ? "Placing..."
                    : "Place Order"}
                </Text>
              </TouchableOpacity>
            </View>
            )}
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

  orderStatusCard: {
    backgroundColor: "rgba(255,255,255,0.22)",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",

    borderRadius: 24,

    padding: 20,
  },

  confirmationKicker: {
    fontSize: 13,

    fontWeight: "700",

    textTransform: "uppercase",

    color: COLORS.accent,
  },

  confirmationTitle: {
    marginTop: 8,

    fontSize: 24,

    fontWeight: "700",

    color: COLORS.primaryText,
  },

  orderMetaRow: {
    marginTop: 22,

    paddingBottom: 18,

    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.35)",
  },

  orderMetaLabel: {
    fontSize: 14,

    color: COLORS.secondaryText,
  },

  orderMetaValue: {
    marginTop: 6,

    fontSize: 22,

    fontWeight: "700",

    color: COLORS.primaryText,
  },

  progressHeader: {
    marginTop: 20,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  progressLabel: {
    fontSize: 15,

    color: COLORS.secondaryText,
  },

  progressTime: {
    fontSize: 18,

    fontWeight: "700",

    color: COLORS.primaryText,
  },

  progressTrack: {
    marginTop: 12,

    height: 12,

    borderRadius: 6,

    backgroundColor: "rgba(255,255,255,0.4)",

    overflow: "hidden",
  },

  progressFill: {
    height: "100%",

    borderRadius: 6,

    backgroundColor: COLORS.accent,
  },

  progressHint: {
    marginTop: 10,

    fontSize: 13,

    color: COLORS.secondaryText,
  },

  orderItems: {
    marginTop: 24,
  },

  confirmedItemRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    gap: 12,

    paddingVertical: 12,

    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.28)",
  },

  confirmedItemName: {
    flex: 1,

    fontSize: 16,

    fontWeight: "600",

    color: COLORS.primaryText,
  },

  confirmedItemPrice: {
    fontSize: 16,

    fontWeight: "700",

    color: COLORS.accent,
  },

  confirmedTotalRow: {
    marginTop: 18,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  confirmedTotalLabel: {
    fontSize: 16,

    color: COLORS.secondaryText,
  },

  confirmedTotalPrice: {
    fontSize: 22,

    fontWeight: "700",

    color: COLORS.primaryText,
  },

  newOrderButton: {
    marginTop: 24,

    alignItems: "center",

    backgroundColor: COLORS.accent,

    paddingVertical: 14,

    borderRadius: 20,
  },

  newOrderButtonText: {
    color: "#fff",

    fontSize: 16,

    fontWeight: "700",
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

  orderButtonDisabled: {
    opacity: 0.55,
  },

  orderButtonText: {
    color: "#fff",

    fontSize: 16,

    fontWeight: "600",
  },
});
