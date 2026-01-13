import { CategoryType } from "@/types";
import { create } from "zustand";

interface CategoryState {
  expenseCategories: CategoryType[];
  setExpenseCategories: (categories: CategoryType[]) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  expenseCategories: [],
  setExpenseCategories: (categories: CategoryType[]) =>
    set(() => ({ expenseCategories: categories })),
}));
