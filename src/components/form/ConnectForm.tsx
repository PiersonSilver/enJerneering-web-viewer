import { ReactNode } from "react";
import { FieldValues, useFormContext, UseFormReturn } from "react-hook-form";

export type ConnectFormProps<
  TFieldValues extends FieldValues,
  TContext = any,
  TransformedValues extends FieldValues | undefined = undefined,
> = {
  children: (
    methods: UseFormReturn<TFieldValues, TContext, TransformedValues>
  ) => ReactNode;
};

export const ConnectForm = <
  TFieldValues extends FieldValues,
  TContext = any,
  TransformedValues extends FieldValues | undefined = undefined,
>({
  children,
}: ConnectFormProps<TFieldValues, TContext, TransformedValues>) => {
  const methods = useFormContext<TFieldValues, TContext, TransformedValues>();

  return children({ ...methods });
};
