import { SecureStoreKey } from "@/constants";
import { useAuthStore } from "@/store";

import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();
  const router = useRouter();
  const segments = useSegments();

  // Font loading
  const [fontLoaded, fontError] = useFonts({
    ExtraLight: require("@/assets/fonts/Poppins-ExtraLight.ttf"),
    Light: require("@/assets/fonts/Poppins-Light.ttf"),
    Regular: require("@/assets/fonts/Poppins-Regular.ttf"),
    Medium: require("@/assets/fonts/Poppins-Medium.ttf"),
    SemiBold: require("@/assets/fonts/Poppins-SemiBold.ttf"),
    Bold: require("@/assets/fonts/Poppins-Bold.ttf"),
    ExtraBold: require("@/assets/fonts/Poppins-ExtraBold.ttf"),
  });

  // Check for userId in secure store on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userId = await SecureStore.getItemAsync(SecureStoreKey.userId);
        setIsAuthenticated(!!userId);
      } catch (error) {
        console.error("Error checking auth:", error);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  // Handle navigation based on auth state
  useEffect(() => {
    if (isAuthenticated === null || !fontLoaded) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (isAuthenticated && inAuthGroup) {
      router.replace("/(dashboard)");
    }
  }, [isAuthenticated, segments, fontLoaded]);

  // Check font loading and hide splash screen
  useEffect(() => {
    if (fontLoaded || fontError) {
      if (isAuthenticated !== null) {
        SplashScreen.hideAsync();
      }
    }
  }, [fontLoaded, fontError, isAuthenticated]);
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="modal"
        options={{
          presentation: "transparentModal",
          animation: "fade",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
