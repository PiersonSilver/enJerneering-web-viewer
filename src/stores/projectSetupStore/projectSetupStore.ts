import { create } from "zustand";
import { ProjectSetupStore, ProjectSetupStoreData } from "./type";
import {
  defaultProjectInfo,
  defaultWebsiteInfo,
  ServiceInfo,
} from "@schema/projectSetup";
import { immer } from "zustand/middleware/immer";
import computed from "zustand-computed";
import { PROJECT_SETUP_VIEWS } from "./enum";
import _last from "lodash/last";
import _findIndex from "lodash/findIndex";
import _filter from "lodash/filter";
import { get } from "lodash";

const initialData: ProjectSetupStoreData = {
  data: {
    projectInfo: defaultProjectInfo,
    websiteInfo: defaultWebsiteInfo,
    services: [],
  },
  footerNode: null,
  viewStack: [{ step: 0, view: PROJECT_SETUP_VIEWS.FETCH_WEBSITE_FORM }],
};

export const useProjectSetupStore = create<ProjectSetupStore>()(
  computed(
    immer((set, get) => ({
      ...initialData,
      setData: (path, data) => {
        set((state) => {
          state.data[path] = data;
        });
      },
      setFooterNode: (footerNode) => {
        set({ footerNode });
      },
      pushView: (step, view) => {
        set((state) => {
          state.viewStack.push({ step, view });
        });
      },
      popView: () => {
        set((state) => {
          state.viewStack.pop();
        });
      },
      addService: (service: ServiceInfo) => {
        set((state) => {
          state.data.services.push(service);
        });
      },
      editService: (service: ServiceInfo) => {
        set((state) => {
          const index = _findIndex(state.data.services, { _id: service._id });
          if (index >= 0) {
            state.data.services[index] = service;
          }
        });
      },
      removeService: (serviceId) => {
        set((state) => {
          state.data.services = _filter(
            state.data.services,
            ({ _id }) => serviceId !== _id
          );
        });
      },
      getData: () => { //added, might not be good idk
        return get().data;
      },
      reset: () => {
        set(initialData);
      },
    })),
    (state) => {
      const activeStack = _last(state.viewStack);

      return {
        activeStep: activeStack?.step ?? 0,
        activeView: activeStack?.view ?? PROJECT_SETUP_VIEWS.FETCH_WEBSITE_FORM,
      };
    }
  )
);
