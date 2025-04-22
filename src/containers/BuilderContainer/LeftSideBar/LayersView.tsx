"use client";

import { Button } from "@internalComponents/Button";
import { Header, HeaderBack, HeaderHeading } from "./Header";
import { PlusIcon } from "../../../assets/icons";
import { LEFT_SIDE_BAR_VIEWS, usePushView } from "@stores/builderStore";
import { EmptySection } from "./EmptySection";
import { Container, ContainerScrollArea } from "./Container";
import { LayerLink, LayerLinkProps } from "./LinkItem";
import { useBuilderStore } from "@stores/builderStore";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { createPortal } from "react-dom";

export const LayersView = () => {
  const [draggingLayer, setDraggingLayer] = useState<LayerLinkProps>();
  const pushView = usePushView();
  const layers = useBuilderStore((state) => state.activeLayers);
  const setPageData = useBuilderStore((state) => state.setPageData);
  const currentPage = useBuilderStore(
    ({ currentPageId, pages }) => pages[currentPageId]
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const showLayerList = !!layers.length;

  const onNewSection = () => {
    pushView(LEFT_SIDE_BAR_VIEWS.SEARCH_ELM);
  };

  const onDragStart = (e: DragStartEvent) => {
    const activeData = e.active.data.current as LayerLinkProps;

    if (activeData) {
      setDraggingLayer(activeData);
    }
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over?.id) {
      const activeIndex = layers.findIndex(({ id }) => id === active.id);
      const overIndex = layers.findIndex(({ id }) => id === over.id);

      setPageData(
        [currentPage.pageId, "layers"],
        arrayMove(layers, activeIndex, overIndex)
      );
    }

    setDraggingLayer(undefined);
  };

  return (
    <Container>
      <Header>
        <HeaderBack />
        <HeaderHeading>{currentPage.pageTitle}</HeaderHeading>
        {showLayerList && (
          <Button
            icon={<PlusIcon width="1.25rem" height="1.25rem" />}
            variant="dark"
            label="New section"
            onClick={onNewSection}
          />
        )}
      </Header>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <SortableContext items={layers} strategy={verticalListSortingStrategy}>
          <ContainerScrollArea>
            {showLayerList ? (
              layers.map(({ id, componentName }) => (
                <LayerLink key={id} id={id} componentName={componentName} />
              ))
            ) : (
              <EmptySection
                message={"Start by adding your first section"}
                addButtonText={"New Section"}
                onAddButtonClick={onNewSection}
              />
            )}
          </ContainerScrollArea>
          {createPortal(
            <DragOverlay>
              {draggingLayer ? (
                <LayerLink
                  id={draggingLayer.id}
                  componentName={draggingLayer.componentName}
                />
              ) : null}
            </DragOverlay>,
            document.body
          )}
        </SortableContext>
      </DndContext>
    </Container>
  );
};
