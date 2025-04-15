import { ButtonSettingsData } from "@components/types";

export type HeaderData = {
  title: string;
  subtitle: string;
  tagLine?: string;
  buttons: ButtonSettingsData[];
  imgUrl?: string;
  background: string;
  backgroundColor?: string;
  textColor?: string;
  isRowReverse?: boolean;
};
