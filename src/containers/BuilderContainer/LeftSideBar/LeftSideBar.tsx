import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { LEFT_SIDE_BAR_VIEWS, useLeftSideBarStore } from "@stores/builderStore";
import { AllPagesView } from "./AllPagesView";
import { LayersView } from "./LayersView";
import { SearchElmView } from "./SearchEleView";
import { ElmStylesView } from "./ElmStylesView";
import { DragEndEvent, useDndMonitor } from "@dnd-kit/core";
import { useBuilderStore } from "@stores/builderStore";
import { GlobalBackgroundView } from "./GlobalBackgroundView";
import { GlobalComponentView } from "./GlobalComponentView";

const LeftSidebarViews = {
  [LEFT_SIDE_BAR_VIEWS.ALL_PAGES]: AllPagesView,
  [LEFT_SIDE_BAR_VIEWS.LAYERS]: LayersView,
  [LEFT_SIDE_BAR_VIEWS.SEARCH_ELM]: SearchElmView,
  [LEFT_SIDE_BAR_VIEWS.ELM_STYLES]: ElmStylesView,
  [LEFT_SIDE_BAR_VIEWS.GLOBAL_BACKGROUND]: GlobalBackgroundView,
  [LEFT_SIDE_BAR_VIEWS.GLOBAL_COMPONENT]: GlobalComponentView,
};

const LeftSidebar = () => {
  const history = useLeftSideBarStore((state) => state.history);
  const leftBar = useBuilderStore((state) => state.sidebar.left);
  const [sidebarFieldsRegKey, setSidebarFieldsRegKey] = useState(uuidv4());

  const currentViewName = history.slice(-1)[0];
  const CurrentView = LeftSidebarViews[currentViewName];

  const onDragEnd = ({ over }: DragEndEvent) => {
    if (over) {
      setSidebarFieldsRegKey(uuidv4());
    }
  };

  useDndMonitor({ onDragEnd });

  return (
    <div
      className={`absolute top-0 pt-4 left-0 h-full w-96 bg-white border-r border-border-100 transition-all duration-300 ease-in-out ${
        leftBar.open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <CurrentView key={sidebarFieldsRegKey} />
    </div>
  );
};

export default LeftSidebar;
