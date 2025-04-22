interface Sidebar {
  open: boolean;
}

export interface Layer {
  id: string;
  layerTitle: string;
  componentName: string;
  styleType: number;
  data: any;
  isGlobalComponent: boolean;
}

export interface GlobalConfig {
  navbar: Layer | null;
  footer: Layer | null;
  background: null;
}

export interface PageSection {
  CallToAction: Layer | null;
}

export interface Page {
  pageId: string;
  pageTitle: string;
  layers: Layer[];
}

export interface BuilderStoreData {
  projectId?: string;
  currentPageId: string;
  selectedLayerId: string;
  pages: Record<string, Page>;
  globalConfig: GlobalConfig;
  pageSection: PageSection;

  sidebar: {
    left: Sidebar;
    right: Sidebar;
  };
}
