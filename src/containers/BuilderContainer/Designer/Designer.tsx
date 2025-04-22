"use client";

import React, { memo, useEffect } from "react";
import { useDroppable } from "@dnd-kit/core";
import { twMerge } from "tailwind-merge";
import { Layer, useBuilderStore } from "@stores/builderStore";
import { components } from "@builder/meta";
import { ScrollArea } from "@internalComponents/ScrollArea";
import { Spacer } from "./Spacer";
import { FocusAbleComp } from "./FocusAble";
import { SortAbleComp } from "./SortAble";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface RenderComponentProps extends Layer {}

const Designer = () => {
  const layers = useBuilderStore((state) => state.activeLayers);
  const sidebar = useBuilderStore((state) => state.sidebar);
  const { navbar, footer, background } = useBuilderStore(
    (state) => state.globalConfig
  );

  const selectedLayerId = useBuilderStore((state) => state.selectedLayerId);
  const { setNodeRef } = useDroppable({
    id: "designer",
  });

  useEffect(() => {
    const selectedElm = document.getElementById(selectedLayerId);

    selectedElm?.scrollIntoView({ behavior: "smooth" });
  }, [selectedLayerId]);

  return (
    <main
      id="designer"
      className={twMerge(
        "h-full transition-all duration-300 ease-in-out absolute inset-0",
        sidebar.left.open ? "ml-96" : "ml-0",
        sidebar.right.open ? "mr-96" : "mr-0"
      )}
    >
      <div className="h-full flex-1 flex flex-col">
        <SortableContext items={layers} strategy={verticalListSortingStrategy}>
          <ScrollArea className="flex-1 relative">
            <div
              ref={setNodeRef}
              className="bg-white max-w-4xl min-h-[25rem] m-auto my-8"
            >
              {navbar && (
                <FocusAbleComp
                  key={navbar.id}
                  isSelected={navbar.id === selectedLayerId}
                  layer={navbar}
                  showToolbar={false}
                >
                  <RenderComponent {...navbar} />
                </FocusAbleComp>
              )}
              {layers.map((layer, index) => (
                <FocusAbleComp
                  key={layer.id}
                  isSelected={layer.id === selectedLayerId}
                  layer={layer}
                >
                  <SortAbleComp id={layer.id} index={index}>
                    <RenderComponent {...layer} />
                  </SortAbleComp>
                </FocusAbleComp>
              ))}
              {footer && (
                <FocusAbleComp
                  key={footer.id}
                  isSelected={footer.id === selectedLayerId}
                  layer={footer}
                  showToolbar={false}
                >
                  <RenderComponent {...footer} />
                </FocusAbleComp>
              )}
            </div>
            <div id="controls-container" className="absolute inset-0 z-50" />
          </ScrollArea>
        </SortableContext>
      </div>
    </main>
  );
};

const RenderComponent = memo(
  ({ componentName, styleType, data }: RenderComponentProps) => {
    if (componentName === "Spacer") {
      return <Spacer />;
    }

    const ComponentToRender = components[componentName]?.component;

    if (!ComponentToRender) {
      return null;
    }

    console.log("render layer");

    return React.cloneElement(ComponentToRender, {
      type: styleType,
      data,
    });
  }
);
RenderComponent.displayName = "RenderComponent";

export default Designer;
