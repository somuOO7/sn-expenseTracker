import { Color, CommonStyles, Icon, ModalCategory, Size } from "@/constants";
import { useMutualFund } from "@/hooks";
import { Image } from "expo-image";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input, Label } from "../ui";

interface AddCashPlusProps {
  type: ModalCategory;
}

const AddCashPlus = (props: AddCashPlusProps) => {
  const [formData, setFormData] = useState({
    mutualFundName: "",
    schemeCode: "",
    date: "",
    amount: "",
  });
  const [isFundListVisible, setIsFundListVisible] = useState(false);
  const [fundData, setFundData] = useState<Array<any>>([]);

  const { getMutualFund } = useMutualFund;

  const handleFundNameChange = async (text: string) => {
    setFormData({ ...formData, mutualFundName: text });
    if (text.length > 3) {
      setIsFundListVisible(true);
      const mfData = await getMutualFund({ q: text });
      setFundData(mfData || []);
    } else {
      setIsFundListVisible(false);
    }
  };

  const handleFundSelect = (item: any) => {
    setFormData({
      ...formData,
      mutualFundName: item.schemeName,
      schemeCode: item.schemeCode,
    });
    setIsFundListVisible(false);
  };

  return (
    <View style={styles.container}>
      <Label variant="bold" style={CommonStyles.pageTitle}>
        {props.type === ModalCategory.ADD_MUTUAL_FUND
          ? "Add Mutual Fund"
          : "Add Stock"}
      </Label>

      <Input
        placeholder="Enter mutual fund name"
        title="Mutual fund name"
        variant="small"
        isDropdown={isFundListVisible}
        dropDownData={{ data: fundData, type: "mutual-fund" }}
        value={formData.mutualFundName}
        onChangeText={handleFundNameChange}
        onDropdownItemSelect={handleFundSelect}
        onBlur={() => setIsFundListVisible(false)}
      />

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
      />

      <Input placeholder="0.00" title="Amount" variant="small" prefixIcon="₹" />

      <Button title="Submit" variant="primary" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    padding: Size.padding,
    borderRadius: Size.borderRadius,
    gap: Size.padding,
  },
});

export default AddCashPlus;
