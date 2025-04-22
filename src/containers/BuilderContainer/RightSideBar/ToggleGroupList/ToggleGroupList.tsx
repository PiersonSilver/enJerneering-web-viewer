import { ToggleGroup, ToggleGroupItem } from "@internalComponents/ToggleGroup";
import _map from "lodash/map";

export interface ToggleOption {
  content: React.ReactNode;
  value: any;
  id?: string;
}

interface ToggleGroupProps {
  type: "multiple" | "single";
  value: any;
  onValueChange: (value: any) => void;
  options: ToggleOption[];
}

export const VariantsGroup: React.FC<ToggleGroupProps> = ({
  type,
  value,
  onValueChange,
  options,
}) => (
  <ToggleGroup type={type} value={value} onValueChange={onValueChange}>
    {_map(options, (option, index) => (
      <ToggleGroupItem
        className="data-[state=on]:text-white text-sm data-[state=on]:bg-neutral-900"
        value={option.value}
        key={index}
      >
        {option.content}
      </ToggleGroupItem>
    ))}
  </ToggleGroup>
);
