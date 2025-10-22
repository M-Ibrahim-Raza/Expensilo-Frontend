import { create } from "zustand";

export const useSignUpToastStore = create((set) => ({
  signUpMessage: null,
  setSignUpMessage: (msg) => set({ signUpMessage: msg }),
  clearSignUpMessage: () => set({ signUpMessage: null }),
}));
