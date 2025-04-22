import { Social } from "@components/Footer/types/FooterData";
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
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  DragVerticalIcon,
  PenLineIcon,
  PlusIcon,
  TrashMinusOutlineIcon,
} from "../../../../assets/icons";
import { CSSProperties, MouseEventHandler, useState } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";
import {
  SocialMediaContextProvider,
  useSocialMedia,
} from "./SocialMediaContext";
import { Button, iconButtonVariants } from "@internalComponents/Button";
import { Tooltip } from "@internalComponents/Tooltip";

const SocialMedia = SocialMediaContextProvider;

const SocialMediaList = () => {
  const [socials, onChange] = useSocialMedia((state) => [
    state.socials,
    state.onChange,
  ]);

  const [draggingSocial, setDraggingSocial] = useState<Social>();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDragStart = (e: DragStartEvent) => {
    const activeData = e.active.data.current as Social;

    if (activeData) {
      setDraggingSocial(activeData);
    }
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over?.id) {
      const activeIndex = socials.findIndex(({ id }) => id === active.id);
      const overIndex = socials.findIndex(({ id }) => id === over.id);

      onChange(arrayMove(socials, activeIndex, overIndex));
    }

    setDraggingSocial(undefined);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={socials} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {socials.map((social) => (
            <SocialIconItem key={social.id} {...social} />
          ))}
        </div>
        {createPortal(
          <DragOverlay>
            {draggingSocial ? <SocialIconItem {...draggingSocial} /> : null}
          </DragOverlay>,
          document.body
        )}
      </SortableContext>
    </DndContext>
  );
};

const SocialIconItem = (props: Social) => {
  const { id, icon, url } = props;

  const onUpdateSocial = useSocialMedia((state) => state.onUpdateSocial);
  const onRemoveSocial = useSocialMedia((state) => state.onRemoveSocial);

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
    data: props,
  });

  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const handleRemove = () => {
    onRemoveSocial(id);
  };

  const handleUpdate = () => {
    onUpdateSocial(props);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex group p-3 pl-2 gap-3 border border-neutral-200 rounded-lg items-center bg-white"
    >
      <button
        {...attributes}
        {...listeners}
        ref={setActivatorNodeRef}
        className="rounded-md hover:bg-neutral-200 px-0.5 py-1 transition-colors cursor-grab"
      >
        <DragVerticalIcon width="1rem" height="1rem" />
      </button>
      <i className={twMerge("pi text-neutral-700 text-xl", icon)} />
      <span className="truncate">{url}</span>
      <div className="ml-auto flex gap-2 items-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity">
        <Button
          size="xs"
          variant="soft"
          icon={<PenLineIcon width="1rem" height="1rem" />}
          onClick={handleUpdate}
        />
        <Button
          size="xs"
          variant="soft"
          icon={<TrashMinusOutlineIcon width="1rem" height="1rem" />}
          className="text-error-600"
          onClick={handleRemove}
        />
      </div>
    </div>
  );
};

const SocialMediaAddBtn = ({ className }: PropsWithClassName) => {
  const onAddSocial = useSocialMedia((state) => state.onAddSocial);

  const handleAddButton: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    onAddSocial();
  };

  return (
    <>
      <span
        id="addSocialMedia"
        className={iconButtonVariants({
          variant: "secondary",
          size: "xs",
          className: className,
        })}
        onClick={handleAddButton}
      >
        <PlusIcon width="1.25rem" height="1.25rem" />
      </span>
      <Tooltip
        content="Add Menu Items"
        target="#addSocialMedia"
        position="top"
        className="w-max"
      />
    </>
  );
};

export { SocialMedia, SocialMediaList, SocialMediaAddBtn };
