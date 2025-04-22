import _get from "lodash/get";
import { Separator } from "@builderComponents/ui/Separator";
import { Header, HeaderBack, HeaderHeading } from "../Header";
import { backgroundStyles } from "@builder/meta";
import { Container, ContainerScrollArea } from "../Container";
import { BgStyleElement } from "../Element";

export const GlobalBackgroundView = () => {
  return (
    <Container>
      <Header className="items-start mb-0">
        <HeaderBack />
        <div className="ml-2">
          <HeaderHeading className="ml-0">Global Background</HeaderHeading>
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
          {backgroundStyles.map(({ type, ...props }) => (
            <BgStyleElement
              key={type}
              isSelected={false}
              type={type}
              {...props}
            />
          ))}
        </div>
      </ContainerScrollArea>
    </Container>
  );
};
