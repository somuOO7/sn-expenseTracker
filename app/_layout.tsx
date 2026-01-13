import { Toast } from "@/components/alert";
import { Loader } from "@/components/ui";
import { auth } from "@/config/firebaseConfig";
import { SecureStoreKey } from "@/constants";
import { useAuthStore, useUiStore } from "@/store";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();
  const { showLoader, toast } = useUiStore();

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
    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is authenticated
        await SecureStore.setItemAsync(SecureStoreKey.userId, user.uid);
        setIsAuthenticated(true);
      } else {
        // User is not authenticated
        await SecureStore.deleteItemAsync(SecureStoreKey.userId);
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
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
    <>
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

      {showLoader && <Loader />}
      {toast?.visible && <Toast />}
    </>
  );
}
