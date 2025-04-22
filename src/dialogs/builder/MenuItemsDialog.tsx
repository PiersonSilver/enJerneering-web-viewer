"use client";

import { useBuilderStore } from "@stores/builderStore";
import { Button } from "@internalComponents/Button";
import { Checkbox } from "@internalComponents/Checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@internalComponents/Dialog";
import { useEffect, useMemo, useState } from "react";
import _xor from "lodash/xor";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useDialog } from "@/_stores/dialogStore";
import { NavbarMenu } from "@components/Navbar/types/NavbarData";

type SelectMenuItemProps = {
  label: string;
  value: string;
  checkState: CheckedState;
  isDisabled?: boolean;
  onCheckChange: (value: string) => void;
};

export type MenuItemsDialogPayload = {
  values: NavbarMenu[];
  onChange: (values: NavbarMenu[]) => void;
};

export const MenuItemsDialog = () => {
  const { isOpen, payload, close } =
    useDialog<MenuItemsDialogPayload>("navBarMenuItems");
  const pageOptions = useBuilderStore((state) => state.pageOptions);
  const pages = useBuilderStore((state) => state.pages);
  const [selectedPages, setSelectedPages] = useState<string[]>([]);

  const { onChange, values = [] } = payload?.data ?? {};

  const selectAllState = useMemo<CheckedState>(() => {
    if (pageOptions.length === selectedPages.length) {
      return pageOptions.every((page) => selectedPages.includes(page.value));
    }

    return selectedPages.length === 0 ? false : "indeterminate";
  }, [pageOptions, selectedPages]);

  const selectAll = () => {
    if (!selectAllState || selectAllState === "indeterminate") {
      setSelectedPages(pageOptions.map((page) => page.value));
      return;
    }

    setSelectedPages([]);
  };

  const selectPage: SelectMenuItemProps["onCheckChange"] = (value) => {
    if (value == "all") {
      return selectAll();
    }

    setSelectedPages((selectedList) => _xor(selectedList, [value]));
  };

  const checkSelectedPage = (value: string) => {
    return selectedPages.includes(value);
  };

  const onAddItems = () => {
    const menu: NavbarMenu[] = Object.values(pages)
      .filter((page) => checkSelectedPage(page.pageId))
      .map((page) => ({
        id: page.pageId,
        title: page.pageTitle,
        href: page.pageTitle.toLowerCase().split(" ").join("-"),
      }));

    onChange && onChange(menu);
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setSelectedPages(values.map((v) => v.id));
  }, [isOpen, payload]);

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="rounded-2xl">
        <DialogHeader>
          <DialogTitle>Add Menu Items</DialogTitle>
        </DialogHeader>
        <div className="p-6 space-y-2">
          <SelectMenuItem
            label="Select All"
            checkState={selectAllState}
            onCheckChange={selectAll}
            value="all"
          />
          {pageOptions.map((page) => (
            <SelectMenuItem
              label={page.label}
              key={page.value}
              value={page.value}
              checkState={checkSelectedPage(page.value)}
              onCheckChange={selectPage}
            />
          ))}
        </div>
        <DialogFooter className="items-center">
          <p className="text-sm mr-auto">
            1 selected{" "}
            <span className="text-neutral-500">(max. 5 main pages)</span>
          </p>
          <DialogClose asChild>
            <Button variant="outline" label="Cancel" />
          </DialogClose>
          <DialogClose asChild>
            <Button variant="dark" label="Add Items" onClick={onAddItems} />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const SelectMenuItem = ({
  checkState,
  isDisabled,
  label,
  value,
  onCheckChange,
}: SelectMenuItemProps) => {
  const handleCheckChange = () => {
    onCheckChange(value);
  };

  return (
    <label className="flex items-center gap-2">
      <Checkbox
        checked={checkState}
        onCheckedChange={handleCheckChange}
        disabled={isDisabled}
      />
      <span>{label}</span>
    </label>
  );
};
