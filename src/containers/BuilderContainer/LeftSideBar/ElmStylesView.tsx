import _get from "lodash/get";
import { Separator } from "@builderComponents/ui/Separator";
import { Header, HeaderBack, HeaderHeading } from "./Header";
import { components } from "@builder/meta";
import { StyleElement } from "./Element";
import { Container, ContainerScrollArea } from "./Container";
import { useLeftSideBarStore } from "@stores/builderStore";

export const ElmStylesView = () => {
  const selectedCompName = useLeftSideBarStore(
    (state) => state.selectedCompName
  );

  const elmStyles = components[selectedCompName]?.styles ?? [];

  return (
    <Container>
      <Header className="items-start mb-0">
        <HeaderBack />
        <div className="ml-2">
          <HeaderHeading className="ml-0">Select style</HeaderHeading>
          <p className="text-xs font-medium text-neutral-700">
            Select style to add to your website.
          </p>
        </div>
      </Header>
      <div className="pt-4.5 px-4">
        <Separator />
      </div>
      <ContainerScrollArea>
        <div className="flex gap-10 flex-col pt-4">
          {elmStyles.map(({ type, ...props }) => (
            <StyleElement key={type} type={type} {...props} />
          ))}
        </div>
      </ContainerScrollArea>
    </Container>
  );
};
