import { Button, Input, Label, SafeAreaContainer } from "@/components/ui";
import { auth } from "@/config/firebaseConfig";
import { Color, CommonStyles, Icon, SecureStoreKey, Size } from "@/constants";
import { useAuthStore, useUiStore } from "@/store";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const login = () => {
  const { setShowLoader, showToast } = useUiStore();
  const router = useRouter();

  const { setIsAuthenticated } = useAuthStore();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    if (!!formData.email && !!formData.password) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [formData]);

  const handleLogin = async () => {
    setShowLoader(true);
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then(async (userCredential) => {
        console.log("User signed in:", JSON.stringify(userCredential));

        await SecureStore.setItemAsync(
          SecureStoreKey.userId,
          userCredential.user.uid
        );
        setIsAuthenticated(true);
      })
      .catch((error) => {
        showToast({ visible: true, message: error.code, variant: "failure" });
      })
      .finally(() => {
        setShowLoader(false);
      });
  };

  return (
    <SafeAreaContainer style={{ flex: 1, gap: Size.padding }}>
      <View>
        <Label variant="bold" style={CommonStyles.pageTitle}>
          Welcome back!
        </Label>

        <Label style={CommonStyles.subtitleText}>
          Continue tracking your funds seamlessly.
        </Label>
      </View>

      {/* Login form section */}
      <Input
        placeholder="Enter your email"
        title="Email"
        variant="small"
        prefixIcon={<Image source={Icon.mail} style={styles.icon} />}
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        keyboardType="email-address"
      />
      <Input
        placeholder="Enter your password"
        title="Password"
        variant="small"
        prefixIcon={<Image source={Icon.lock} style={styles.icon} />}
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        secureTextEntry
      />
      <Button
        title="Login"
        variant="primary"
        disabled={isSubmitDisabled}
        onPress={handleLogin}
      />

      {/* Signup Section */}
      <View style={styles.signUpContainer}>
        <Label style={{ color: Color.gray }}>Don't have an account?</Label>
        <TouchableOpacity>
          <Label variant="medium" style={{ color: Color.secondary }}>
            Create an account
          </Label>
        </TouchableOpacity>
      </View>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  icon: { width: Size.iconSize, height: Size.iconSize, tintColor: Color.white },
  signUpContainer: {
    flexDirection: "row",
    gap: Size.padding / 2,
    justifyContent: "center",
    position: "absolute",
    bottom: Size.padding * 2,
    left: 0,
    right: 0,
  },
});

export default login;
