import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@builderComponents/ui/Accordion";
import { Separator } from "@builderComponents/ui/Separator";
import { ToggleOption, VariantsGroup } from "../../ToggleGroupList";
import { BanIcon, ImageIcon, VideoPlayIcon } from "../../../../../assets/icons";
import { MediaUpload } from "./MediaUpload";
import { useBuilderStore } from "@stores/builderStore";
import { produce } from "immer";
import { ChangeLogo } from "../../ChangeLogo";
import { ColorInput } from "@builderComponents/ui/ColorPicker";

type HeaderFormProps = {
  style: number;
};

const backgroundOptions: ToggleOption[] = [
  { content: <BanIcon />, value: "none" },
  { content: <ImageIcon />, value: "image" },
  { content: <VideoPlayIcon />, value: "video" },
];


export const HeaderForm = () => {
  const { getSelectedLayer, setLayerData } = useBuilderStore();
  const header = getSelectedLayer();

  console.log("Component Name: " + header.componentName);


  // Sending the data to the builderStore whenever changes happen 

  const onChangeVariant = (key: keyof typeof header.data) => (value: string) => {
    if(header.id){
      setLayerData(header.id,
        produce(header?.data, (draft: any) => {
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

    if(header.id){
      setLayerData(header.id,
        produce(header?.data, (draft: any) => {
          draft.imgUrl = logoUrl;
        }
      )
    )};
  };

  
// Pierson - Add variant form functionality 
  return (
    <Accordion type="multiple" defaultValue={["variants", "image"]}>
      <AccordionItem value="variants">
        <AccordionTrigger className="font-bold text-sm">
          Variants
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 w-full">
          <div className="grid grid-cols-2">
            <p>Background types</p>
            <VariantsGroup
              options={backgroundOptions}
              type="single"
              value={header?.data.background}
              onValueChange={onChangeVariant("background")}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
      <Separator />
      {header?.data.background === "image" && (
        <>
          <AccordionItem value="image">
            <AccordionTrigger className="font-bold text-sm">
              Image Upload
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 w-full">
              <ChangeLogo logoUrl={header?.data.imgUrl} onChange={onChangeLogo} />
            </AccordionContent>
          </AccordionItem>
          <Separator />
        </>
      )}
        <>
      <AccordionItem value="color">
        <AccordionTrigger className="font-bold text-sm">Color</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 w-full">
        {header?.data.background === "none" && (
          <ColorInput
            label="Background Color"
            color={header?.data.backgroundColor}
            setColor={onChangeVariant("backgroundColor")}
          />
          )}
          <ColorInput
            label="Text Color"
            color={header?.data.textColor}
            setColor={onChangeVariant("textColor")}
          />
          </AccordionContent>
        </AccordionItem>
      <Separator />
      </>
      
    </Accordion>
  );
};
