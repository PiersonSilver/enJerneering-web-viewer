import { useEffect, useState } from "react";
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
import { ContentsControl } from "../../DataListControl";
import {
  AITextAreaField,
  AITextField,
} from "@builderComponents/form/TextField";
import { useBuilderStore } from "@stores/builderStore";
import { produce } from "immer";

// Pierson - Add functionality to Main Content sidebar form for Change Content
  export const MainContentForm = () => {
    const { getSelectedLayer, setLayerData } = useBuilderStore();
    const mainContent = getSelectedLayer();

    const [, setContents] = useState<SubHeading[]>([]);
  
    const useFormReturn = useForm({
      mode: "onChange",
      defaultValues: {
        title: mainContent?.data.title,
        subtitle: mainContent?.data.subtitle,
        tagLine: mainContent?.data.tagLine,
      },
    });

    // Pierson - How to handle the 'add content' button in change contents of right sidebar
    const handleContentsChange = (updatedContents: SubHeading[]) => {
      console.log("Updated contents state:", updatedContents);
      setContents(updatedContents);

      setLayerData(
        mainContent.id,
        produce(mainContent?.data, (draft: any) => {
          draft.subHeading = updatedContents;
        })
      );
    
    };
    
  
    const { control, watch } = useFormReturn;
  
    useEffect(() => {
      const subscription = watch((values, { name }) => {
        if (!name){ return; }
  
        setLayerData(
          mainContent.id,
          produce(mainContent?.data, (draft: any) => {
            draft[name] = values[name as keyof typeof values];
          })
        );
      });
  
      return () => {
        subscription.unsubscribe();
      };
    }, [mainContent?.data, setLayerData, watch]);
  
    return (
      <Accordion type="multiple" defaultValue={["content", "contentList"]}>
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
              <AITextField
                control={control}
                name="tagLine"
                label="Tagline"
                placeholder="Enter tagline"
                size="sm"
              />
            </Form>
          </AccordionContent>
        </AccordionItem>
        <Separator />
        <AccordionItem value="contentList">
          <AccordionTrigger className="font-bold text-sm">
            Content List
          </AccordionTrigger>
          <AccordionContent>
            <ContentsControl data={mainContent?.data.subHeading} onChange={handleContentsChange} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  };