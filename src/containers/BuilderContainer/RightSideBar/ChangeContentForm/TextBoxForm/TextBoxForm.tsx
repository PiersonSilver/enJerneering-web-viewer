import { AITextField } from "@builderComponents/form/TextField";
import { InfoCircleIcon } from "@icons";
import { FormField, FormItem, FormLabel } from "@internalComponents/FormField";
import { InputTextarea } from "@internalComponents/Input";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";
import { useBuilderStore } from "@stores/builderStore";
import { produce } from "immer";
import { useEffect } from "react";
import { useForm, Form, FormProvider } from "react-hook-form";
  
  type TextBoxFormValues = {
    content: string;
  };

  export const TextBoxForm = () => {
    const { getSelectedLayer, setLayerData } = useBuilderStore();
    const TextBox = getSelectedLayer();
  
    const useFormReturn = useForm<TextBoxFormValues>({
      mode: "onChange",
      defaultValues: {
        content: TextBox?.data.content
      },
    });
  
    const { control, watch } = useFormReturn;
  
    useEffect(() => {
      const subscription = watch((values, { name }) => {
        if (!name){ return; }
  
        setLayerData(
          TextBox.id,
          produce(TextBox?.data, (draft: any) => {
            draft[name] = values[name as keyof typeof values];
          })
        );
      });
  
      return () => {
        subscription.unsubscribe();
      };
    }, [TextBox?.data, setLayerData, watch]);

    return (
      <FormProvider {...useFormReturn}>
        <Form {...useFormReturn}>
          <div className="space-y-4">
            <FormField
              control={control}
              name="content"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>
                    <div className="flex items-center gap-2">
                      Content
                    </div>
                  </FormLabel>
                  <InputTextarea
                    placeholder="Enter Text"
                    className="w-full"
                    size="sm"
                    {...field}
                  />
                </FormItem>
              )}
            />
          </div>
        </Form>
      </FormProvider>
    );
  };
