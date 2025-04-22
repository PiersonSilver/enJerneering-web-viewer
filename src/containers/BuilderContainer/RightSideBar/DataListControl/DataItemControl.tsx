import { AngleDownSmallIcon, AngleUpSmallIcon } from "../../../../assets/icons";
import { AskAIPopover } from "@internalComponents/AskAIPopover";
import { Button } from "@internalComponents/Button";
import React, { ChangeEvent, PropsWithChildren } from "react";
import { InputText, InputTextarea } from "@internalComponents/Input";
import { SubHeading } from "@components/MainContent/types/MainContentData";

interface DataItemControlProps extends SubHeading {
  index: number;
  label: string;
  Icon: React.FC;
  onArrange: (index: number, action: ArrangeAction) => void;
  onRemove: (index: number) => void;
  onChange: (field: keyof SubHeading, index: number, value: string) => void;
}

export type ArrangeAction = "up" | "down";

export const DataItemControl = ({
  label,
  index,
  title,
  subtitle,
  Icon,
  onArrange,
  onRemove,
  onChange,
}: PropsWithChildren<DataItemControlProps>) => {
  const handleArrange = (action: ArrangeAction) => () => {
    onArrange(index, action);
  };

  const handleAIGenerated = () => {
    //TODO: handle AI generated
  };

  const handleChange =
    (field: keyof SubHeading) =>
    (e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>) => {
      onChange(field, index, e.target.value);
    };

  const handleRemove = () => {
    onRemove(index);
  };

  return (
    <div className="rounded-lg p-4 border border-neutral-300 bg-neutral-50">
      <div className="flex gap-2 items-center mb-2">
        <span className="font-medium text-xs">{label}</span>
        <div className="mr-auto">
          <AskAIPopover onGenerated={handleAIGenerated} />
        </div>
        <div>
          <Button
            className="text-neutral-700 rounded-r-none"
            size="sm"
            icon={<AngleDownSmallIcon width="1.25rem" height="1.25rem" />}
            onClick={handleArrange("down")}
            variant="soft"
          />
          <Button
            className="text-neutral-700 rounded-l-none"
            size="sm"
            icon={<AngleUpSmallIcon width="1.25rem" height="1.25rem" />}
            onClick={handleArrange("up")}
            variant="soft"
          />
        </div>
      </div>
      <div className="mb-3 space-y-2">
        <InputText
          size="sm"
          placeholder="Enter title"
          onChange={handleChange("title")}
          value={title}
          className="w-full"
          variant="secondary"
        />
        <div className="flex gap-2">
          <div className="px-4 rounded-lg border border-neutral-20 aspect-square flex items-center bg-white">
            <Icon />
          </div>
          <InputTextarea
            size="sm"
            placeholder="Enter sub-title"
            onChange={handleChange("subtitle")}
            value={subtitle}
            className="flex-1"
            minRows={2}
            maxRows={4}
            variant="secondary"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          label="Change icon"
          className="bg-white flex-1"
          variant="outline"
          size="sm"
        />
        <Button
          label="Remove"
          variant="outline"
          className="text-error-600 bg-white flex-1"
          onClick={handleRemove}
          size="sm"
        />
      </div>
    </div>
  );
};
