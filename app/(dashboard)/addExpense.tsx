import {
  Button,
  HorizontalSelector,
  Input,
  Label,
  SafeAreaContainer,
} from "@/components/ui";
import { Color, CommonStyles, Icon, Size } from "@/constants";
import { useCategory, useExpense } from "@/hooks";
import * as Crypto from "expo-crypto";
import { Image } from "expo-image";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

const addExpense = () => {
  const { getCategory } = useCategory;
  const { addExpense } = useExpense;

  const [formData, setFormData] = useState({
    amount: "",
    categoryId: "",
    note: "",
    date: new Date().toLocaleDateString(),
  });
  const [categories, setCategories] = useState<
    Array<{
      id: string;
      isSelected: boolean;
      title: string;
      icon: keyof typeof Icon;
    }>
  >([]);

  useFocusEffect(
    useCallback(() => {
      const fetchCategory = async () => {
        const result = await getCategory();

        const updatedCategories = result?.map(
          (category: any, index: number) => ({
            ...category,
            isSelected: index === 0,
          })
        );

        setCategories(updatedCategories || []);
      };
      fetchCategory();
    }, [])
  );

  useEffect(() => {
    // Update formData with selected categoryId
    const selectedCategoryIndex = categories.findIndex(
      (category) => category.isSelected
    );
    setFormData({
      ...formData,
      categoryId:
        categories[selectedCategoryIndex]?.id || categories[0]?.id || "",
    });
  }, [categories]);

  const setSelectedCategory = (id: string) => {
    const updatedCategories = categories.map((category) => ({
      ...category,
      isSelected: category.id === id,
    }));
    setCategories(updatedCategories);
  };

  const handleAddExpenseButtonClick = async () => {
    try {
      await addExpense({
        ...formData,
        amount: parseFloat(formData.amount),
        id: Crypto.randomUUID(),
      });
      setFormData({ ...formData, amount: "", note: "" });
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

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
        keyboardType="numeric"
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
          placeholder="Add a note"
          variant="small"
          containerStyle={{ flex: 2 }}
          value={formData.note}
          onChangeText={(text) => setFormData({ ...formData, note: text })}
        />
      </View>

      {/* Category selector */}
      <HorizontalSelector
        title="Select category"
        data={categories}
        setSelected={setSelectedCategory}
      />

      <Button
        title="Save"
        variant="primary"
        disabled={
          !formData.amount ||
          !formData.categoryId ||
          !formData.date ||
          !formData.note
        }
        onPress={handleAddExpenseButtonClick}
      />
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  inputGroup: { flexDirection: "row", gap: Size.padding },
});

export default addExpense;
