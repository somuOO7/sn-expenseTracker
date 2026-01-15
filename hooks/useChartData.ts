import { getMutualFundDetailsBySchemeCode } from "./useMutualFund";

export const getFundChartData = async (
  schemeCode: string,
  data: [{ amount: string; date: string; nav: string }]
) => {
  const mutualFundData = await getMutualFundDetailsBySchemeCode(schemeCode);
  const navData = mutualFundData.data as Array<any>;

  // Parse and sort NAV data
  const parsedNavData = navData
    .map((nav) => ({
      nav: parseFloat(nav.nav),
      parsedDate: new Date(nav.date.split("-").reverse().join("-")),
    }))
    .sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime());

  // Parse, calculate quantities, and sort user data
  let qtyBalance = 0;
  const parsedData = data
    .map((item) => {
      qtyBalance += parseFloat(item.amount) / parseFloat(item.nav);
      return {
        parsedDate: new Date(item.date),
        qty: qtyBalance,
      };
    })
    .sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime());

  const dataMap = new Map(
    parsedData.map((item) => [item.parsedDate.getTime(), item.qty])
  );

  qtyBalance = 0;
  const chartData: Array<{
    value: number;
    label?: string;
    showXAxisIndex?: boolean;
  }> = [];

  // Single-pass iteration to build chart data
  for (let i = 0; i < parsedNavData.length; i++) {
    const nav = parsedNavData[i];
    const matchingQty = dataMap.get(nav.parsedDate.getTime());

    if (matchingQty !== undefined) {
      qtyBalance = matchingQty;
    }

    if (qtyBalance > 0) {
      chartData.push({
        value: nav.nav * qtyBalance,
      });
    }
  }

  // Calculate label positions
  const noOfSeparations = Math.ceil(chartData.length / 3);
  let navIndex = 0;

  // Add labels in a second pass (only for labeled items)
  for (let i = 0; i < chartData.length; i++) {
    // Find corresponding nav entry
    while (navIndex < parsedNavData.length) {
      const nav = parsedNavData[navIndex];
      const matchingQty = dataMap.get(nav.parsedDate.getTime());

      if (matchingQty !== undefined) {
        qtyBalance = matchingQty;
      }

      navIndex++;

      if (qtyBalance > 0) {
        break;
      }
    }

    if (i % noOfSeparations === 0 || i === chartData.length - 1) {
      const date = parsedNavData[navIndex - 1].parsedDate;
      chartData[i].label = `${date.getDate()} ${date.toLocaleString("default", {
        month: "short",
      })}'${date.getFullYear().toString().slice(2)}`;
      chartData[i].showXAxisIndex = true;
    }
  }

  return chartData;
};
