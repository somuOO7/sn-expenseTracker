import { Label, SafeAreaContainer } from "@/components/ui";
import { useChartData, useMutualFund } from "@/hooks";
import { useCashPlusStore } from "@/store";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

const reports = () => {
  const { getFundChartData } = useChartData;
  const { getMutualFundStore } = useMutualFund;
  const { mutualFundStore } = useCashPlusStore();

  const [data, setData] = useState<Array<{ value: number }>>([]);

  useEffect(() => {
    getMutualFundStore();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchChartData = async () => {
        if (mutualFundStore.length === 0) return;
        const result = await getFundChartData(
          mutualFundStore[0]?.schemeCode,
          mutualFundStore[0]?.data
        );
        setData(result);
      };
      fetchChartData();
    }, [mutualFundStore])
  );

  return (
    <SafeAreaContainer style={{ flex: 1 }}>
      <Label>reports</Label>
      <View style={{ height: 400, width: "100%", overflow: "hidden" }}>
        <LineChart
          data={data}
          adjustToWidth
          curved
          hideDataPoints
          yAxisTextStyle={{ fontFamily: "Regular" }}
          xAxisLabelTextStyle={{
            fontFamily: "Regular",
            width: 80,
            marginLeft: -40,
          }}
          noOfSections={4}
          showYAxisIndices
        />
      </View>
    </SafeAreaContainer>
  );
};

export default reports;
