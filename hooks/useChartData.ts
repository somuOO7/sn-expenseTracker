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
  return parsedNavData.reduce<Array<{ value: number }>>((acc, nav) => {
    const matchingQty = dataMap.get(nav.parsedDate.getTime());

    if (matchingQty !== undefined) {
      qtyBalance = matchingQty;
    }

    if (qtyBalance > 0) {
      acc.push({ value: nav.nav * qtyBalance });
    }

    return acc;
  }, []);
};
