import 'react-native-reanimated';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from "react";
import { Provider } from "react-redux";

import SplashScreen from "@/components/SplashScreen";
import { store } from "@/store/store";
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(bristo)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [
    splashVisible,
    setSplashVisible,
  ] = useState(true);

  const handleSplashFinish =
    useCallback(() => {
      setSplashVisible(false);
    }, []);

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
          }}
        >
          <Stack.Screen name="(bristo)" />
        </Stack>
        <StatusBar style="auto" />
        {splashVisible && (
          <SplashScreen onFinish={handleSplashFinish} />
        )}
      </ThemeProvider>
    </Provider>
  );
}
