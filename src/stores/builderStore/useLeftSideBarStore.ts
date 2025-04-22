import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export enum LEFT_SIDE_BAR_VIEWS {
  ALL_PAGES = "ALL_PAGES",
  LAYERS = "LAYERS",
  SEARCH_ELM = "SEARCH_ELM",
  ELM_STYLES = "ELM_STYLES",
  GLOBAL_BACKGROUND = "GLOBAL_BACKGROUND",
  GLOBAL_COMPONENT = "GLOBAL_COMPONENT",
}

export interface LeftSideBarStore {
  history: LEFT_SIDE_BAR_VIEWS[];
  selectedCompName: string;
  pushView: (view: LEFT_SIDE_BAR_VIEWS) => void;
  popView: () => void;
  setCompName: (compName: string) => void;
}

export const useLeftSideBarStore = create<LeftSideBarStore>()(
  immer((set) => ({
    history: [LEFT_SIDE_BAR_VIEWS.ALL_PAGES],
    selectedCompName: "",
    pushView: (view) =>
      set((state) => {
        state.history.push(view);
      }),
    popView: () =>
      set((state) => {
        state.history.pop();
      }),
    setCompName: (selectedCompName) => {
      set({ selectedCompName });
    },
  }))
);

export const usePushView = () => {
  return useLeftSideBarStore((state) => state.pushView);
};
