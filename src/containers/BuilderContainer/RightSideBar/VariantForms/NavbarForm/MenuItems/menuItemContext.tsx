import { useDialog } from "@/_stores/dialogStore";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";
import { StoreApi, create } from "zustand";
import { useStoreWithEqualityFn } from "zustand/traditional";
import fastDeepEqualFn from "react-fast-compare";
import { NavbarMenu } from "@components/Navbar/types/NavbarData";
import { MenuItemsDialogPayload } from "../../../../../../dialogs/builder/MenuItemsDialog";

type MenuItemsProps = {
  menu: NavbarMenu[];
  onChange: (menu: NavbarMenu[]) => void;
};

interface MenuItemsContextValues extends MenuItemsProps {
  onRemoveMenuItem: (menuId: string) => void;
  onAddMenuItem: () => void;
}

const MenuItemsSettingContext =
  createContext<StoreApi<MenuItemsContextValues> | null>(null);

const MenuItemsContextProvider = ({
  menu,
  onChange,
  children,
}: PropsWithChildren<MenuItemsProps>) => {
  const store = useRef<StoreApi<MenuItemsContextValues> | null>(null);
  const { open } = useDialog<MenuItemsDialogPayload>("navBarMenuItems");

  const onRemoveMenuItem = (menuItemId: string) => {
    const menu = store.current?.getState().menu ?? [];
    const newMenuItems = menu.filter((menuItem) => menuItem.id !== menuItemId);

    onChange(newMenuItems);
  };

  const onAddMenuItem = () => {
    open({
      id: "navBarMenuItems",
      data: { onChange, values: menu },
    });
  };

  if (!store.current) {
    store.current = create<MenuItemsContextValues>()((set) => ({
      menu,
      onChange,
      onAddMenuItem,
      onRemoveMenuItem,
    }));
  }

  useEffect(() => {
    if (menu) {
      store.current?.setState({
        menu,
      });
    }
  }, [menu]);

  return (
    <MenuItemsSettingContext.Provider value={store.current}>
      {children}
    </MenuItemsSettingContext.Provider>
  );
};

const useMenuItems = <T,>(selector?: (state: MenuItemsContextValues) => T) => {
  const store = useContext(MenuItemsSettingContext);

  if (!store) {
    throw new Error("Missing MenuItemsContextProvider");
  }

  return useStoreWithEqualityFn(store, selector!, fastDeepEqualFn);
};

export { MenuItemsContextProvider, useMenuItems };
