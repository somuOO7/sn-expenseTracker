import { create } from "zustand";

interface UiState {
  showLoader: boolean | null;
  setShowLoader: (value: boolean | null) => void;
}

export const useUiStore = create<UiState>((set) => ({
  showLoader: null,
  setShowLoader: (value) => set({ showLoader: value }),
}));
