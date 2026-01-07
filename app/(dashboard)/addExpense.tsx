import Label from "@/components/ui/Label";
import SafeAreaContainer from "@/components/ui/SafeAreaContainer";
import Color from "@/constants/Color";
import React from "react";
import { StyleSheet } from "react-native";

const addExpense = () => {
  return (
    <SafeAreaContainer style={{ flex: 1 }}>
      <Label variant="bold" style={{ fontSize: 24, color: Color.secondary }}>
        Add Expense
      </Label>
      <Label style={{ color: Color.gray }}>
        Enter the amount and select category below.
      </Label>

      <Label style={styles.title}>Enter Amount</Label>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    color: Color.secondary,
  },
});

export default addExpense;
