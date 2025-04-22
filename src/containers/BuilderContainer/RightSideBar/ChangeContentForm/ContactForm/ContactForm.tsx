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
import { useBuilderStore } from "@stores/builderStore";
import { produce } from "immer";


// pierson - Added change content form functionality
export const ContactForm = () => {
  const { getSelectedLayer, setLayerData } = useBuilderStore();
  const contact = getSelectedLayer();

  const useFormReturn = useForm({
    mode: "onChange",
    defaultValues: {
      title: contact?.data.title,
      subtitle: contact?.data.subtitle,
      address: contact?.data.address,
      mail: contact?.data.mail,
      phone: contact?.data.phone,
    },
  });

  const { control, watch } = useFormReturn;

// The watch subscription allows for the text fields to auto update while being typed in (stolen from footer forms)

  useEffect(() => {
    const subscription = watch((values, { name }) => {
      if (!name){ return; }

      setLayerData(
        contact.id,
        produce(contact?.data, (draft: any) => {
          draft[name] = values[name as keyof typeof values];
        })
      );
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [contact?.data, setLayerData, watch]);


  return (
    <Accordion type="multiple" defaultValue={["content", "button", "contact"]}>
      <AccordionItem value="content">
        <AccordionTrigger className="font-bold text-sm">
          Main Content
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2 w-full pb-6">
          <Form {...useFormReturn}>
            <AITextField
              control={control}
              name="title"
              label="Header"
              size="sm"
              placeholder="Enter header"
            />
            <AITextAreaField
              control={control}
              name="subtitle"
              label="Sub-header"
              placeholder="Enter sub-header"
              size="sm"
              minRows={3}
            />
          </Form>
        </AccordionContent>
      </AccordionItem>
      <Separator />
      <AccordionItem value="contact">
        <AccordionTrigger className="font-bold text-sm gap-2">
          Contact Information
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2 w-full pb-6">
          <Form {...useFormReturn}>
            <AITextField
              label="Phone number"
              placeholder="Enter your phone number"
              name="phone"
              control={control}
            />
            
            <AITextField
              label="Email Address"
              placeholder="Enter your email address"
              name="mail"
              control={control}
            />
            <AITextAreaField
              label="Address"
              placeholder="Enter your address"
              name="address"
              control={control}
              minRows={2}
            />
          </Form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
