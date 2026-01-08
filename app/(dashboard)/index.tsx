import { ListTile, WalletCard } from "@/components/dashboard";
import { Label, SafeAreaContainer } from "@/components/ui";
import { ScrollView, StyleSheet, View } from "react-native";

const index = () => {
  return (
    <SafeAreaContainer style={{ flex: 1 }}>
      <ScrollView>
        <WalletCard />

        {/* Recent expense section */}
        <View>
          <Label>Recent expenses</Label>
          <ListTile />
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({});

export default index;
