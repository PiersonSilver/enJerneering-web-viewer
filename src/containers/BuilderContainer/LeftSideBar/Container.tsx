import { ScrollArea } from "@internalComponents/ScrollArea";
import { PropsWithChildren } from "react";

export const Container = ({ children }: PropsWithChildren) => {
  return <div className="flex flex-col h-full">{children}</div>;
};

export const ContainerScrollArea = ({ children }: PropsWithChildren) => {
  return (
    <ScrollArea className="flex-1">
      <div className="px-4 pb-4">{children}</div>
    </ScrollArea>
  );
};
