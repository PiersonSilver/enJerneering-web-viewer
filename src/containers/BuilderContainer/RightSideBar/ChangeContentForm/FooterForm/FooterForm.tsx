import { InfoCircleIcon } from "../../../../../assets/icons";
import { AskAIPopover } from "@internalComponents/AskAIPopover";
import { useBuilderStore } from "@stores/builderStore";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@internalComponents/FormField";
import { InputTextarea } from "@internalComponents/Input";
import { produce } from "immer";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type FooterFormValues = {
  slogan: string;
  copyRight: string;
};

export const FooterForm = () => {
  const [footer, setGlobalConfig] = useBuilderStore((state) => [
    state.globalConfig.footer,
    state.setGlobalConfig,
  ]);

  const useFormReturn = useForm<FooterFormValues>({
    mode: "onChange",
    defaultValues: {
      slogan: footer?.data.slogan,
      copyRight: footer?.data.copyRight,
    },
  });

  const { control, watch } = useFormReturn;

  useEffect(() => {
    const subscription = watch((values, { name }) => {
      setGlobalConfig("footer", {
        data: produce(footer?.data, (draft: any) => {
          if (name) {
            draft[name] = values[name];
          }
        }),
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [footer?.data, setGlobalConfig, watch]);

  return (
    <Form {...useFormReturn}>
      <div className="space-y-4">
        <FormField
          control={control}
          name="slogan"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>
                <div className="flex items-center">
                  Sub-text
                  <AskAIPopover onGenerated={() => {}} />
                </div>
              </FormLabel>
              <FormControl>
                <InputTextarea
                  placeholder="Enter sub-text"
                  className="w-full"
                  size="sm"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="copyRight"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>
                <div className="flex items-center gap-2">
                  Copyright content
                  <InfoCircleIcon
                    width="1rem"
                    height="1rem"
                    className="text-neutral-500"
                  />
                </div>
              </FormLabel>
              <FormControl>
                <InputTextarea
                  placeholder="Enter copyright content"
                  className="w-full"
                  size="sm"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
};
