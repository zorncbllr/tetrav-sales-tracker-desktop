import { create } from "zustand";

interface AccountStore {
  activeTab: "General" | "Individuals" | "Offices";

  setActiveTab: (activeTab: "General" | "Individuals" | "Offices") => void;
}

export const useAccountStore = create<AccountStore>((set) => ({
  activeTab: "General",

  setActiveTab: (activeTab) => set((_) => ({ activeTab })),
}));
