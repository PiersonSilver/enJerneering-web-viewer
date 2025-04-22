import { twMerge } from "tailwind-merge";
import {
  ElementProps,
  Element,
  ElementLabel,
  ElementThumbnail,
} from "./Element";
import { ArrowRightSmallIcon } from "../../../../assets/icons";
import { Button } from "@internalComponents/Button";
import { v4 as uuidv4 } from "uuid";
import { GlobalConfig, Layer, useBuilderStore } from "@stores/builderStore";
import { useLeftSideBarStore } from "@stores/builderStore";
import { components } from "@builder/meta";

interface GlobalConfigElementProps extends ElementProps {
  isSelected: boolean;
  type: number;
  globalConfigKey: keyof Omit<GlobalConfig, "background">;
  hasSetup: boolean;
}

export const GlobalConfigElement = ({
  label,
  isSelected,
  type,
  thumbnail,
  globalConfigKey,
  hasSetup,
}: GlobalConfigElementProps) => {
  const setGlobalConfig = useBuilderStore((state) => state.setGlobalConfig);
  const getGlobalConfig = useBuilderStore((state) => state.getGlobalConfig);
  const selectedCompName = useLeftSideBarStore(
    (state) => state.selectedCompName
  );

  const onSelect = () => {
    if (hasSetup) {
      setGlobalConfig(globalConfigKey, {
        styleType: type,
      });
      console.log("HAS SETUP SELECTED STYLE");
    } else {
      setGlobalConfig(globalConfigKey, {
        id: `style_${type}_${uuidv4()}`,
        layerTitle: label,
        componentName: selectedCompName,
        styleType: type,
        data: components[selectedCompName]?.data,
        isGlobalComponent: true,
      });
      console.log(getGlobalConfig())
      console.log("NO SETUP DATA SELECTED STYLE")
    }
  };

  return (
    <Element>
      <ElementLabel>{label}</ElementLabel>
      <ElementThumbnail
        className={twMerge(
          "group-hover:bg-neutral-300 aspect-16/10 group-hover:border-neutral-400 p-6",
          isSelected &&
            "border-neutral-500 bg-neutral-200 group-hover:bg-neutral-200"
        )}
      >
        <div className="w-full h-full bg-white rounded-lg">{thumbnail}</div>
        <div
          className={twMerge(
            "absolute inset-0 bg-neutral-900 opacity-0 invisible",
            "group-hover:visible group-hover:opacity-20 transition-all duration-200 z-[1]",
            isSelected && "group-hover:opacity-0 group-hover:invisible"
          )}
        />
        <Button
          variant="secondary"
          label="Select Style"
          icon={<ArrowRightSmallIcon width="1.25rem" height="1.25rem" />}
          onClick={onSelect}
          className={twMerge(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 invisible",
            "group-hover:visible group-hover:opacity-100 transition-all duration-200 z-[2] cursor-grab",
            isSelected && "group-hover:opacity-0 group-hover:invisible"
          )}
        />
      </ElementThumbnail>
    </Element>
  );
};
