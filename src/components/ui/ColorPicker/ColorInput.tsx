import { ComponentPropsWithoutRef } from "react";
import { ColorPicker } from "./ColorPicker";

export type ColorInputProps = {
  label: string;
} & ComponentPropsWithoutRef<typeof ColorPicker>;

export const ColorInput = ({ label, ...props }: ColorInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">{label}</span>
      <ColorPicker {...props} />
    </div>
  );
};
