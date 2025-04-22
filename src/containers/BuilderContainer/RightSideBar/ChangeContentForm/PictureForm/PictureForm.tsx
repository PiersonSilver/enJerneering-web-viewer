import { useBuilderStore } from "@stores/builderStore";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import { produce } from "immer";

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

  return (
    <Accordion
      type="multiple"
      defaultValue={["src", "alt", "radius", "maxWidth"]}
    >
      <AccordionItem value="alt">
        <AccordionTrigger className="font-bold text-sm">
          Alt Text
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 w-full">
          <label className="text-sm font-medium">Image Description</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={Picture.data.alt}
            onChange={(e) => onChangeVariant("alt")(e.target.value)}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
