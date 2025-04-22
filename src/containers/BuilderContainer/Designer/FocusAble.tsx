import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { Layer, useBuilderStore } from "@stores/builderStore";
import {
  Popover,
  PopoverContent,
  PopoverAnchor,
} from "@internalComponents/Popover";
import { createPortal } from "react-dom";
import { autoUpdate, size, useFloating, offset } from "@floating-ui/react-dom";
import { ToolBar } from "./Toolbar";

interface FocusAbleCompProps {
  layer: Layer;
  isSelected: boolean;
  showToolbar?: boolean;
}

const Rect = ({ className }: PropsWithClassName) => {
  return (
    <div
      className={twMerge(
        "absolute z-[9999] w-2 h-2 ring ring-primary-600 bg-white rounded-1",
        className
      )}
    />
  );
};

export const FocusAbleComp = ({
  children,
  isSelected,
  showToolbar = true,
  layer,
}: PropsWithChildren<FocusAbleCompProps>) => {
  const selectLayer = useBuilderStore((state) => state.setSelectedLayer);
  const { refs, floatingStyles } = useFloating({
    strategy: "absolute",
    whileElementsMounted: (...args) => {
      const cleanup = autoUpdate(...args, {
        animationFrame: true,
      });
      return cleanup;
    },
    middleware: [
      size({
        apply: ({ elements, rects }) => {
          const { width: anchorWidth, height: anchorHeight } = rects.reference;
          const contentStyle = elements.floating.style;

          contentStyle.setProperty("--anchor-width", `${anchorWidth}px`);
          contentStyle.setProperty("--anchor-height", `${anchorHeight}px`);
        },
      }),
      offset(({ rects }) => {
        return -rects.reference.height / 2 - rects.floating.height / 2;
      }),
    ],
  });

  const onSelected = () => {
    selectLayer(layer.id);
  };

  return (
    <Popover open={isSelected && showToolbar}>
      <PopoverAnchor asChild>
        <div ref={refs.setReference} id={layer.id}>
          {children}
        </div>
      </PopoverAnchor>
      {createPortal(
        <div
          onClick={onSelected}
          className={twMerge(
            "absolute border-4 z-50 border-transparent inset-0 cursor-pointe",
            "w-[--anchor-width] h-[--anchor-height]",
            isSelected && "border-primary-600"
          )}
          ref={refs.setFloating}
          style={floatingStyles}
        >
          {isSelected && (
            <>
              <Rect className="-top-1.5 -left-1.5" />
              <Rect className="-top-1.5 -right-1.5" />
              <Rect className="-bottom-1.5 -right-1.5" />
              <Rect className="-bottom-1.5 -left-1.5" />
            </>
          )}
        </div>,
        document.getElementById("controls-container") ?? document.body
      )}
      <PopoverContent
        align="start"
        side="top"
        alignOffset={4}
        sideOffset={8}
        collisionBoundary={document.getElementById("designer")}
      >
        <ToolBar {...layer} />
      </PopoverContent>
    </Popover>
  );
};
