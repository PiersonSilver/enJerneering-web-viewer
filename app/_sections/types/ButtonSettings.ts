import React, { SVGProps } from "react";
import { ButtonProps } from "@components/Button";

// Enum moved into the same file
export enum BUTTON_ACTIONS {
  TO_EXTERNAL = "toExternal",
  TO_PAGE = "toPage",
  PAGE_LINK = "PAGE_LINK",
  someAction = "someAction",
}

export interface ButtonSettingsData {
  id: string;
  buttonProps: {
    actionType: BUTTON_ACTIONS;
    externalUrl?: string;
    pagePath?: string;
  } & ButtonProps;
}

export interface ButtonActionOptions extends Option<BUTTON_ACTIONS> {
  icon: React.FC<SVGProps<SVGElement>>;
}
