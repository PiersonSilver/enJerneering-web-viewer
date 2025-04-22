"use client";

import React from "react";
import Designer from "./Designer";
import { DragOverlay } from "./DragOverlay";
import { Controls } from "./Controls";
import { BuilderDnDContext } from "./BuilderDndContext";
import RightSidebar from "./RightSideBar";
import LeftSidebar from "./LeftSideBar";

const Builder: React.FC = () => {
  return (
    <BuilderDnDContext>
      <div className="relative overflow-hidden h-full bg-background-50 border border-border-100 rounded-2xl">
        <LeftSidebar />
        <Designer />
        <RightSidebar />
        <Controls />
      </div>
      <DragOverlay />
    </BuilderDnDContext>
  );
};

export default Builder;
