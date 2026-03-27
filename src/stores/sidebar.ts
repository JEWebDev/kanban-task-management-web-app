import { create } from "zustand";

interface SidebarStore {
  SidebarIsOpen: boolean;
  OptionsIsOpen: boolean;
  setSidebarIsOpen: (state: boolean) => void;
  setOptionsIsOpen: (state: boolean) => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  SidebarIsOpen: true,
  OptionsIsOpen: true,
  setSidebarIsOpen: (state: boolean) => set({ SidebarIsOpen: state }),
  setOptionsIsOpen: (state: boolean) => set({ OptionsIsOpen: state }),
}));
