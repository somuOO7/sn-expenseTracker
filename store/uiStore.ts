import { create } from "zustand";

interface UiState {
  showLoader: boolean | null;
  setShowLoader: (value: boolean | null) => void;
  toast: {
    visible: boolean;
    message: string;
    variant: "success" | "failure";
  } | null;
  showToast: (
    value: {
      visible: boolean;
      message: string;
      variant: "success" | "failure";
    } | null
  ) => void;
}

export const useUiStore = create<UiState>((set) => ({
  showLoader: null,
  setShowLoader: (value) => set({ showLoader: value }),
  toast: null,
  showToast: (value) => {
    set({ toast: value });
  },
}));
