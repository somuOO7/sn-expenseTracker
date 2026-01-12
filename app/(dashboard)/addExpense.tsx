import {
  Button,
  HorizontalSelector,
  Input,
  Label,
  SafeAreaContainer,
} from "@/components/ui";
import { Color, CommonStyles, Icon, Size } from "@/constants";
import { useCategory } from "@/hooks";
import { Image } from "expo-image";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";

const addExpense = () => {
  const { addCategory, getCategory } = useCategory;
  const [formData, setFormData] = useState({ amount: "" });
  const [categories, setCategories] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchCategory = async () => {
        const result = await getCategory();

        const updatedCategories = result.map(
          (category: any, index: number) => ({
            ...category,
            isSelected: index === 0,
          })
        );

        setCategories(updatedCategories);
      };
      fetchCategory();
    }, [])
  );

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
      <HorizontalSelector title="Select category" data={categories} />

      <Button title="Save" variant="primary" disabled />
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  inputGroup: { flexDirection: "row", gap: Size.padding },
});

export default addExpense;
