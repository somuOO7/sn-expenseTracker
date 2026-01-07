import { Color, CommonStyles } from "@/constants";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import Label from "./Label";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

const Button = (props: ButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.container,
        props.style,
        { backgroundColor: props.disabled ? Color.gray : Color.primary },
        CommonStyles.shadowStyle,
      ]}
    >
      <Label variant="semibold" style={styles.title}>
        {props.title}
      </Label>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { height: 48, justifyContent: "center", borderRadius: 24 },
  title: {
    color: Color.white,
    textAlign: "center",
  },
});

export default Button;
