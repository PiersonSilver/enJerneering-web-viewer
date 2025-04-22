import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@builderComponents/ui/Accordion";
import { Separator } from "@builderComponents/ui/Separator";
import { ToggleOption, VariantsGroup } from "../../ToggleGroupList";
import { BanIcon, ImageIcon, VideoPlayIcon } from "../../../../../assets/icons";
import { ColorInput } from "@builderComponents/ui/ColorPicker";
import { produce } from "immer";
import { useBuilderStore } from "@stores/builderStore";
import { ChangeLogo } from "../../ChangeLogo";

const backgroundOptions: ToggleOption[] = [
  { content: <BanIcon />, value: "none" },
  { content: <ImageIcon />, value: "image" },
  { content: <VideoPlayIcon />, value: "video" },
];

const tagLineOptions: ToggleOption[] = [
  { content: "On", value: "on" },
  { content: "Off", value: "off" },
];

// Pierson Silver - Add Form for the data that is chosen on the right sidebar to do stuff
export const CTAForm = () => {
  const { getSelectedLayer, setLayerData } = useBuilderStore();
  const CTA = getSelectedLayer();

  console.log("Component Name: " + CTA.componentName);


  // Sending the data to the builderStore whenever changes happen 

  const onChangeVariant = (key: keyof typeof CTA.data) => (value: string) => {
    if(CTA.id){
      setLayerData(CTA.id,
        produce(CTA?.data, (draft: any) => {
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

    if(CTA.id){
      setLayerData(CTA.id,
        produce(CTA?.data, (draft: any) => {
          draft.imgUrl = logoUrl;
        }
      )
    )};
  };
  
// Made it so that the values that are updated are shown with updated button values
  return (
    <Accordion type="multiple" defaultValue={["variants", "color"]}>
      <AccordionItem value="variants">
        <AccordionTrigger className="font-bold text-sm">
          Variants
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 w-full">
          <div className="grid grid-cols-2">
            <p>Background</p>
            <VariantsGroup
              options={backgroundOptions}
              type="single"
              value={CTA?.data.background}
              onValueChange={onChangeVariant("background")}
            />
          </div>
          <div className="grid grid-cols-2">
            <p>Tagline</p>
            <VariantsGroup
              options={tagLineOptions}
              type="single"
              value={CTA?.data.isTagline}
              onValueChange={onChangeVariant("isTagline")}
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
                <ChangeLogo logoUrl={CTA?.data.imgUrl} onChange={onChangeLogo} />
              </AccordionContent>
            </AccordionItem>
      <Separator />
      <AccordionItem value="color">
        <AccordionTrigger className="font-bold text-sm">Color</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 w-full">
          <ColorInput
            label="Background Color"
            color={CTA.data.backgroundColor}
            setColor={onChangeVariant("backgroundColor")}
          />
          <ColorInput
            label="Text Color"
            color={CTA.data.textColor}
            setColor={onChangeVariant("textColor")}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

