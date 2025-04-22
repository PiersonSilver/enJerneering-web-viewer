"use client";

import { ButtonSettingsItem } from "./ButtonSettingsItem";
import { iconButtonVariants } from "@internalComponents/Button";
import { PlusIcon } from "../../../../assets/icons";
import {
  ButtonSettingsContextProvider,
  useButtonSettings,
} from "./ButtonSettingsContext";
import { MouseEventHandler } from "react";

const ButtonSettings = ButtonSettingsContextProvider;

const ButtonSettingsList = () => {
  const buttons = useButtonSettings((state) => state.buttons);
  const onRemoveButton = useButtonSettings((state) => state.onRemoveButton);
  const openBtnSettings = useButtonSettings((state) => state.openBtnSettings);

  if (!buttons.length) {
    return <p>Empty Buttons</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {buttons.map((button) => (
        <ButtonSettingsItem
          key={button.id}
          onOpenSettings={openBtnSettings}
          onRemove={onRemoveButton}
          {...button}
        />
      ))}
    </div>
  );
};

const ButtonSettingsAddBtn = (props: PropsWithClassName) => {
  const onAddButton = useButtonSettings((state) => state.onAddButton);

  const handleAddButton: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    onAddButton();
  };

  return (
    <span
      className={iconButtonVariants({
        variant: "secondary",
        size: "xs",
        className: props.className,
      })}
      onClick={handleAddButton}
    >
      <PlusIcon width="1.25rem" height="1.25rem" />
    </span>
  );
};

export { ButtonSettings, ButtonSettingsAddBtn, ButtonSettingsList };
