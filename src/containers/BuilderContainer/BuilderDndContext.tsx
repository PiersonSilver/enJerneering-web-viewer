import { DndContext, DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { PropsWithChildren, useRef } from "react";
import { Layer, useBuilderStore } from "@stores/builderStore";

export const BuilderDnDContext = ({ children }: PropsWithChildren) => {
  const layers = useBuilderStore((state) => state.activeLayers);
  const currentPageId = useBuilderStore((state) => state.currentPageId);
  const setPageData = useBuilderStore((state) => state.setPageData);
  const setSelectedLayer = useBuilderStore((state) => state.setSelectedLayer);
  const insertedSpacerRef = useRef(false);

  const cleanUp = () => {
    const removedSpacerList = layers.filter(
      (layer) => layer.componentName !== "Spacer"
    );

    setPageData(`${currentPageId}.layers`, removedSpacerList);
    insertedSpacerRef.current = false;
  };

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;
    const overData = over?.data.current ?? {};

    if (!insertedSpacerRef.current) {
      const spacer: Layer = {
        id: `spacer_${active.id}`,
        layerTitle: "",
        componentName: "Spacer",
        styleType: 0,
        data: null,
        isGlobalComponent: false,
      };

      if (!layers.length) {
        setPageData(`${currentPageId}.layers`, [spacer]);
      } else {
        const cloneLayers = [...layers];
        const nextIndex =
          overData?.index > -1 ? overData.index : layers.length - 1;

        cloneLayers.splice(nextIndex, 0, spacer);
        setPageData(`${currentPageId}.layers`, cloneLayers);
      }

      insertedSpacerRef.current = true;
    } else if (!over) {
      cleanUp();
    } else {
      const spacerIndex = layers.findIndex(
        (layer) => layer.id === `spacer_${active.id}`
      );

      const nextIndex =
        overData.index > -1 ? overData.index : layers.length - 1;

      if (nextIndex === spacerIndex) {
        return;
      }

      const sortedLayers = arrayMove(layers, spacerIndex, overData.index);
      setPageData(`${currentPageId}.layers`, sortedLayers);
    }
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { over, active } = e;
    const activeData = active.data?.current ?? {};
    const cloneLayers = [...layers];

    if (!over) {
      cleanUp();
      return;
    }

    const spacerIndex = layers.findIndex(
      (layer) => layer.componentName === "Spacer"
    );

    cloneLayers.splice(spacerIndex, 1, activeData?.layer);
    setPageData(`${currentPageId}.layers`, cloneLayers);
    setSelectedLayer(activeData?.layer?.id);
    insertedSpacerRef.current = false;
  };

  return (
    <DndContext
      autoScroll
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      {children}
    </DndContext>
  );
};
