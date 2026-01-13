import { Color, CommonStyles, Icon, ModalCategory, Size } from "@/constants";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input, Label } from "../ui";

interface AddCashPlusProps {
  type: ModalCategory;
}

const AddCashPlus = (props: AddCashPlusProps) => {
  return (
    <View style={styles.container}>
      <Label variant="bold" style={CommonStyles.pageTitle}>
        {props.type === ModalCategory.ADD_MUTUAL_FUND
          ? "Add Mutual Fund"
          : "Add Stock"}
      </Label>

      <Input
        placeholder="Enter mutual fund name"
        title="Mutual fund name"
        variant="small"
      />

      <Input
        title="Select date"
        prefixIcon={
          <Image
            source={Icon.calendarOutline}
            style={{
              width: Size.fontSize,
              height: Size.fontSize,
              tintColor: Color.white,
            }}
          />
        }
        placeholder="Today"
        variant="small"
      />

      <Input placeholder="0.00" title="Amount" variant="small" prefixIcon="₹" />

      <Button title="Submit" variant="primary" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    padding: Size.padding,
    borderRadius: Size.borderRadius,
    gap: Size.padding,
  },
});

export default AddCashPlus;
