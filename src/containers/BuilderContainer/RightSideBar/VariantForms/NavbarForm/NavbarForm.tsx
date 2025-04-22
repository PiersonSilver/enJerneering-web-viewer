import {
  ArrowLeftToLineIcon,
  ArrowRightToLineIcon,
  MenuDuoIcon,
} from "../../../../../assets/icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@builderComponents/ui/Accordion";
import { useBuilderStore } from "@stores/builderStore";
import { Separator } from "@builderComponents/ui/Separator";
import { ToggleOption, VariantsGroup } from "../../ToggleGroupList";
import { ChangeLogo } from "../../ChangeLogo";
import { produce } from "immer";
import { MenuItemList, MenuItems, MenuItemsAddBtn } from "./MenuItems";
import { NavbarMenu } from "@components/Navbar/types/NavbarData";

const menuPosition: ToggleOption[] = [
  {
    content: <ArrowLeftToLineIcon width="1.5rem" height="1.5rem" />,
    value: "start",
  },
  {
    content: <MenuDuoIcon width="1.5rem" height="1.5rem" />,
    value: "center",
  },
  {
    content: <ArrowRightToLineIcon width="1.5rem" height="1.5rem" />,
    value: "end",
  },
];

const ctaButtons: ToggleOption[] = [
  {
    content: "On",
    value: "on",
  },
  {
    content: "Off",
    value: "off",
  },
];
export const NavBarForm = () => {
  const [navBar, setGlobalConfig] = useBuilderStore((state) => [
    state.globalConfig.navbar,
    state.setGlobalConfig,
  ]);

  if (!navBar) {
    return <></>;
  }

  const handleChangeMenuPosition = (justifyContent: string) => {
    setGlobalConfig("navbar", { data: { ...navBar.data, justifyContent } });
  };

  const handleChangeMenu = (menu: NavbarMenu[]) => {
    setGlobalConfig(
      "navbar",
      produce(navBar, (draft) => {
        draft.data.menuList = menu;
      })
    );
  };

  const handleChangeLogo = (value: File | null) => {
    const logoUrl = value ? URL.createObjectURL(value) : "";

    setGlobalConfig("navbar", { data: { ...navBar.data, logo: logoUrl } });
  };

  const handleChangeShowCta = (value: string) => {
    if (value) {
      setGlobalConfig(
        "navbar",
        produce(navBar, (draft) => {
          draft.data.showContentFlags.ctaButton = value;
        })
      );
    }
  };

  return (
    <Accordion
      type="multiple"
      defaultValue={["variants", "media", "map", "color"]}
    >
      <AccordionItem value="variants">
        <AccordionTrigger className="font-bold text-sm">
          Variants
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 w-full">
          <div className="grid grid-cols-2">
            <p>Menu Position</p>
            <VariantsGroup
              options={menuPosition}
              type="single"
              value={navBar.data.justifyContent}
              onValueChange={handleChangeMenuPosition}
            />
          </div>
          <div className="grid grid-cols-2">
            <p>CTA Buttons</p>
            <VariantsGroup
              type="single"
              value={navBar.data.showContentFlags.ctaButton}
              options={ctaButtons}
              onValueChange={handleChangeShowCta}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
      <Separator />
      <AccordionItem value="media">
        <AccordionTrigger className="font-bold text-sm">
          Your Logo
        </AccordionTrigger>
        <AccordionContent>
          <ChangeLogo onChange={handleChangeLogo} logoUrl={navBar.data.logo} />
        </AccordionContent>
      </AccordionItem>
      <Separator />
      <AccordionItem value="menuItems">
        <MenuItems menu={navBar.data.menuList} onChange={handleChangeMenu}>
          <AccordionTrigger className="font-bold text-sm gap-2">
            Menu Item
            <MenuItemsAddBtn className="ml-auto" />
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <MenuItemList />
          </AccordionContent>
        </MenuItems>
      </AccordionItem>
    </Accordion>
  );
};
