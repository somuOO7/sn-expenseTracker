import { ListTile } from "@/components/dashboard";
import { Button, SafeAreaContainer } from "@/components/ui";
import { ModalCategory } from "@/constants";
import { useCashPlusStore } from "@/store";
import { useRouter } from "expo-router";
import { View } from "react-native";

const cashPlus = () => {
  const router = useRouter();
  const { mutualFundStore } = useCashPlusStore();

  return (
    <SafeAreaContainer style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <Button
          title="Add stock"
          variant="primary"
          onPress={() =>
            router.push({
              pathname: "/modal",
              params: { type: ModalCategory.ADD_STOCK },
            })
          }
        />
        <Button
          title="Add mutual fund"
          variant="primary"
          onPress={() =>
            router.push({
              pathname: "/modal",
              params: { type: ModalCategory.ADD_MUTUAL_FUND },
            })
          }
        />
      </View>

      {mutualFundStore.map((fund) => (
        <ListTile
          key={fund.schemeCode}
          title={fund.schemeName}
          variant="analytic"
        />
      ))}
    </SafeAreaContainer>
  );
};

export default cashPlus;
