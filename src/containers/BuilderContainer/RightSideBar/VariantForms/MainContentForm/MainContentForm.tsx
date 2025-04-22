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
import { useBuilderStore } from "@stores/builderStore";
import { produce } from "immer";
import { ChangeLogo } from "../../ChangeLogo";

// Pierson - Add variants tab funcitonality 
const tagLineOptions: ToggleOption[] = [
  { content: "On", value: "on" },
  { content: "Off", value: "off" },
];

export const MainContentForm = () => {
  const { getSelectedLayer, setLayerData } = useBuilderStore();
  const mainContent = getSelectedLayer();

  console.log("Component Name: " + mainContent.componentName);


  // Sending the data to the builderStore whenever changes happen 

  const onChangeVariant = (key: keyof typeof mainContent.data) => (value: string) => {
    if(mainContent.id){
      setLayerData(mainContent.id,
        produce(mainContent?.data, (draft: any) => {
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

    if(mainContent.id){
      setLayerData(mainContent.id,
        produce(mainContent?.data, (draft: any) => {
          draft.imgUrl = logoUrl;
        }
      )
    )};
  };

  return (
    <Accordion type="multiple" defaultValue={["variants", "color"]}>
      <AccordionItem value="variants">
        <AccordionTrigger className="font-bold text-sm">
          Variants
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 w-full">
          <div className="grid grid-cols-2">
            <p>Tagline</p>
            <VariantsGroup
              options={tagLineOptions}
              type="single"
              value={mainContent?.data.isTagline}
              onValueChange={onChangeVariant("isTagline")}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
      <Separator />
        <AccordionItem value="image">
          <AccordionTrigger className="font-bold text-sm">
            Image Upload
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 w-full">
            <ChangeLogo logoUrl={mainContent?.data.imgUrl} onChange={onChangeLogo} />
          </AccordionContent>
        </AccordionItem>
      <Separator />
        <AccordionItem value="color">
          <AccordionTrigger className="font-bold text-sm">Color</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 w-full">
            <ColorInput
              label="Background Color"
              color={mainContent?.data.backgroundColor}
              setColor={onChangeVariant("backgroundColor")}
            />
            <ColorInput
              label="Text Color"
              color={mainContent?.data.textColor}
              setColor={onChangeVariant("textColor")}
            />
            </AccordionContent>
          </AccordionItem>
        <Separator />
    </Accordion>
  );
};
