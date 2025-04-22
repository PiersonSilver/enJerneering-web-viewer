import { create } from "zustand";
import { nanoid } from "nanoid";
import { immer } from "zustand/middleware/immer";
import _set from "lodash/set";
import _find from "lodash/find";
import _assignIn from "lodash/assignIn";
import computed from "zustand-computed";
import fastDeepEqual from "react-fast-compare";
import { GlobalConfig, BuilderStoreData, Page, Layer, PageSection } from "./type";

export interface BuilderStoreActions {
  setProjectId: (projectId: string) => void;
  setPage: (pageId: string) => void;
  renamePage: (pageId: any, newName: any) => void;
  setPageData: (path: string | string[], value: any) => void;
  addPage: () => void;
  removePage: (pageId: string) => void;
  getPageData: (pageId: string) => Page;
  removeLayer: (layerId: string) => void;
  setLayerStyle: (layerId: string, style: number) => void;
  setLayerData: (layerId: string, data: Layer["data"]) => void;
  setSelectedLayer: (layerId: string) => void;
  getSelectedLayer: () => Layer;
  reset: () => void;
  toggleSidebar: (side: "left" | "right") => void;
  setGlobalConfig: <K extends keyof GlobalConfig>(
    key: K,
    data: Partial<GlobalConfig[K]>
  ) => void;
  setPageSection: <K extends keyof PageSection>(
    key: K,
    data: Partial<PageSection[K]>
  ) => void;
  getGlobalConfig: () => Partial<GlobalConfig>;
}

const page = {
  pageId: nanoid(),
  pageTitle: "Landing Page",
  layers: [],
};

const initialState: BuilderStoreData = {
  projectId: undefined, // Add projectId to initialState
  currentPageId: page.pageId,
  selectedLayerId: "",
  pages: {
    [page.pageId]: page,
  },
  globalConfig: {
    navbar: null,
    footer: null,
    background: null,
  },
  pageSection: { // might need to be removed (leaving bc it might get used and was annoyting to setup)
    CallToAction: null 
  },
  sidebar: {
    left: { open: true },
    right: { open: true },
  },
};

const computedBuilderStore = ({
  selectedLayerId,
  currentPageId,
  globalConfig,
  pages,
}: BuilderStoreData & BuilderStoreActions) => {
  return {
    activeLayers: pages[currentPageId]?.layers ?? [],
    activeLayer: _find(
      [
        ...pages[currentPageId]?.layers,
        globalConfig.navbar,
        globalConfig.footer,
      ],
      { id: selectedLayerId }
    ),
    pageOptions: Object.values(pages).map((page) => ({
      label: page.pageTitle,
      value: page.pageId,
    })),
  };
};

export const useBuilderStore = create<BuilderStoreData & BuilderStoreActions>()(
  computed(
    immer((set, get) => ({
      ...initialState,
      setProjectId: (projectId) => set({ projectId }), // Implement setProjectId action
      setPage: (pageId) => set({ currentPageId: pageId }),
      renamePage: (pageId : any, newName : any) => { // Pierson - Changes the name of the page when Edit Page Name is selected
        set((state) => {state.pages[pageId].pageTitle = newName})
      },
      setPageData: (path, value) => {
        set((state) => {
          state.pages = _set(state.pages, path, value);
        });
      },
      addPage: () => {
        const newPage: Page = {
          pageId: nanoid(),
          pageTitle: "New Page",
          layers: [],
        };
        set((state) => {
          state.pages[newPage.pageId] = newPage;
        })

      },
      setSelectedLayer: (selectedLayerId) => {
        set({ selectedLayerId });
      },
      //Pierson Silver - Added for easy access to selected layer when saving data
      getSelectedLayer: () => {
        const { currentPageId, pages, selectedLayerId} = get(); 
        const layerIndex = pages[currentPageId].layers.findIndex(
          ({ id }) => id === selectedLayerId
        );
        return pages[currentPageId].layers[layerIndex];
      },
      removePage: (pageId) => {
        set((state) => {
          delete state.pages[pageId];
        });
      },
      getPageData: (pageId: string) => { /// potential usage for storage
        const { pages } = get(); 
        return pages[pageId];
      },
      removeLayer: (layerId) => {
        set(({ currentPageId, pages }) => {
          pages[currentPageId].layers = pages[currentPageId].layers.filter(
            ({ id }) => id !== layerId
          );
        });
      },
      setLayerStyle: (layerId, style) => {
        set((state) => {
          const { currentPageId, pages } = state;
          const layerIndex = pages[currentPageId].layers.findIndex(
            ({ id }) => id === layerId
          );
          if (layerIndex !== -1) {
            console.log(state.pages[currentPageId].layers[layerIndex].componentName)
            console.log(state.pages[currentPageId].layers[layerIndex].styleType)
            console.log(state.pages[currentPageId].layers[layerIndex].data)
            state.pages[currentPageId].layers[layerIndex].styleType = style;
          }
        });
      },
      // Pierson Silver - Add setLayerData function to send data from sections to builder store
      setLayerData: (layerId, data) => {
        set((state) => {
          const { currentPageId, pages } = state;
          const layerIndex = pages[currentPageId].layers.findIndex(
            ({ id }) => id === layerId
          );
          if (layerIndex !== -1) {
            state.pages[currentPageId].layers[layerIndex].data = data;
            console.log(state.pages[currentPageId].layers[layerIndex].data)
          }
        });
      },
      setPageSection: (key, data) => {
        set((state) => {
          state.pageSection[key] = _assignIn(state.pageSection[key], data);
        });
      },
      toggleSidebar: (side) => {
        set((state) => {
          state.sidebar[side].open = !state.sidebar[side].open;
        });
      },
      setGlobalConfig: (key, data) => {
        set((state) => {
          state.globalConfig[key] = _assignIn(state.globalConfig[key], data);
          console.log(state.globalConfig[key].data)
        });
      },
      getGlobalConfig: () => {
        return get().globalConfig;
      },
      reset: () =>
        set({
          ...initialState,
          projectId: undefined, // Reset projectId to undefined
        }),
    })),
    computedBuilderStore,
    { equalityFn: fastDeepEqual }
  )
);
