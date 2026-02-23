import { create } from "zustand";

interface SidebarStore {
  SidebarIsOpen: boolean;
  setSidebarIsOpen: (state: boolean) => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  SidebarIsOpen: true,
  setSidebarIsOpen: (state: boolean) => set({ SidebarIsOpen: state }),
}));
