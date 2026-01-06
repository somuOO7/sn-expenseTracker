import BottomTab from "@/components/ui/BottomTab";
import { Tabs } from "expo-router";

export default function DashboardLayout() {
  return (
    <Tabs
      tabBar={(props) => <BottomTab {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: "Reports",
        }}
      />
      <Tabs.Screen
        name="cashPlus"
        options={{
          title: "Cash+",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
      <Tabs.Screen
        name="addExpense"
        options={{
          title: "Add Expense",
          href: null,
        }}
      />
    </Tabs>
  );
}
