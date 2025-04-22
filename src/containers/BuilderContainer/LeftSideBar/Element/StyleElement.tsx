"use client";

import { twMerge } from "tailwind-merge";
import {
  ElementProps,
  Element,
  ElementLabel,
  ElementThumbnail,
} from "./Element";
import { Button } from "@internalComponents/Button";
import { ArrowRightSmallIcon } from "../../../../assets/icons";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { nanoid } from "nanoid";
import { useRef } from "react";
import { useLeftSideBarStore } from "@stores/builderStore";
import { components } from "@builder/meta";

interface StyleElementProps extends ElementProps {
  type: number;
}

export const StyleElement = ({ label, type, thumbnail }: StyleElementProps) => {
  const dragId = useRef(`style_${type}_${nanoid()}`);
  const selectedCompName = useLeftSideBarStore(
    (state) => state.selectedCompName
  );
  const { attributes, listeners, transform, setNodeRef, setActivatorNodeRef } =
    useDraggable({
      id: dragId.current,
      data: {
        layer: {
          id: dragId.current,
          layerTitle: label,
          componentName: selectedCompName,
          styleType: type,
          data: components[selectedCompName]?.data,
          isGlobalComponent: false,
        },
        thumbnail,
        fromSidebar: true,
      },
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <Element>
      <ElementLabel>{label}</ElementLabel>
      <ElementThumbnail className="group-hover:bg-neutral-300 aspect-16/10 group-hover:border-neutral-400 transition-colors p-6">
        {thumbnail}
        <div
          ref={setNodeRef}
          style={style}
          className={twMerge(
            "absolute inset-0 bg-neutral-900 opacity-0 invisible",
            "group-hover:visible group-hover:opacity-20 transition-all duration-200 z-[1]"
          )}
        />
        <Button
          ref={(ref) => setActivatorNodeRef(ref as unknown as HTMLElement)}
          {...attributes}
          {...listeners}
          variant="secondary"
          label="Select Style"
          icon={<ArrowRightSmallIcon width="1.25rem" height="1.25rem" />}
          className={twMerge(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 invisible",
            "group-hover:visible group-hover:opacity-100 transition-all duration-200 z-[2] cursor-grab"
          )}
        />
      </ElementThumbnail>
    </Element>
  );
};
