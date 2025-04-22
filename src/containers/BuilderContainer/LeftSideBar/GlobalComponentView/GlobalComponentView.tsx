import _get from "lodash/get";
import { Separator } from "@builderComponents/ui/Separator";
import { Header, HeaderBack, HeaderHeading } from "../Header";
import { components } from "@builder/meta";
import { Container, ContainerScrollArea } from "../Container";
import { GlobalConfigElement } from "../Element";
import { useLeftSideBarStore } from "@stores/builderStore";
import { useBuilderStore } from "@stores/builderStore";

const getGlobalConfigKey = (componentName: string) => {
  switch (componentName) {
    case "Navbar":
      return "navbar";
    case "Footer":
      return "footer";
  }
};

export const GlobalComponentView = () => {
  const globalConfig = useBuilderStore((state) => state.globalConfig);
  const selectedCompName = useLeftSideBarStore(
    (state) => state.selectedCompName
  );

  const elmStyles = components[selectedCompName]?.styles ?? [];
  const globalConfigKey = getGlobalConfigKey(selectedCompName);

  if (!globalConfigKey) {
    throw new Error("Global config key not found");
  }

  const globalComp = globalConfig[globalConfigKey];

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
            <GlobalConfigElement
              globalConfigKey={globalConfigKey}
              key={type}
              isSelected={globalComp?.styleType === type}
              type={type}
              hasSetup={!!globalComp}
              {...props}
            />
          ))}
        </div>
      </ContainerScrollArea>
    </Container>
  );
};
