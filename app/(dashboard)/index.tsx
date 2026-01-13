import { ListTile, WalletCard } from "@/components/dashboard";
import { Label, SafeAreaContainer } from "@/components/ui";
import { Icon, Size } from "@/constants";
import { useExpense } from "@/hooks";
import { ExpenseType } from "@/types";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const index = () => {
  const { getExpenses } = useExpense;

  const [expenses, setExpenses] = useState<ExpenseType[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchExpenses = async () => {
        const expensesData = await getExpenses();
        setExpenses(expensesData);
      };
      fetchExpenses();
    }, [])
  );

  return (
    <SafeAreaContainer style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ gap: Size.padding }}>
        <WalletCard />

        {/* Monthly statement section */}
        <View>
          <Label>Monthly statement</Label>
          <ListTile icon={Icon.car} />
        </View>

        {/* Recent expense section */}
        <View>
          <Label>Recent expenses</Label>
          {expenses.map((expense) => (
            <ListTile key={expense.id} icon={Icon.calendarOutline} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({});

export default index;
