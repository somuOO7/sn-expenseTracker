import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
  // Check font loading and hide splash screen
  useEffect(() => {
    if (fontLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded, fontError]);
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="modal"
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
