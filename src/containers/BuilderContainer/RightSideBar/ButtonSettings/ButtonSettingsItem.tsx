import { Button } from "@internalComponents/Button";
import ButtonPreview from "@components/Button";
import { ButtonSettingsData } from "@customTypes/builder";

interface ButtonSettingsItemProps extends ButtonSettingsData {
  onOpenSettings: (buttonData: ButtonSettingsData) => void;
  onRemove: (buttonId: string) => void;
}

export const ButtonSettingsItem = ({
  id,
  buttonProps,
  onRemove,
  onOpenSettings,
}: ButtonSettingsItemProps) => {
  const { externalUrl, actionType, pagePath, ...restButtonProps } = buttonProps;

  const handleRemove = () => onRemove(id);

  const handleOpenSettings = () => onOpenSettings({ id, buttonProps });

  return (
    <div>
      <p className="text-sm font-medium mb-3 capitalize">
        {buttonProps.color} Button
      </p>
      <div className="flex gap-4">
        <div className="py-5 rounded-2xl border border-neutral-300 bg-neutral-50 flex-1 flex justify-center">
          <ButtonPreview {...restButtonProps} />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            label="Settings"
            variant="outline"
            onClick={handleOpenSettings}
          />
          <Button
            label="Remove"
            className="text-red-600"
            variant="outline"
            onClick={handleRemove}
          />
        </div>
      </div>
    </div>
  );
};
