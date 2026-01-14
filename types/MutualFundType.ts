interface MutualFundType {
  schemeCode: string;
  schemeName: string;
  data: [{ date: string; nav: string; amount: string }];
}

export default MutualFundType;
