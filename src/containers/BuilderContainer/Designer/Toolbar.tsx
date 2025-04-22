import { components } from "@builder/meta";
import {
  AngleLeftIcon,
  AngleRightIcon,
  TrashTimesIcon,
} from "../../../assets/icons";
import { useMemo } from "react";
import { Layer, useBuilderStore } from "@stores/builderStore";
import { Button } from "@internalComponents/Button";
import { Separator } from "@builderComponents/ui/Separator";

export const ToolBar = ({
  styleType: selectedStyle,
  id,
  componentName,
}: Layer) => {
  const [removeLayer, setLayerStyle] = useBuilderStore((state) => [
    state.removeLayer,
    state.setLayerStyle,
  ]);

  const { nextStyle, prevStyle } = useMemo(() => {
    const compStyles = components?.[componentName]?.styles ?? [];
    const index = compStyles.findIndex((style) => style.type === selectedStyle);

    return {
      nextStyle: compStyles?.[index + 1],
      prevStyle: compStyles?.[index - 1],
    };
  }, [componentName, selectedStyle]);

  const onNextStyle = () => {
    setLayerStyle(id, nextStyle.type);
  };

  const onPrevStyle = () => {
    setLayerStyle(id, prevStyle.type);
  };

  return (
    <div className="flex items-center p-1">
      <div className="flex p-2 gap-2">
        <Button
          icon={<AngleLeftIcon width="1rem" height="1rem" />}
          variant="soft"
          size="xs"
          onClick={onPrevStyle}
          disabled={!prevStyle}
        />
        <p className="font-medium text-xs leading-6">Change style</p>
        <Button
          icon={<AngleRightIcon width="1rem" height="1rem" />}
          variant="soft"
          size="xs"
          onClick={onNextStyle}
          disabled={!nextStyle}
        />
      </div>
      <Separator orientation="vertical" className="h-5 mx-1" />
      <Button
        icon={<TrashTimesIcon width="1.25rem" height="1.25rem" />}
        variant="soft"
        size="sm"
        onClick={() => removeLayer(id)}
      />
    </div>
  );
};
