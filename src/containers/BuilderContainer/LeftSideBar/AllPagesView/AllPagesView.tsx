import { Accordion } from "@builderComponents/ui/Accordion";
import { Container, ContainerScrollArea } from "../Container";
import { LayoutConfig } from "./LayoutConfig";
import { PagesConfig } from "./PagesConfig";
import { useState } from "react";

export const AllPagesView = () => {
  const [openingSections, setOpeningSections] = useState<string[]>([
    "globalConfig",
    "allPages",
  ]);

  return (
    <Container>
      <ContainerScrollArea>
        <Accordion
          type="multiple"
          onValueChange={setOpeningSections}
          value={openingSections}
        >
          <LayoutConfig />
          <PagesConfig {...{ setOpeningSections }} />
        </Accordion>
      </ContainerScrollArea>
    </Container>
  );
};
