import { Color, Size } from "@/constants";
import { useUiStore } from "@/store";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Label } from "../ui";

const Toast = () => {
  const { showToast, toast } = useUiStore();

  useEffect(() => {
    setTimeout(() => {
      showToast(null);
    }, 5000);
  }, []);

  const getMessage = (errorCode: string): string => {
    switch (errorCode) {
      case "auth/invalid-email":
        return "The email address is invalid.";
      case "auth/invalid-credential":
        return "The provided credential in invalid.";
      default:
        return errorCode;
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            toast?.variant === "success" ? Color.green : Color.red,
        },
      ]}
    >
      <Label style={{ color: Color.white }}>
        {getMessage(toast?.message || "")}
      </Label>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 2 * Size.padding,
    left: Size.padding,
    right: Size.padding,
    padding: Size.padding,
    borderRadius: Size.borderRadius,
  },
});

export default Toast;
