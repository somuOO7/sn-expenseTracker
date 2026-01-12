import { Color, CommonStyles, Size } from "@/constants";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import Label from "./Label";

interface InputProps extends TextInputProps {
  title: string;
  placeholder: string;
  prefixIcon?: React.ReactNode | string;
  variant: "large" | "small";
  containerStyle?: ViewStyle;
}

const Input = (props: InputProps) => {
  return (
    <View style={props.containerStyle}>
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
          {...props}
          placeholder={props.placeholder}
          placeholderTextColor={
            props.variant === "small" ? Color.white : Color.gray
          }
          style={[
            props.variant === "large" ? styles.largeInput : styles.smallInput,
            props.variant === "large" &&
              props.value && {
                width: Math.max(100, props.value.length * 20 + 30),
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
    borderRadius: Size.borderRadius,
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
    borderRadius: 13,
    padding: Size.padding,
    gap: Size.padding / 2,
  },
  smallPrefixText: { color: Color.white },
  smallInput: { color: Color.white, fontSize: Size.fontSize, flex: 1 },
});

export default Input;
