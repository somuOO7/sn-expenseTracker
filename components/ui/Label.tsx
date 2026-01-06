import React from "react";
import { Text, TextProps } from "react-native";

interface LabelProps extends TextProps {
  variant?:
    | "extralight"
    | "light"
    | "regular"
    | "medium"
    | "semibold"
    | "bold"
    | "extrabold";
}

const Label = (props: LabelProps) => {
  const getFontFamily = () => {
    switch (props.variant) {
      case "extralight":
        return "ExtraLight";
      case "light":
        return "Light";
      case "regular":
        return "Regular";
      case "medium":
        return "Medium";
      case "semibold":
        return "SemiBold";
      case "bold":
        return "Bold";
      case "extrabold":
        return "ExtraBold";
      default:
        return "Regular";
    }
  };

  return (
    <Text {...props} style={[{ fontFamily: getFontFamily() }, props.style]}>
      {props.children}
    </Text>
  );
};

export default Label;
