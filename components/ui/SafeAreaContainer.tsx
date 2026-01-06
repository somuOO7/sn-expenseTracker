import Size from "@/constants/Size";
import { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SafeAreaContainer = (props: PropsWithChildren<{}>) => {
  return <SafeAreaView style={styles.container}>{props.children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Size.padding,
  },
});

export default SafeAreaContainer;
