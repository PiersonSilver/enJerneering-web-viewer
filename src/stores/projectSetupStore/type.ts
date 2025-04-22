import { ProjectInfo, ServiceInfo, WebsiteInfo } from "@schema/projectSetup";
import { PROJECT_SETUP_VIEWS } from "./enum";

type ProjectSetupData = {
  projectInfo: Partial<ProjectInfo>;
  websiteInfo: Partial<WebsiteInfo>;
  services: ServiceInfo[];
};

export type ProjectSetupViewStack = {
  step: number;
  view: PROJECT_SETUP_VIEWS;
};

export type ProjectSetupStoreData = {
  data: ProjectSetupData;
  footerNode: HTMLDivElement | null;
  viewStack: ProjectSetupViewStack[];
};

export type ProjectSetupStoreActions = {
  setData: <P extends keyof ProjectSetupData>(
    path: P,
    data: ProjectSetupData[P]
  ) => void;
  setFooterNode: (node: HTMLDivElement) => void;
  pushView: (step: number, view: PROJECT_SETUP_VIEWS) => void;
  popView: () => void;
  addService: (service: ServiceInfo) => void;
  editService: (service: ServiceInfo) => void;
  removeService: (_id: string) => void;
  getData: () => ProjectSetupData; //added, might not be fully good
  reset: () => void;
};

export type ProjectSetupStore = ProjectSetupStoreActions &
  ProjectSetupStoreData;
