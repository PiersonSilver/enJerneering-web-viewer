"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@internalComponents/Popover";
import { CSSProperties } from "react";
import { HexAlphaColorPicker, HexColorInput } from "react-colorful";
import { colord } from "colord";

import "./ColorPickerStyle.css";
import { AlphaInput } from "./AlphaInput";

interface ColorPickerProps {
  color: string;
  setColor: (color: string) => void;
}

export const ColorPicker = ({ color, setColor }: ColorPickerProps) => {
  const colorPickerStyle = { "--color-picker": color } as CSSProperties;
  const alpha = +colord(color).alpha();

  const onChangeAlpha = (alpha: number) => {
    const newColor = colord(color).alpha(alpha).toHex();
    setColor(newColor);
  };

  return (
    <Popover>
      <PopoverTrigger className="p-1 w-16 px-1 rounded-lg border border-neutral-300 bg-zinc-50">
        <span
          style={colorPickerStyle}
          className="block h-6 rounded bg-[var(--color-picker)]"
        />
      </PopoverTrigger>
      <PopoverContent align="start" className="shadow-menu">
        <HexAlphaColorPicker
          className={"color-picker"}
          color={color}
          onChange={setColor}
        />
        <div className="color-input">
          <span className="color-format">Hex</span>
          <div className="input-group">
            <HexColorInput
              alpha
              color={color}
              onChange={setColor}
              className="hex-input"
              prefixed
            />
            <AlphaInput
              className="hex-alpha"
              alpha={alpha}
              onChange={onChangeAlpha}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
