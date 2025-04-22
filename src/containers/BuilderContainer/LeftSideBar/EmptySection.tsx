import { PlusIcon } from "../../../assets/icons";
import { Button } from "@internalComponents/Button";

interface EmptySectionProps {
  message: string;
  addButtonText: string;
  onAddButtonClick: () => void;
}

export const EmptySection = ({
  message,
  addButtonText,
  onAddButtonClick,
}: EmptySectionProps) => {
  return (
    <div className="flex flex-col items-center border border-border-200 p-6 rounded-2xl bg-neutral-50">
      <p className="text-sub-500 text-base font-medium mb-4">{message}</p>
      <Button
        onClick={onAddButtonClick}
        label={addButtonText}
        variant="dark"
        icon={<PlusIcon width="1.25rem" height="1.25rem" />}
      />
    </div>
  );
};
