import { ListTile, WalletCard } from "@/components/dashboard";
import { Label, SafeAreaContainer } from "@/components/ui";
import { Color, CommonStyles, Icon, Size } from "@/constants";
import { useCategory, useExpense } from "@/hooks";
import { ExpenseType } from "@/types";
import { Image } from "expo-image";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const index = () => {
  const { getExpenses } = useExpense;
  const { getCategory } = useCategory;

  const [expenses, setExpenses] = useState<ExpenseType[]>([]);

  useFocusEffect(
    useCallback(() => {
      const callInitialAPIs = async () => {
        const expensesData = await getExpenses();
        setExpenses(expensesData);
        await getCategory();
      };
      callInitialAPIs();
    }, [])
  );

  return (
    <SafeAreaContainer style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ gap: Size.padding }}>
        <WalletCard />

        {/* Monthly statement section */}
        <View>
          <Label>Monthly statement</Label>
          <ListTile variant="analytic" title="Car" icon={Icon.car} />
        </View>

        {/* Recent expense section */}
        <View style={{ gap: Size.padding / 2 }}>
          <Label>Recent expenses</Label>
          {expenses.length === 0 ? (
            <View style={styles.noDataContainer}>
              <Image source={Icon.warning} style={styles.icon} />
              <Label style={CommonStyles.subtitleText}>
                No expenses found.
              </Label>
            </View>
          ) : (
            expenses.map((expense) => (
              <ListTile
                key={expense.id}
                variant="detail"
                title={expense.note}
                categoryId={expense.categoryId}
                detail={{ amount: expense.amount, date: expense.date }}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  noDataContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: { width: Size.iconSize, height: Size.iconSize, tintColor: Color.gray },
});

export default index;
