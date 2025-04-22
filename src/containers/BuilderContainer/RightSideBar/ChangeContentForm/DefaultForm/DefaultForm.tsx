import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { SubHeading } from "@components/MainContent/types/MainContentData";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@internalComponents/FormField";
import { InputText } from "@internalComponents/Input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@builderComponents/ui/Accordion";
import { Separator } from "@builderComponents/ui/Separator";
import { AskAIPopover } from "@internalComponents/AskAIPopover";
import { ButtonSettings } from "../../ButtonSettings";
import { ContentsControl, FeaturesControl } from "../../DataListControl";
import { BUTTON_ACTIONS } from "../../../../../enums/builder";
import { ButtonSettingsData } from "@customTypes/builder";

export const DefaultForm = () => {
  const [features, setFeatures] = useState<SubHeading[]>([]);
  const [contents, setContents] = useState<SubHeading[]>([]);

  const defaultValues = {
    header: "",
    subHeader: "",
    tagline: "",
  };

  const useFormReturn = useForm({
    mode: "onChange",
    defaultValues,
  });

  const { control } = useFormReturn;

  const [buttons, setButtons] = useState<ButtonSettingsData[]>(() =>
    Array.from({ length: 1 }, () => ({
      id: uuidv4(),
      buttonProps: {
        label: "Button Label",
        color: "primary",
        size: "large",
        actionType: BUTTON_ACTIONS.TO_EXTERNAL,
        externalUrl: "google.com",
      },
    }))
  );

  return (
    <Accordion type="multiple" defaultValue={["content", "button", "feature"]}>
      <AccordionItem value="content">
        <AccordionTrigger className="font-bold text-sm">
          Main Content
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 w-full">
          <Form {...useFormReturn}>
            <FormField
              control={control}
              name="header"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>
                    <div className="flex items-center">
                      Header
                      <AskAIPopover onGenerated={() => {}} />
                    </div>
                  </FormLabel>
                  <FormControl>
                    <InputText
                      placeholder="Enter header"
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
              name="subHeader"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>
                    <div className="flex items-center">
                      Sub-header
                      <AskAIPopover onGenerated={() => {}} />
                    </div>
                  </FormLabel>
                  <FormControl>
                    <InputText
                      placeholder="Enter sub header"
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
              name="tagline"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>
                    <div className="flex items-center">
                      Tagline
                      <AskAIPopover onGenerated={() => {}} />
                    </div>
                  </FormLabel>
                  <FormControl>
                    <InputText
                      placeholder="Enter tagline"
                      className="w-full"
                      size="sm"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </Form>
        </AccordionContent>
      </AccordionItem>
      <Separator />
      <AccordionItem value="button">
        <AccordionTrigger className="font-bold text-sm">
          Button
        </AccordionTrigger>
        <AccordionContent>
          <ButtonSettings buttons={buttons} onChange={setButtons} />
        </AccordionContent>
      </AccordionItem>
      {/* Feature List */}
      <Separator />
      <AccordionItem value="feature">
        <AccordionTrigger className="font-bold text-sm">
          Feature List
        </AccordionTrigger>
        <AccordionContent>
          <FeaturesControl data={features} onChange={setFeatures} />
        </AccordionContent>
      </AccordionItem>
      {/* Contact Information */}
      <Separator />
      <AccordionItem value="map">
        <AccordionTrigger className="font-bold text-sm">
          Contact Information
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Address</span>
            <InputText
              placeholder="Enter Address"
              className="w-full"
              size="sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Email Address</span>
            <InputText
              placeholder="Enter Email Address"
              className="w-full"
              size="sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Phone Number</span>
            <InputText
              placeholder="Enter Phone Number"
              className="w-full"
              size="sm"
            />
          </div>
        </AccordionContent>
      </AccordionItem>
      {/* Content List */}
      <Separator />
      <AccordionItem value="feature">
        <AccordionTrigger className="font-bold text-sm">
          Content List
        </AccordionTrigger>
        <AccordionContent>
          <ContentsControl data={contents} onChange={setContents} />
        </AccordionContent>
      </AccordionItem>
      {/* Teams 
       <SocialLink
        url={socialLink}
        onChange={setSocialLink}
        icon="pi-facebook"
      /> */}
    </Accordion>
  );
};
