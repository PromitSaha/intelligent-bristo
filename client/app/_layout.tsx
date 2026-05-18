import 'react-native-reanimated';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from "react-redux";

import { store } from "@/store/store";
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(bristo)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

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
      </ThemeProvider>
    </Provider>
  );
}
