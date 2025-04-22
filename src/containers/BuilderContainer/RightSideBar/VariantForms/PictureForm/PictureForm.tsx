import { useBuilderStore } from "@stores/builderStore";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import { produce } from "immer";
import { Separator } from "@radix-ui/react-separator";
import { ChangeLogo } from "../../ChangeLogo";

export const PictureForm = () => {
  const { getSelectedLayer, setLayerData } = useBuilderStore();
  const Picture = getSelectedLayer();

  console.log("Component Name: " + Picture.componentName);

  const onChangeVariant =
    (key: keyof typeof Picture.data) => (value: string) => {
      if (Picture.id) {
        setLayerData(
          Picture.id,
          produce(Picture.data, (draft: any) => {
            draft[key] = value;
          })
        );
      }
    };

  const onChangeLogo = (value: File | null) => {
    let logoUrl = "";

    if (value) {
      logoUrl = URL.createObjectURL(value);
    }

    if (Picture.id) {
      setLayerData(
        Picture.id,
        produce(Picture?.data, (draft: any) => {
          draft.src = logoUrl;
        })
      );
    }
  };

  return (
    <Accordion
      type="multiple"
      defaultValue={["src", "alt", "radius", "maxWidth"]}
    >
      <AccordionItem value="image">
        <AccordionTrigger className="font-bold text-sm">
          Image Upload
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 w-full">
          <ChangeLogo logoUrl={Picture?.data.src} onChange={onChangeLogo} />
        </AccordionContent>
      </AccordionItem>
      <Separator />
    </Accordion>
  );
};
