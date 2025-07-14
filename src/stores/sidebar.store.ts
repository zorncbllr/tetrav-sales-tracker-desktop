import { LucideIcon } from "lucide-react";
import { create } from "zustand";

interface SidebarStore {
  activeItem?: SidebarItem;
  activeSubItem?: SidebarSubItem;

  setActiveItem: (activeItem: SidebarItem | undefined) => void;
  setActiveSubItem: (activeSubItem: SidebarSubItem | undefined) => void;
}

export interface SidebarItem {
  title: string;
  url: string;
  icon?: LucideIcon | undefined;
  isActive?: boolean | undefined;
  items?: SidebarSubItem[] | undefined;
}

export interface SidebarSubItem {
  title: string;
  url: string;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  activeItem: undefined,
  activeSubItem: undefined,

  setActiveItem: (activeItem) => set((_) => ({ activeItem })),
  setActiveSubItem: (activeSubItem) => set((_) => ({ activeSubItem })),
}));
