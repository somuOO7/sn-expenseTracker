import { MutualFundType } from "@/types";
import { create } from "zustand";

interface CashPlusState {
  mutualFundStore: Array<MutualFundType>;
  setMutualFundStore: (value: Array<MutualFundType>) => void;
}

export const useCashPlusStore = create<CashPlusState>((set) => ({
  mutualFundStore: [],
  setMutualFundStore: (value) => set({ mutualFundStore: value }),
}));
