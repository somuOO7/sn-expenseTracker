import Color from "@/constants/Color";
import CommonStyles from "@/constants/CommonStyles";
import Size from "@/constants/Size";
import React, { useState } from "react";
import { StyleSheet, TextInput, View, ViewStyle } from "react-native";
import Label from "./Label";

interface InputProps {
  title: string;
  placeholder: string;
  prefixIcon?: React.ReactNode | string;
  variant: "large" | "small";
  style?: ViewStyle;
}

const Input = (props: InputProps) => {
  const [amount, setAmount] = useState("");

  return (
    <View style={props.style}>
      <Label variant="semibold" style={styles.title}>
        {props.title}
      </Label>
      <View
        style={[
          props.variant === "large"
            ? styles.largeInputContainer
            : styles.smallInputContainer,
          CommonStyles.shadowStyle,
        ]}
      >
        {props.prefixIcon &&
          (typeof props.prefixIcon === "string" ? (
            <Label
              variant="medium"
              style={
                props.variant === "large"
                  ? styles.largePrefixText
                  : styles.smallPrefixText
              }
            >
              {props.prefixIcon}
            </Label>
          ) : (
            props.prefixIcon
          ))}
        <TextInput
          placeholder={props.placeholder}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholderTextColor={
            props.variant === "small" ? Color.white : Color.gray
          }
          style={[
            props.variant === "large" ? styles.largeInput : styles.smallInput,
            props.variant === "large" && {
              width: Math.max(100, amount.length * 20 + 30),
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: Color.secondary,
  },
  largeInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    backgroundColor: Color.white,
    borderRadius: 12,
  },
  largePrefixText: {
    color: Color.secondary,
    fontSize: 30,
  },
  largeInput: {
    fontSize: 30,
    color: Color.primary,
    fontFamily: "Bold",
    paddingHorizontal: Size.padding,
    minWidth: 100,
    maxWidth: 200,
  },
  smallInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.gray,
    height: 26,
    borderRadius: 13,
    paddingHorizontal: Size.padding / 2,
    gap: Size.padding / 2,
  },
  smallPrefixText: { color: Color.white },
  smallInput: { color: Color.white },
});

export default Input;
