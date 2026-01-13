import { ListTile, WalletCard } from "@/components/dashboard";
import { Label, SafeAreaContainer } from "@/components/ui";
import { Color, CommonStyles, Icon, Size } from "@/constants";
import { useExpense } from "@/hooks";
import { ExpenseType } from "@/types";
import { Image } from "expo-image";
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
          {expenses.length === 0 ? (
            <View style={styles.noDataContainer}>
              <Image source={Icon.warning} style={styles.icon} />
              <Label style={CommonStyles.subtitleText}>
                No expenses found.
              </Label>
            </View>
          ) : (
            expenses.map((expense) => (
              <ListTile key={expense.id} icon={Icon.calendarOutline} />
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
