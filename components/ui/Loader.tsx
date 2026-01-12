import { Color } from "@/constants";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export const Loader = () => {
  return (
    <View style={style.container}>
      <ActivityIndicator size="large" color={Color.white} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
