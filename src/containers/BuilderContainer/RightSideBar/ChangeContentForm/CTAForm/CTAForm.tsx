import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Form } from "@internalComponents/FormField";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@builderComponents/ui/Accordion";
import { Separator } from "@builderComponents/ui/Separator";
import {
  AITextAreaField,
  AITextField,
} from "@builderComponents/form/TextField";
import {
  ButtonSettings,
  ButtonSettingsAddBtn,
  ButtonSettingsList,
} from "../../ButtonSettings";
import { ButtonSettingsData } from "@customTypes/builder";
import { BUTTON_ACTIONS } from "../../../../../enums/builder";
import { produce } from "immer";
import { useBuilderStore } from "@stores/builderStore";

export const CTAForm = () => {
  const { getSelectedLayer, setLayerData } = useBuilderStore();
  const CTA = getSelectedLayer();

  const useFormReturn = useForm({
    mode: "onChange",
    defaultValues: {
      title: CTA?.data.title,
      subtitle: CTA?.data.subtitle,
      tagLine: CTA?.data.tagLine,
    },
  });

  const { control, watch } = useFormReturn;

  // Pierson - Got buttons to work mostly. They now work dynamically within an array 
  const [buttons, setButtons] = useState<ButtonSettingsData[]>(() =>
    CTA?.data?.buttons?.map((button: ButtonSettingsData) => ({
      id: button.id || uuidv4(),
      buttonProps: {...button.buttonProps},
    })) || []
  );

  const handleButtonsChange = (updatedButtons: ButtonSettingsData[]) => {
    console.log("Setting new buttons:", updatedButtons);
    setButtons(updatedButtons);
  
  
    setLayerData(
      CTA.id,
      produce(CTA?.data, (draft: any) => {
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
        CTA.id,
        produce(CTA?.data, (draft: any) => {
          draft[name] = values[name as keyof typeof values];
        })
      );
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [CTA?.data, setLayerData, watch]);

  return (
    <Accordion type="multiple" defaultValue={["content", "button"]}>
      <AccordionItem value="content">
        <AccordionTrigger className="font-bold text-sm">
          Main Content
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2 w-full pb-6">
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
            <AITextField
              control={control}
              name="tagLine"
              label="Tagline"
              placeholder="Enter tagline"
              size="sm"
            />
          </Form>
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
