import { Badge } from "@builderComponents/ui/Badge";
import { CloseIcon, PlusIcon } from "../../../../src/assets/icons";
import { Button } from "@internalComponents/Button";
import { InputText } from "@internalComponents/Input";
import {
  ChangeEvent,
  FocusEventHandler,
  forwardRef,
  KeyboardEvent,
  useState,
} from "react";
import _xor from "lodash/xor";

type KeywordInputProps = {
  name: string;
  value: string[];
  placeholder: string;
  disabled?: boolean;
  onChange: (value: string[]) => void;
  onBlur: FocusEventHandler<HTMLInputElement>;
};

export const KeywordInput = forwardRef<HTMLInputElement, KeywordInputProps>(
  ({ name, value, placeholder, disabled, onBlur, onChange }, ref) => {
    const [rawValue, setRawValue] = useState("");

    const transformValue = (value: string) => {
      return value
        .split(",")
        .map((keyword) => keyword.toLowerCase().trim())
        .filter((keyword) => !!keyword);
    };

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setRawValue(e.target.value);
    };

    const OnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onAddKeyWord();
      }
    };

    const onAddKeyWord = () => {
      const keywords = transformValue(rawValue);

      onChange(_xor(value, keywords));
      setRawValue("");
    };

    const onRemoveKeyword = (keyword: string) => () => {
      onChange(_xor(value, [keyword]));
    };

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <InputText
            onBlur={onBlur}
            name={name}
            ref={ref}
            placeholder={placeholder}
            onChange={onInputChange}
            disabled={disabled}
            className="flex-1"
            size="lg"
            onKeyDown={OnKeyDown}
            value={rawValue}
          />
          <Button
            label="Add Keywords"
            icon={<PlusIcon width="1.5rem" height="1.5rem" />}
            variant="dark"
            onClick={onAddKeyWord}
            disabled={disabled || !rawValue}
            size="xl"
            type="button"
          />
        </div>
        <div className="flex gap-2 flex-wrap max-w-full">
          {value.map((keyword) => (
            <Badge key={keyword}>
              <span className="truncate overflow-hidden max-w-xs">
                {keyword}
              </span>
              <CloseIcon
                width="0.75rem"
                height="0.75rem"
                onClick={onRemoveKeyword(keyword)}
                className="cursor-pointer"
              />
            </Badge>
          ))}
        </div>
      </div>
    );
  }
);
KeywordInput.displayName = "KeywordInput";
