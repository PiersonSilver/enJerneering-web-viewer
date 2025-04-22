import { ReactNode, useState } from "react";
import {
  DragOverlay as DragOverlayComp,
  DragStartEvent,
  useDndMonitor,
} from "@dnd-kit/core";
import { ElementThumbnail } from "./LeftSideBar/Element";

export const DragOverlay = () => {
  const [draggingElmThumbnail, setDraggingElmThumbnail] =
    useState<ReactNode>(null);

  const onDragStart = (e: DragStartEvent) => {
    const { active } = e;
    const activeData = active.data.current ?? {};

    setDraggingElmThumbnail(activeData?.thumbnail);
  };

  useDndMonitor({
    onDragStart,
  });

  return (
    <DragOverlayComp>
      {draggingElmThumbnail && (
        <ElementThumbnail>{draggingElmThumbnail}</ElementThumbnail>
      )}
    </DragOverlayComp>
  );
};
