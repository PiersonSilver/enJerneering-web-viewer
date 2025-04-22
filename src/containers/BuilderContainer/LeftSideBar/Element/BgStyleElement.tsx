import { twMerge } from "tailwind-merge";
import {
  ElementProps,
  Element,
  ElementLabel,
  ElementThumbnail,
} from "./Element";
import { ArrowRightSmallIcon } from "../../../../assets/icons";
import { Button } from "@internalComponents/Button";

interface BgStyleElementProps extends ElementProps {
  isSelected: boolean;
  type: number;
}

export const BgStyleElement = ({
  label,
  isSelected,
  thumbnail,
}: BgStyleElementProps) => {
  const onSelectStyle = () => {
    //TODO: handle select style
  };

  return (
    <Element>
      <ElementLabel>{label}</ElementLabel>
      <ElementThumbnail className="group-hover:bg-neutral-300 aspect-16/10 group-hover:border-neutral-400 transition-colors p-6">
        <div className="w-full h-full bg-white rounded-lg">{thumbnail}</div>
        <div
          className={twMerge(
            "absolute inset-0 bg-neutral-900 opacity-0 invisible",
            "group-hover:visible group-hover:opacity-20 transition-all duration-200 z-[1]"
          )}
        />
        <Button
          variant="secondary"
          label="Select Style"
          icon={<ArrowRightSmallIcon width="1.25rem" height="1.25rem" />}
          onClick={onSelectStyle}
          className={twMerge(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 invisible",
            "group-hover:visible group-hover:opacity-100 transition-all duration-200 z-[2] cursor-grab"
          )}
        />
      </ElementThumbnail>
    </Element>
  );
};
