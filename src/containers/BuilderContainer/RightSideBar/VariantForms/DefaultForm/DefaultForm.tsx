import { useState } from "react";
import { map } from "lodash";
import { ToggleGroup, ToggleGroupItem } from "@internalComponents/ToggleGroup";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@builderComponents/ui/Accordion";
import { Button } from "@internalComponents/Button";
import { Separator } from "@builderComponents/ui/Separator";
import { Checkbox } from "@internalComponents/Checkbox";
import { InputText } from "@internalComponents/Input";
import { ColorPicker } from "@builderComponents/ui/ColorPicker";
import {
  BanIcon,
  ImageIcon,
  InfoCircleIcon,
  VideoPlayIcon,
} from "../../../../../assets/icons";

interface ToggleOption {
  content: React.ReactNode;
  value: any;
  id?: string;
}

interface ToggleGroupProps {
  type: "multiple" | "single";
  value: any;
  onValueChange: (value: any) => void;
  options: ToggleOption[];
}

const VariantsGroup: React.FC<ToggleGroupProps> = ({
  type,
  value,
  onValueChange,
  options,
}) => (
  <ToggleGroup type={type} value={value} onValueChange={onValueChange}>
    {map(options, (option, index) => (
      <ToggleGroupItem value={option.value} key={index}>
        {option.content}
      </ToggleGroupItem>
    ))}
  </ToggleGroup>
);

const CheckboxOptions: React.FC<{ options: ToggleOption[] }> = ({
  options,
}) => (
  <div className="flex flex-col flex-1 gap-2">
    {options.map((option, index) => (
      <div className="flex items-center space-x-2" key={index}>
        <Checkbox id={option.id} value={option.value} />
        <label
          htmlFor={option.id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {option.content}
        </label>
      </div>
    ))}
  </div>
);

export const DefaultForm = () => {
  const [background, setBackground] = useState<string>("none");
  const [element, setElement] = useState<string>("buttons");
  const [viewButton, setViewButton] = useState<string>("yes");
  const [color, setColor] = useState("#aabbcc");

  const backgroundOptions: ToggleOption[] = [
    { content: <BanIcon />, value: "none" },
    { content: <ImageIcon />, value: "image" },
    { content: <VideoPlayIcon />, value: "video" },
  ];

  const elementOptions: ToggleOption[] = [
    { content: "Buttons", value: "buttons" },
    { content: "Field", value: "field" },
  ];

  const viewButtonOptions: ToggleOption[] = [
    { content: "Yes", value: "yes" },
    { content: "No", value: "no" },
  ];

  const contactInfoOptions: ToggleOption[] = [
    { content: "Address", id: "contactAddress", value: true },
    { content: "Email", id: "contactEmail", value: true },
    { content: "Phone", id: "contactPhone", value: true },
  ];

  const requiredFieldsOptions: ToggleOption[] = [
    { content: "First name & Last name", id: "fieldName", value: true },
    { content: "Email", id: "fieldEmail", value: true },
    { content: "Phone Number", id: "fieldPhone", value: true },
    { content: "Your message", id: "fieldMessage", value: true },
  ];

  return (
    <Accordion
      type="multiple"
      defaultValue={["variants", "media", "map", "color"]}
    >
      <AccordionItem value="variants">
        <AccordionTrigger className="font-bold text-sm">
          Variants
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 w-full">
          <div className="flex gap-4 items-center">
            <div className="text-sm font-medium w-[86px]">Background</div>
            <div className="flex-1">
              <VariantsGroup
                type="single"
                value={background}
                onValueChange={setBackground}
                options={backgroundOptions}
              />
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="text-sm font-medium w-[86px]">Element</div>
            <div className="flex-1">
              <VariantsGroup
                type="single"
                value={element}
                onValueChange={setElement}
                options={elementOptions}
              />
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="text-sm font-medium w-[86px]">Buttons</div>
            <div className="flex-1">
              <VariantsGroup
                type="single"
                value={viewButton}
                onValueChange={setViewButton}
                options={viewButtonOptions}
              />
            </div>
          </div>
          {/* Contact Information Checkbox */}
          <div className="flex gap-4">
            <div className="text-sm font-medium w-[86px]">
              Contact Information
            </div>
            <CheckboxOptions options={contactInfoOptions} />
          </div>
          {/* Required Fields Checkbox */}
          <div className="flex gap-4">
            <div className="text-sm font-medium w-[86px]">Required Fields</div>
            <CheckboxOptions options={requiredFieldsOptions} />
          </div>
        </AccordionContent>
      </AccordionItem>
      <Separator />
      <AccordionItem value="media">
        <AccordionTrigger className="font-bold text-sm">
          Image/Video
        </AccordionTrigger>
        <AccordionContent className="flex gap-4 w-full">
          <div className="flex flex-1 h-[160px] p-2 rounded-2xl border border-neutral-300 bg-neutral-50">
            <img className="rounded-xl" src="/img/cryo.jpeg" alt="preview" />
          </div>
          <div className="flex-shrink-0 flex flex-col gap-2">
            <Button label="Change" variant="outline" />
            <Button label="Remove" className="text-red-600" variant="outline" />
          </div>
        </AccordionContent>
      </AccordionItem>
      {/* Map Address */}
      <Separator />
      <AccordionItem value="map">
        <AccordionTrigger className="font-bold text-sm">
          Map Address
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 w-full">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Map URL</span>
            <InfoCircleIcon width="1rem" height="1rem" />
          </div>
          <InputText placeholder="Enter map URL" className="w-full" size="sm" />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="color">
        <AccordionTrigger className="font-bold text-sm">Color</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Background Color</span>
            <ColorPicker color={color} setColor={setColor} />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
