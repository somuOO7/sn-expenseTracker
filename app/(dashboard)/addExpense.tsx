import {
  Button,
  HorizontalSelector,
  Input,
  Label,
  SafeAreaContainer,
} from "@/components/ui";
import { Color, CommonStyles, Icon, Size } from "@/constants";
import { Image } from "expo-image";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

const addExpense = () => {
  const [formData, setFormData] = useState({ amount: "" });

  return (
    <SafeAreaContainer style={{ flex: 1, gap: Size.padding }}>
      {/* Page title */}
      <View>
        <Label variant="bold" style={CommonStyles.pageTitle}>
          Add Expense
        </Label>
        <Label style={CommonStyles.subtitleText}>
          Enter the amount and select category below.
        </Label>
      </View>

      {/* Inputs */}
      <Input
        title="Enter amount"
        prefixIcon="₹"
        placeholder="0.00"
        variant="large"
        value={formData.amount}
        onChangeText={(text) => setFormData({ ...formData, amount: text })}
      />

      <View style={styles.inputGroup}>
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
          containerStyle={{ flex: 1 }}
        />
        <Input
          title="Add note"
          prefixIcon={
            <Image
              source={Icon.noteOutline}
              style={{
                width: Size.fontSize,
                height: Size.fontSize,
                tintColor: Color.white,
              }}
            />
          }
          placeholder="Add a note (optional)"
          variant="small"
          containerStyle={{ flex: 2 }}
        />
      </View>

      {/* Category selector */}
      <HorizontalSelector
        title="Select category"
        data={[
          {
            id: 0,
            title: "Sample Category",
            icon: Icon.calendarOutline,
            isSelected: true,
          },
          {
            id: 1,
            title: "Sample",
            icon: Icon.homeOutline,
            isSelected: false,
          },
          {
            id: 2,
            title: "Sample",
            icon: Icon.homeOutline,
            isSelected: false,
          },
          {
            id: 3,
            title: "Sample",
            icon: Icon.homeOutline,
            isSelected: false,
          },
          {
            id: 4,
            title: "Sample",
            icon: Icon.homeOutline,
            isSelected: false,
          },
        ]}
      />

      <Button title="Save" variant="primary" disabled />
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  inputGroup: { flexDirection: "row", gap: Size.padding },
});

export default addExpense;
