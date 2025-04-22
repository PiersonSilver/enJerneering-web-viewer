import { ReactNode, SVGProps, useMemo } from "react";
import {
  LEFT_SIDE_BAR_VIEWS,
  useLeftSideBarStore,
  usePushView,
} from "@stores/builderStore";
import {
  AngleRightIcon,
  CheckCircleIcon,
  GridWeb2Icon,
  MenuAltIcon,
  TVIcon,
  PlusIcon,
} from "../../../../assets/icons";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@builderComponents/ui/Accordion";
import { HeaderHeading } from "../Header";
import { useBuilderStore } from "@stores/builderStore";

type LayoutConfigItemProps = {
  Icon: React.FC<SVGProps<SVGElement>>;
  title: string;
  hasSetup: boolean;
  onClick: () => void;
};

export const LayoutConfig = () => {
  const pushView = usePushView();
  const setCompName = useLeftSideBarStore((state) => state.setCompName);
  const globalConfig = useBuilderStore((state) => state.globalConfig);

  const configsMenu = useMemo<LayoutConfigItemProps[]>(
    () => [
      {
        Icon: MenuAltIcon,
        title: "Navigation Bar",
        hasSetup: !!globalConfig["navbar"],
        onClick: () => {
          setCompName("Navbar");
          pushView(LEFT_SIDE_BAR_VIEWS.GLOBAL_COMPONENT);
        },
      },
      {
        Icon: GridWeb2Icon,
        title: "Footer",
        hasSetup: !!globalConfig["footer"],
        onClick: () => {
          setCompName("Footer");
          pushView(LEFT_SIDE_BAR_VIEWS.GLOBAL_COMPONENT);
        },
      },
      {
        Icon: TVIcon,
        title: "Global Background",
        hasSetup: !!globalConfig["background"],
        onClick: () => {
          pushView(LEFT_SIDE_BAR_VIEWS.GLOBAL_BACKGROUND);
        },
      },
    ],
    [globalConfig, pushView, setCompName]
  );

  return (
    <AccordionItem value="globalConfig">
      <AccordionTrigger>
        <HeaderHeading>Layout Configuration</HeaderHeading>
      </AccordionTrigger>
      <AccordionContent className="px-0 pt-0 space-y-4">
        {configsMenu.map((configItem, idx) => (
          <LayoutConfigItem {...configItem} key={idx} />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

const LayoutConfigItem = ({
  Icon,
  title,
  hasSetup,
  onClick,
}: LayoutConfigItemProps) => {
  return (
    <div
      className="border border-surface-separator-low hover:bg-neutral-50 transition-colors rounded-lg p-4 flex gap-3 cursor-pointer"
      onClick={onClick}
    >
      <Icon width="1rem" height="1rem" className="text-neutral-700" />
      <span className="font-medium text-xs flex-1">{title}</span>
      {hasSetup ? (
        <CheckCircleIcon
          width="1rem"
          height="1rem"
          className="text-success-600"
        />
      ) : (
        <AngleRightIcon
          width="1rem"
          height="1rem"
          className="text-neutral-700"
        />
      )}
    </div>
  );
};
