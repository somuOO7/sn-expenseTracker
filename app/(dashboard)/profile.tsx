import { Button, Label, SafeAreaContainer } from "@/components/ui";
import { SecureStoreKey } from "@/constants";
import { useAuthStore } from "@/store";
import * as SecureStore from "expo-secure-store";

const profile = () => {
  const { setIsAuthenticated } = useAuthStore();

  return (
    <SafeAreaContainer style={{ flex: 1 }}>
      <Label>profile</Label>

      {/* Temporary Login Button */}
      <Button
        title="Logout"
        variant="primary"
        onPress={() => {
          SecureStore.deleteItemAsync(SecureStoreKey.userId);
          setIsAuthenticated(false);
        }}
      />
    </SafeAreaContainer>
  );
};

export default profile;
