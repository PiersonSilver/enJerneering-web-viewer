import { iconButtonVariants } from "@internalComponents/Button";
import { HeaderHeading } from "../Header";
import { PlusBoldIcon } from "../../../../assets/icons";
import { useBuilderStore } from "@stores/builderStore";
import { PageLink } from "../LinkItem";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@builderComponents/ui/Accordion";
import { Dispatch, MouseEventHandler, SetStateAction } from "react";
import _uniq from "lodash/uniq";

type PagesConfigProps = {
  setOpeningSections: Dispatch<SetStateAction<string[]>>;
};

export const PagesConfig = ({ setOpeningSections }: PagesConfigProps) => {
  const currentPageId = useBuilderStore((state) => state.currentPageId);
  const pageOptions = useBuilderStore((state) => state.pageOptions);
  const addPage = useBuilderStore((state) => state.addPage);

  const handleAddPage: MouseEventHandler<HTMLSpanElement> = (e) => {
    e.stopPropagation();
    setOpeningSections((state) => _uniq([...state, "allPages"]));
    addPage();
  };

  return (
    <AccordionItem value="allPages">
      <AccordionTrigger className="gap-2 cursor-pointer">
        <HeaderHeading>All pages</HeaderHeading>
        <span
          className={iconButtonVariants({
            size: "xs",
            variant: "soft",
            class: "flex items-center justify-center",
          })}
          onClick={handleAddPage}
        >
          <PlusBoldIcon
            width="1.25rem"
            height="1.25rem"
            className="text-neutral-700"
          />
        </span>
      </AccordionTrigger>
      <AccordionContent className="px-0 pt-0">
        {pageOptions.map(({ value, label }) => (
          <PageLink
            key={value}
            pageId={value}
            pageName={label}
            isActive={currentPageId === value}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};
