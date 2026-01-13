import { Button, SafeAreaContainer } from "@/components/ui";
import { ModalCategory } from "@/constants";
import { useRouter } from "expo-router";
import { View } from "react-native";

const cashPlus = () => {
  const router = useRouter();
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
    </SafeAreaContainer>
  );
};

export default cashPlus;
