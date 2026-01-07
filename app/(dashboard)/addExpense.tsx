import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import SafeAreaContainer from "@/components/ui/SafeAreaContainer";
import Color from "@/constants/Color";
import CommonStyles from "@/constants/CommonStyles";
import Icon from "@/constants/Icons";
import Size from "@/constants/Size";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";

const addExpense = () => {
  return (
    <SafeAreaContainer style={{ flex: 1 }}>
      <Label variant="bold" style={CommonStyles.pageTitle}>
        Add Expense
      </Label>
      <Label style={CommonStyles.subtitleText}>
        Enter the amount and select category below.
      </Label>

      <Input
        title="Enter amount"
        prefixIcon="₹"
        placeholder="0.00"
        variant="large"
      />

      <View style={styles.inputGroup}>
        <Input
          title="Select date"
          prefixIcon={
            <Image
              source={Icon.calendarOutline}
              style={{ width: 16, height: 16, tintColor: Color.white }}
            />
          }
          placeholder="Today"
          variant="small"
          style={{ flex: 1 }}
        />
        <Input
          title="Add note"
          prefixIcon={
            <Image
              source={Icon.noteOutline}
              style={{ width: 16, height: 16, tintColor: Color.white }}
            />
          }
          placeholder="Add a note (optional)"
          variant="small"
          style={{ flex: 2 }}
        />
      </View>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  inputGroup: { flexDirection: "row", gap: Size.padding },
});

export default addExpense;
