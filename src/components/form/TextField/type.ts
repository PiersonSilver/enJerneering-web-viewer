import { InputTextareaProps, InputTextProps } from "@internalComponents/Input";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";

export type TextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Pick<ControllerProps<TFieldValues, TName>, "control" | "name"> & {
  label: string;
  enableAI?: boolean;
} & InputTextProps;

export type TextAreaFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Pick<ControllerProps<TFieldValues, TName>, "control" | "name"> & {
  label: string;
  enableAI?: boolean;
} & InputTextareaProps;
