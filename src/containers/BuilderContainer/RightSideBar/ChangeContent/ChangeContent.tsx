import { Fragment } from "react";
import { NavbarForm } from "../ChangeContentForm/NavbarForm";
import { useBuilderStore } from "@stores/builderStore";
import { DefaultForm } from "../ChangeContentForm/DefaultForm";
import { FooterForm } from "../ChangeContentForm/FooterForm";
import { HeaderForm } from "../ChangeContentForm/HeaderForm";
import { MainContentForm } from "../ChangeContentForm/MainContentForm";
import { ContactForm } from "../ChangeContentForm/ContactForm";
import { CTAForm } from "../ChangeContentForm/CTAForm";
import { TextBoxForm } from "../ChangeContentForm/TextBoxForm";
import { PictureForm } from "../ChangeContentForm/PictureForm";

const getChangeContentForm = (compName: string, styleType?: number) => {
  switch (compName) {
    case "Navbar":
      return <NavbarForm />;
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
      return <TextBoxForm />;
    case "Picture":
      return <PictureForm />;
    default:
      return <DefaultForm />;
  }
};

export const ChangeContent = () => {
  const activeLayer = useBuilderStore((state) => state.activeLayer);

  if (!activeLayer) {
    return <></>;
  }

  return (
    <Fragment key={activeLayer.id}>
      {getChangeContentForm(activeLayer.componentName)}
    </Fragment>
  );
};
