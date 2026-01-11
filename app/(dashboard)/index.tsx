import { ListTile, WalletCard } from "@/components/dashboard";
import { Label, SafeAreaContainer } from "@/components/ui";
import { Icon, Size } from "@/constants";
import { ScrollView, StyleSheet, View } from "react-native";

const index = () => {
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
          <ListTile icon={Icon.calendarOutline} />
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({});

export default index;
