import { Color, Size } from "@/constants";
import { StyleSheet, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SafeAreaContainerProps extends ViewProps {}

const SafeAreaContainer = (props: SafeAreaContainerProps) => {
  return (
    <SafeAreaView style={[styles.container, props.style]}>
      {props.children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Size.padding,
    backgroundColor: Color.accent,
  },
});

export default SafeAreaContainer;
