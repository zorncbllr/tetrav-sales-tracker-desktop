import { create } from "zustand";

interface BreadCrumbStore {
  items: BreadCrumbItem[];

  setItems: (items: BreadCrumbItem[]) => void;
}

export interface BreadCrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

export const useBreadCrumbStore = create<BreadCrumbStore>((set) => ({
  items: [
    {
      active: true,
      href: "/",
      label: "Dashboard",
    },
  ],

  setItems: (items: BreadCrumbItem[]) => set((_) => ({ items })),
}));
