import { AddCategory } from "@/components/modals";
import { Color, ModalCategory, Size } from "@/constants";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";

const modal = () => {
  const router = useRouter();
  const { type } = useLocalSearchParams<{ type: ModalCategory }>();

  return (
    <>
      <TouchableWithoutFeedback onPress={() => router.back()}>
        <View style={[styles.overlay, StyleSheet.absoluteFill]} />
      </TouchableWithoutFeedback>
      <View style={styles.container}>
        {type === ModalCategory.ADD_CATEGORY && <AddCategory />}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: Color.black,
    opacity: 0.5,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: Size.padding,
  },
});

export default modal;
