import { create } from "zustand";

export const useToastStore = create((set) => ({
  message: null,
  setMessage: (msg) => set({ message: msg }),
  clearMessage: () => set({ message: null }),
}));