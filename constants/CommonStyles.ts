import { StyleSheet } from "react-native";
import Color from "./Color";

const CommonStyles = StyleSheet.create({
  pageTitle: { fontSize: 24, color: Color.secondary },
  shadowStyle: {
    elevation: 4,
    shadowColor: Color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  subtitleText: { color: Color.gray },
});

export default CommonStyles;
