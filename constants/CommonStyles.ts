import { StyleSheet } from "react-native";
import Color from "./Color";

const CommonStyles = StyleSheet.create({
  shadowStyle: {
    elevation: 4,
    shadowColor: Color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default CommonStyles;
