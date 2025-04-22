import { useState } from "react";
import {
  ButtonSettings,
  ButtonSettingsAddBtn,
  ButtonSettingsList,
} from "../../ButtonSettings";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@builderComponents/ui/Accordion";
import { ButtonSettingsData } from "@customTypes/builder";

export const NavbarForm = () => {
  const [buttons, setButtons] = useState<ButtonSettingsData[]>([]);

  return (
    <Accordion type="multiple" defaultValue={["buttons"]}>
      <AccordionItem value="buttons">
        <ButtonSettings buttons={buttons} onChange={setButtons}>
          <AccordionTrigger className="gap-2">
            Buttons
            <ButtonSettingsAddBtn className="ml-auto" />
          </AccordionTrigger>
          <AccordionContent>
            <ButtonSettingsList />
          </AccordionContent>
        </ButtonSettings>
      </AccordionItem>
    </Accordion>
  );
};
