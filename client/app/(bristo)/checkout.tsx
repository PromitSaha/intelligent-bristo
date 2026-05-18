import { useMemo } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import {
  router,
  useLocalSearchParams,
} from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "@/constants/colors";
import { OrderResponse } from "@/api/types/order";

export default function CheckoutScreen() {
  const {
    order,
  } = useLocalSearchParams<{
    order?: string;
  }>();

  const orderDetails =
    useMemo<OrderResponse | null>(() => {
      if (!order) return null;

      try {
        return JSON.parse(order);
      } catch {
        return null;
      }
    }, [order]);

  if (!orderDetails) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.title}>
            No order found
          </Text>

          <Text style={styles.subtitle}>
            Your order details are not available.
          </Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.replace("/")}
          >
            <Text style={styles.primaryButtonText}>
              Back to Bistro
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.kicker}>
          Order confirmed
        </Text>

        <Text style={styles.title}>
          Thank you for dining with us.
        </Text>

        <View style={styles.summaryCard}>
          <View>
            <Text style={styles.label}>
              Order
            </Text>

            <Text style={styles.orderId}>
              {orderDetails.orderId}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              Kitchen time
            </Text>

            <Text style={styles.summaryValue}>
              {orderDetails.estimatedKitchenTime} mins
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              Total
            </Text>

            <Text style={styles.summaryValue}>
              ${orderDetails.subtotal.toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Items
          </Text>

          {orderDetails.items.map((cartItem) => (
            <View
              key={cartItem.item.id}
              style={styles.itemRow}
            >
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>
                  {cartItem.quantity}x {cartItem.item.name}
                </Text>

                <Text style={styles.itemDetails}>
                  {cartItem.item.shortDetails}
                </Text>
              </View>

              <Text style={styles.itemPrice}>
                ${cartItem.lineTotal.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.primaryButtonText}>
            Start New Order
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: 24,
    paddingBottom: 40,
  },

  centerContent: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },

  kicker: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.accent,
    textTransform: "uppercase",
  },

  title: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: "700",
    color: COLORS.primaryText,
  },

  subtitle: {
    marginTop: 12,
    fontSize: 16,
    lineHeight: 22,
    color: COLORS.secondaryText,
  },

  summaryCard: {
    marginTop: 28,
    padding: 20,
    borderRadius: 24,
    backgroundColor: COLORS.glass,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  label: {
    fontSize: 14,
    color: COLORS.secondaryText,
  },

  orderId: {
    marginTop: 6,
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.primaryText,
  },

  divider: {
    height: 1,
    marginVertical: 18,
    backgroundColor: COLORS.border,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  summaryLabel: {
    fontSize: 16,
    color: COLORS.secondaryText,
  },

  summaryValue: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.primaryText,
  },

  section: {
    marginTop: 30,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.primaryText,
  },

  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  itemInfo: {
    flex: 1,
  },

  itemName: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.primaryText,
  },

  itemDetails: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.secondaryText,
  },

  itemPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.accent,
  },

  primaryButton: {
    marginTop: 32,
    alignItems: "center",
    backgroundColor: COLORS.accent,
    paddingVertical: 16,
    borderRadius: 20,
  },

  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
