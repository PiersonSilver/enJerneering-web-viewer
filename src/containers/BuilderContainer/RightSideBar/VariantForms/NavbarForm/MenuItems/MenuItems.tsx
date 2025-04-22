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
  PlusIcon,
  SettingsOutlineIcon,
} from "../../../../../../assets/icons";
import { CSSProperties, MouseEventHandler, useState } from "react";
import { createPortal } from "react-dom";
import { Button, iconButtonVariants } from "@internalComponents/Button";
import { Tooltip } from "@internalComponents/Tooltip";
import { MenuItemsContextProvider, useMenuItems } from "./menuItemContext";
import { NavbarMenu } from "@components/Navbar/types/NavbarData";

const MenuItems = MenuItemsContextProvider;

const MenuItemList = () => {
  const [menu, onChange] = useMenuItems((state) => [
    state.menu,
    state.onChange,
  ]);

  const [draggingMenuItem, setDraggingMenuItem] = useState<NavbarMenu>();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDragStart = (e: DragStartEvent) => {
    const activeData = e.active.data.current as NavbarMenu;

    if (activeData) {
      setDraggingMenuItem(activeData);
    }
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over?.id) {
      const activeIndex = menu.findIndex(({ id }) => id === active.id);
      const overIndex = menu.findIndex(({ id }) => id === over.id);

      onChange(arrayMove(menu, activeIndex, overIndex));
    }

    setDraggingMenuItem(undefined);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={menu} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {menu.map((item) => (
            <MenuItem key={item.id} {...item} />
          ))}
        </div>
        {createPortal(
          <DragOverlay>
            {draggingMenuItem ? <MenuItem {...draggingMenuItem} /> : null}
          </DragOverlay>,
          document.body
        )}
      </SortableContext>
    </DndContext>
  );
};

const MenuItem = (props: NavbarMenu) => {
  const { id, title } = props;

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
    //TODO
  };

  const handleUpdate = () => {
    //TODO
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex group p-3 pl-2 gap-3 border border-neutral-200 rounded-lg items-center bg-neutral-50 hover:bg-neutral-100 transition-colors"
    >
      <button
        {...attributes}
        {...listeners}
        ref={setActivatorNodeRef}
        className="rounded-md hover:bg-neutral-200 px-0.5 py-1 transition-colors cursor-grab"
      >
        <DragVerticalIcon width="1rem" height="1rem" />
      </button>
      <span className="truncate">{title}</span>
      <Button
        size="xs"
        variant="soft"
        className="text-neutral-500 ml-auto"
        icon={<SettingsOutlineIcon width="1rem" height="1rem" />}
        onClick={handleUpdate}
      />
    </div>
  );
};

const MenuItemsAddBtn = ({ className }: PropsWithClassName) => {
  const onAddMenuItem = useMenuItems((state) => state.onAddMenuItem);

  const handleAddButton: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    onAddMenuItem();
  };

  return (
    <>
      <span
        id="addMenuItemsBtn"
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
        target="#addMenuItemsBtn"
        position="top"
        className="w-max"
      />
    </>
  );
};

export { MenuItems, MenuItemList, MenuItemsAddBtn };
