import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@builderComponents/ui/Accordion";
import { Separator } from "@builderComponents/ui/Separator";
import { ToggleOption, VariantsGroup } from "../../ToggleGroupList";
import {
  BanIcon,
  ImageIcon,
  InfoCircleIcon,
  MapPinIcon,
} from "../../../../../assets/icons";
import { InputText } from "@internalComponents/Input";
import { Tooltip } from "@internalComponents/Tooltip";
import {
  CheckboxOption,
  CheckboxOptions,
} from "../../CheckboxOptions/CheckboxOptions";
import { useBuilderStore } from "@stores/builderStore";
import { produce } from "immer";
import { ChangeLogo } from "../../ChangeLogo";
import { ColorInput } from "@builderComponents/ui/ColorPicker";


export const ContactForm = () => {
  const { getSelectedLayer, setLayerData } = useBuilderStore();
  const contact = getSelectedLayer();

  console.log("Component Name: " + contact.componentName);


  const contactInfoOptions: CheckboxOption[] = [
    { content: "Phone", id: "contactPhone", value: contact?.data.contactPhone || false },
    { content: "Email", id: "contactEmail", value: contact?.data.contactEmail || false },
    { content: "Address", id: "contactAddress", value: contact?.data.contactAddress || false },
  ];

  const requiredFieldsOptions: CheckboxOption[] = [
    { content: "First name & Last name", id: "nameField", value: contact?.data.nameField || false },
    { content: "Email", id: "emailField", value: contact?.data.emailField || false },
    { content: "Phone Number", id: "phoneField", value: contact?.data.phoneField || false },
    { content: "Your message", id: "messageField", value: contact?.data.messageField || false },
  ];

  // Sending the data to the builderStore whenever changes happen 

  const onChangeVariant = (key: keyof typeof contact.data) => (value: any) => {
    if(contact.id){
      setLayerData(contact.id,
        produce(contact?.data, (draft: any) => {
          draft[key] = value;
        }
      )
    )};
  };

  //Pierson-  Sending Logo when osmething is uploaded or ememoved (I can't spell it's very late at night)
  const onChangeLogo = (value: File | null) => {
    let logoUrl = "";

    if (value) {
      logoUrl = URL.createObjectURL(value);
    }

    if(contact.id){
      setLayerData(contact.id,
        produce(contact?.data, (draft: any) => {
          draft.imgUrl = logoUrl;
        }
      )
    )};
  };

// added text coloring 
  return (
    <Accordion type="multiple" defaultValue={["variants", "logo"]}>
      <AccordionItem value="variants">
        <AccordionTrigger className="font-bold text-sm">
          Variants
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 w-full">
          <div className="grid grid-cols-2">
            <p className="text-sm font-medium">Contact Information</p>
            <CheckboxOptions 
            options={contactInfoOptions}
            onChange={(id, value) => onChangeVariant(id)(value)}
            />
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm font-medium">Required Fields</p>
            <CheckboxOptions options={requiredFieldsOptions}
            onChange={(id, value) => onChangeVariant(id)(value)}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
      <Separator />
        <AccordionItem value="logo">
          <AccordionTrigger className="font-bold text-sm">
            Your Logo
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <ChangeLogo logoUrl={contact?.data.imgUrl} onChange={onChangeLogo} />
          </AccordionContent>
        </AccordionItem>
      <Separator />
      <AccordionItem value="color">
        <AccordionTrigger className="font-bold text-sm">Color</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 w-full">
          <ColorInput
            label="Text Color"
            color={contact.data.textColor}
            setColor={onChangeVariant("textColor")}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};


/* Map Address stuff that will be used later, but isn't needed now
  
      <AccordionItem value="map">
        <AccordionTrigger>Map Address</AccordionTrigger>
        <AccordionContent>
          <label className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Map URL</span>
              <InfoCircleIcon
                width="1rem"
                height="1rem"
                className="text-neutral-500"
                id="contentMapTooltip"
              />
              <Tooltip
                content="Map tooltip"
                target="#contentMapTooltip"
                position="bottom"
                className="max-w-[16.5rem]"
              />
            </div>
            <InputText
              size="sm"
              className="w-full"
              placeholder="Enter map URL"
            />
          </label>
        </AccordionContent>
      </AccordionItem>
*/