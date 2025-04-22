import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@builderComponents/ui/Accordion";
import { v4 as uuidv4 } from "uuid";
import { Separator } from "@builderComponents/ui/Separator";
import {
  ButtonSettings,
  ButtonSettingsAddBtn,
  ButtonSettingsList,
} from "../../ButtonSettings";
import { AITextField, AITextAreaField } from "@builderComponents/form/TextField";
import { Form, FormProvider, useForm } from "react-hook-form";
import { ButtonSettingsData } from "@customTypes/builder";
import { BUTTON_ACTIONS } from "@enums/builder";
import { useBuilderStore } from "@stores/builderStore";
import { produce } from "immer";
import { useState, useEffect } from "react";

export const HeaderForm = () => {

  const { getSelectedLayer, setLayerData } = useBuilderStore();
  const header = getSelectedLayer();

  const useFormReturn = useForm({
    mode: "onChange",
    defaultValues: {
      title: header?.data.title,
      subtitle: header?.data.subtitle,
    },
  });

  const { control, watch } = useFormReturn;

  // Pierson - Got buttons to work mostly. They now work dynamically within an array 
  const [buttons, setButtons] = useState<ButtonSettingsData[]>(() =>
    header?.data?.buttons?.map((button: ButtonSettingsData) => ({
      id: button.id || uuidv4(),
      buttonProps: {...button.buttonProps},
    })) || []
  );

  const handleButtonsChange = (updatedButtons: ButtonSettingsData[]) => {
    console.log("Setting new buttons:", updatedButtons);
    setButtons(updatedButtons);
  
  
    setLayerData(
      header.id,
      produce(header?.data, (draft: any) => {
        draft.buttons = updatedButtons.map((button) => ({
          id: button.id,
          buttonProps: { ...button.buttonProps },
        }));
      })
    );
  };

// The watch subscription allows for the text fields to auto update while being typed in (stolen from footer forms)

  useEffect(() => {
    const subscription = watch((values, { name }) => {
      if (!name){ return; }

      setLayerData(
        header.id,
        produce(header?.data, (draft: any) => {
          draft[name] = values[name as keyof typeof values];
        })
      );
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [header?.data, setLayerData, watch]);

  // Pierson - Change content form functionality for Header (buttons are iffy)
  return (
    <Accordion type="multiple" defaultValue={["mainContent", "button"]}>
      <AccordionItem value="mainContent">
        <AccordionTrigger>Main Content</AccordionTrigger>
        <AccordionContent>
        <FormProvider {...useFormReturn}>
          <Form {...useFormReturn}>
            <AITextField
              control={control}
              name="title"
              label="Title"
              size="sm"
              placeholder="Enter Title"
            />
            <AITextAreaField
              control={control}
              name="subtitle"
              label="Subtitle"
              placeholder="Enter subtitle"
              size="sm"
              minRows={3}
            />
          </Form>
        </FormProvider>
        </AccordionContent>
      </AccordionItem>
      <Separator />
      <AccordionItem value="button">
        <ButtonSettings buttons={buttons} onChange={handleButtonsChange}>
          <AccordionTrigger className="font-bold text-sm gap-2">
            Buttons
            <ButtonSettingsAddBtn className="ml-auto" />
          </AccordionTrigger>
          <AccordionContent>
            <ButtonSettingsList />
          </AccordionContent>
        </ButtonSettings>
      </AccordionItem>
    </Accordion>
  );
};
