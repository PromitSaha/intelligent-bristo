import React from "react";

import {
  Animated,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { COLORS } from "@/constants/colors";

interface Props {
  onFinish: () => void;
}

export default function SplashScreen({
  onFinish,
}: Props) {
  const fadeAnim =
    React.useRef(new Animated.Value(0)).current;

  const scaleAnim =
    React.useRef(new Animated.Value(0.92)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 7,
        tension: 55,
        useNativeDriver: true,
      }),
    ]).start();

    const timeoutId =
      setTimeout(onFinish, 2500);

    return () => clearTimeout(timeoutId);
  }, [fadeAnim, onFinish, scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [
              {
                scale: scaleAnim,
              },
            ],
          },
        ]}
      >
        <View style={styles.mark}>
          <Text style={styles.markText}>
            IB
          </Text>
        </View>

        <Text style={styles.title}>
          Intelligent Bistro
        </Text>

        <Text style={styles.subtitle}>
          Your AI restaurant manager
        </Text>

        <View style={styles.loadingTrack}>
          <Animated.View
            style={[
              styles.loadingFill,
              {
                opacity: fadeAnim,
              },
            ]}
          />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,

    zIndex: 20,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: COLORS.background,
  },

  content: {
    alignItems: "center",

    paddingHorizontal: 32,
  },

  mark: {
    width: 92,
    height: 92,

    borderRadius: 46,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: COLORS.accent,

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 10,
    },
  },

  markText: {
    color: "#fff",

    fontSize: 30,

    fontWeight: "800",
  },

  title: {
    marginTop: 24,

    color: COLORS.primaryText,

    fontSize: 30,

    fontWeight: "800",
  },

  subtitle: {
    marginTop: 8,

    color: COLORS.secondaryText,

    fontSize: 16,

    fontWeight: "600",
  },

  loadingTrack: {
    marginTop: 34,

    width: 150,
    height: 6,

    borderRadius: 3,

    overflow: "hidden",

    backgroundColor: "rgba(0,0,0,0.08)",
  },

  loadingFill: {
    width: "72%",
    height: "100%",

    borderRadius: 3,

    backgroundColor: "#1F7A6B",
  },
});
