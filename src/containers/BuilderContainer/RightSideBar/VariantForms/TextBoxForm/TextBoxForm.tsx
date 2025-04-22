import { ColorInput } from "@builderComponents/ui/ColorPicker";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Accordion,
} from "@radix-ui/react-accordion";
import { useBuilderStore } from "@stores/builderStore";
import { produce } from "immer";

export const TextBoxForm = () => {
  const { getSelectedLayer, setLayerData } = useBuilderStore();
  const TextBox = getSelectedLayer();

  console.log("Component Name: " + TextBox.componentName);

  const onChangeVariant =
    (key: keyof typeof TextBox.data) => (value: string) => {
      if (TextBox.id) {
        setLayerData(
          TextBox.id,
          produce(TextBox?.data, (draft: any) => {
            draft[key] = value;
          })
        );
      }
    };

  const onChangeBoolean =
    (key: keyof typeof TextBox.data) => (value: boolean) => {
      if (TextBox.id) {
        setLayerData(
          TextBox.id,
          produce(TextBox?.data, (draft: any) => {
            draft[key] = value;
          })
        );
      }
    };

  return (
    <Accordion type="multiple" defaultValue={["variants", "color"]}>
      <AccordionItem value="color">
        <AccordionTrigger className="font-bold text-sm">Color</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 w-full">
          <ColorInput
            label="Text Color"
            color={TextBox.data.textColor}
            setColor={onChangeVariant("textColor")}
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="fontSize">
        <AccordionTrigger className="font-bold text-sm">
          Font Size
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 w-full">
          <label className="text-sm font-medium">Font Size (px)</label>
          <input
            type="number"
            className="border p-2 w-full rounded"
            value={TextBox.data.fontSize?.replace("px", "") || ""}
            onChange={(e) => onChangeVariant("fontSize")(e.target.value + "px")}
            min="8"
            max="100"
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="bold">
        <AccordionTrigger className="font-bold text-sm">Bold</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 w-full">
          <label className="text-sm font-medium flex items-center gap-2">
            <input
              type="checkbox"
              checked={TextBox.data.isBold || false}
              onChange={(e) => onChangeBoolean("isBold")(e.target.checked)}
              className="w-4 h-4"
            />
            Make Text Bold
          </label>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
