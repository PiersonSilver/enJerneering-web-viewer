import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@builderComponents/ui/Accordion";
import { ToggleOption, VariantsGroup } from "../../ToggleGroupList";
import { Separator } from "@builderComponents/ui/Separator";
import { ChangeLogo } from "../../ChangeLogo";
import { useBuilderStore } from "@stores/builderStore";
import { produce } from "immer";
import { Social } from "@components/Footer/types/FooterData";
import {
  SocialMedia,
  SocialMediaAddBtn,
  SocialMediaList,
} from "../../SocialMedia";

const variantOptions: ToggleOption[] = [
  {
    content: "On",
    value: "on",
  },
  {
    content: "Off",
    value: "off",
  },
];

export const FooterForm = () => {
  const [footer, setGlobalConfig] = useBuilderStore((state) => [
    state.globalConfig.footer,
    state.setGlobalConfig,
  ]);

  const onChangeVariant =
    (key: "socials" | "slogan" | "copyRight") => (value: string) => {
      value &&
        setGlobalConfig("footer", {
          data: produce(footer?.data, (draft: any) => {
            draft.showContentFlags[key] = value;
          }),
        });
    };

  const onChangeSocials = (socials: Social[]) => {
    setGlobalConfig("footer", {
      data: produce(footer?.data, (draft: any) => {
        draft.socials = socials;
      }),
    });
  };

  const onChangeLogo = (value: File | null) => {
    let logoUrl = "";

    if (value) {
      logoUrl = URL.createObjectURL(value);
    }

    setGlobalConfig("footer", {
      data: produce(footer?.data, (draft: any) => {
        draft.logo = logoUrl;
      }),
    });
  };

  return (
    <Accordion type="multiple" defaultValue={["variants", "logo", "menuItems"]}>
      <AccordionItem value="variants">
        <AccordionTrigger className="font-bold text-sm">
          Variants
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 w-full">
          <div className="grid grid-cols-2">
            <p>Social Icons</p>
            <VariantsGroup
              options={variantOptions}
              type="single"
              value={footer?.data.showContentFlags.socials}
              onValueChange={onChangeVariant("socials")}
            />
          </div>
          <div className="grid grid-cols-2">
            <p>Sub-content</p>
            <VariantsGroup
              type="single"
              value={footer?.data.showContentFlags.slogan}
              options={variantOptions}
              onValueChange={onChangeVariant("slogan")}
            />
          </div>
          <div className="grid grid-cols-2">
            <p>Copyright content</p>
            <VariantsGroup
              type="single"
              value={footer?.data.showContentFlags.copyRight}
              options={variantOptions}
              onValueChange={onChangeVariant("copyRight")}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
      <Separator />
      <AccordionItem value="logo">
        <AccordionTrigger className="font-bold text-sm">
          Your Logo
        </AccordionTrigger>
        <AccordionContent className="space-y-4">
          <ChangeLogo logoUrl={footer?.data.logo} onChange={onChangeLogo} />
        </AccordionContent>
      </AccordionItem>
      <Separator />
      <AccordionItem value="menuItems">
        <SocialMedia socials={footer?.data.socials} onChange={onChangeSocials}>
          <AccordionTrigger className="font-bold text-sm gap-2">
            Social Icons
            <SocialMediaAddBtn className="ml-auto" />
          </AccordionTrigger>
          <AccordionContent>
            <SocialMediaList />
          </AccordionContent>
        </SocialMedia>
      </AccordionItem>
    </Accordion>
  );
};
