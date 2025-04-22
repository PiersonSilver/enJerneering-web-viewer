import React, { SVGProps } from "react";
import { ButtonProps } from "@components/Button";
import { BUTTON_ACTIONS } from "../../enums/builder";

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
