import { AskAIPopover } from "@internalComponents/AskAIPopover";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@internalComponents/FormField";
import { InputText } from "@internalComponents/Input";
import { FieldPath, FieldValues } from "react-hook-form";
import { TextFieldProps } from "./type";
import { twMerge } from "tailwind-merge";

export const AITextField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  size = "md",
  className,
  enableAI,
  ...props
}: TextFieldProps<TFieldValues, TName>) => {
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
            <InputText
              size={size}
              className={twMerge("w-full", className)}
              {...props}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
