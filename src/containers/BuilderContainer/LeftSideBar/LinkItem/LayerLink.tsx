"use client";

import { CSSProperties, useMemo } from "react";
import { MenuItem } from "primereact/menuitem";
import {
  DragVerticalIcon,
  ImageGalleryIcon,
  TrashMinusOutlineIcon,
} from "../../../../assets/icons";
import { LinkItem, LinkItemLabel, LinkItemMenu } from "./LinkItem";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Layer, useBuilderStore } from "@stores/builderStore";
import { components } from "@builder/meta";

export interface LayerLinkProps extends Pick<Layer, "id" | "componentName"> {}

const menuIconSize = "1rem";

export const LayerLink = ({ id, componentName }: LayerLinkProps) => {
  const removeLayer = useBuilderStore((state) => state.removeLayer);
  const setSelectedLayer = useBuilderStore((state) => state.setSelectedLayer);

  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
    data: {
      id,
      componentName,
    },
  });

  const compLabel = components?.[componentName]?.label;
  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const layerMenu = useMemo<MenuItem[]>(
    () => [
      {
        label: "Edit Layer",
        icon: <ImageGalleryIcon width={menuIconSize} height={menuIconSize} />,
        command: () => {
          setSelectedLayer(id);
        },
      },
      {
        label: "Delete layer",
        className: "text-error-600",
        icon: (
          <TrashMinusOutlineIcon width={menuIconSize} height={menuIconSize} />
        ),
        command: () => {
          removeLayer(id);
        },
      },
    ],
    [id, removeLayer, setSelectedLayer]
  );

  return (
    <div ref={setNodeRef} style={style}>
      <LinkItem className="cursor-default">
        <button
          {...attributes}
          {...listeners}
          ref={setActivatorNodeRef}
          className="rounded-md hover:bg-neutral-200 px-0.5 py-1 transition-colors cursor-grab"
        >
          <DragVerticalIcon width="1rem" height="1rem" />
        </button>
        <LinkItemLabel>{compLabel}</LinkItemLabel>
        <LinkItemMenu menu={layerMenu} />
      </LinkItem>
    </div>
  );
};
