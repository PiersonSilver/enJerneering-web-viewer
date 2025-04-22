import { useBuilderStore } from "@stores/builderStore";
import { NavBarForm } from "../VariantForms/NavbarForm";
import { Fragment } from "react";
import { DefaultForm } from "../VariantForms/DefaultForm";
import { FooterForm } from "../VariantForms/FooterForm";
import { HeaderForm } from "../VariantForms/HeaderForm";
import { MainContentForm } from "../VariantForms/MainContentForm";
import { ContactForm } from "../VariantForms/ContactForm";
import { CTAForm } from "../VariantForms/CTAForm";
import { TextBoxForm } from "../VariantForms/TextBoxForm";

const getVariantForm = (compName: string, styleType: number) => {
  switch (compName) {
    case "Navbar":
      return <NavBarForm />;
    case "Footer":
      return <FooterForm />;
    case "Header":
      return <HeaderForm />;
    case "MainContent":
      return <MainContentForm />;
    case "Contact":
      return <ContactForm />;
    case "CallToAction":
      return <CTAForm />;
    case "TextBox":
        return <TextBoxForm/>;
    default:
      return <DefaultForm />;
  }
};

export const Variants = () => {
  const activeLayer = useBuilderStore((state) => state.activeLayer);

  if (!activeLayer) {
    return <></>;
  }

  return (
    <Fragment key={activeLayer.id}>
      {getVariantForm(activeLayer.componentName, activeLayer.styleType)}
    </Fragment>
  );
};
