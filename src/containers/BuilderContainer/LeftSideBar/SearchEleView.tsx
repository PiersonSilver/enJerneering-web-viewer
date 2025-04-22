import { Header, HeaderBack, HeaderHeading } from "./Header";
import { InputText } from "@internalComponents/Input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@builderComponents/ui/Accordion";
import { sectionList } from "@builder/meta";
import { SectionElement } from "./Element";
import { Separator } from "@builderComponents/ui/Separator";
import { Container, ContainerScrollArea } from "./Container";
import { useMemo, useState } from "react";
import { useDebouncedValue } from "@/_hooks/useDebounce";
import { type Section } from "@customTypes/builder";

export const SearchElmView = () => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchVal = useDebouncedValue(searchValue);

  const sections = useMemo(
    () =>
      sectionList.reduce<Section[]>((list, section) => {
        const { label, components } = section;

        const findName = (search: string, value: string) =>
          value.toLowerCase().trim().includes(search.toLowerCase().trim());

        if (findName(debouncedSearchVal, label) || debouncedSearchVal === "") {
          return [...list, section];
        }

        const filteredComponents = components.filter((comp) => {
          return findName(debouncedSearchVal, comp.label);
        });

        if (filteredComponents.length === 0) {
          return list;
        }

        return [...list, { ...section, components: filteredComponents }];
      }, []),
    [debouncedSearchVal]
  );

  return (
    <Container>
      <Header className="flex-col items-stretch pb-4">
        <div className="flex items-center mb-4.5">
          <HeaderBack />
          <HeaderHeading>Select Element</HeaderHeading>
        </div>
        <div className=" h-full flex flex-1 input-icon-left items-center">
          <i className="pi pi-search" />
          <InputText
            size="sm"
            placeholder="Search"
            className="w-full bg-neutral-50"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </Header>
      <ContainerScrollArea>
        <Accordion type="multiple" defaultValue={[sections[0]?.sectionId]}>
          {sections.map((section) => (
            <AccordionItem value={section.sectionId} key={section.sectionId}>
              <Separator />
              <AccordionTrigger className="font-bold text-sm">
                {section.label}
              </AccordionTrigger>
              <AccordionContent className="grid grid-cols-elm-list gap-4">
                {section.components.map(({ name, ...compProps }) => (
                  <SectionElement key={name} compName={name} {...compProps} />
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ContainerScrollArea>
    </Container>
  );
};
