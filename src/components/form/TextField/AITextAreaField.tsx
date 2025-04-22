import { AskAIPopover } from "@internalComponents/AskAIPopover";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@internalComponents/FormField";
import { InputTextarea } from "@internalComponents/Input";
import { FieldPath, FieldValues } from "react-hook-form";
import { TextAreaFieldProps } from "./type";
import { twMerge } from "tailwind-merge";

export const AITextAreaField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  size = "md",
  minRows = 4,
  className,
  enableAI = true,
  ...props
}: TextAreaFieldProps<TFieldValues, TName>) => {
  return (
    <FormField
      {...{ control, name }}
      render={({ field }) => (
        <FormItem className="flex-1 space-y-0.5">
          <FormLabel size={size}>
            <div className="flex items-center">
              {label}
              {/* TODO: apply AI suggestion */}
              {enableAI && <AskAIPopover onGenerated={() => {}} />}
            </div>
          </FormLabel>
          <FormControl>
            <InputTextarea
              size={size}
              minRows={minRows}
              className={twMerge("w-full")}
              {...field}
              {...props}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
