"use client";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@internalComponents/Tabs";
import { twJoin } from "tailwind-merge";
import { ScrollArea } from "@internalComponents/ScrollArea";
import { Tips } from "./Tips";
import { Variants } from "./Variants";
import { ChangeContent } from "./ChangeContent";
import { useBuilderStore } from "@stores/builderStore";

const RightSidebar = () => {
  const rightBar = useBuilderStore((state) => state.sidebar.right);
  const activeLayer = useBuilderStore((state) => state.activeLayer);

  return (
    <Tabs
      defaultValue="variants"
      className={twJoin(
        "absolute top-0 right-0 h-full flex flex-col pt-4 w-96 bg-white border-l border-border-100 transition-all duration-300 ease-in-out",
        rightBar.open ? "translate-x-0" : "translate-x-full"
      )}
    >
      {!activeLayer && <Tips />}
      {activeLayer && (
        <>
          <TabsList className="mx-4">
            <TabsTrigger value="variants">Variants</TabsTrigger>
            <TabsTrigger value="content">Change Content</TabsTrigger>
          </TabsList>
          <ScrollArea className="flex-1">
            <TabsContent value="variants" className="p-4 pt-0">
              <Variants />
            </TabsContent>
            <TabsContent value="content" className="p-4 pt-0">
              <ChangeContent />
            </TabsContent>
          </ScrollArea>
        </>
      )}
    </Tabs>
  );
};

export default RightSidebar;
