import { CallToActionData } from "@/_sections/CallToAction/types/CallToActionData";
import { ContactData } from "@/_sections/Contact/types/ContactData";
import { FooterData } from "@/_sections/Footer/types/FooterData";
import { HeaderData } from "@/_sections/Header/types/HeaderData";
import { MainContentData } from "@/_sections/MainContent/types/MainContentData";
import { NavbarData } from "@/_sections/Navbar/types/NavbarData";
import { ServicesSectionData } from "@/_sections/ServicesSection/types/ServicesSectionData";
import { TeamSectionData } from "@/_sections/TeamSection/types/TeamSectionData";
import { TextBoxData } from "@/_sections/TextBox/types/TextBoxData";
import { BlogData } from "@components/blog/types/BlogData";

export interface SectionComponent {
  name: string;
  label: string;
  thumbnail: JSX.Element;
}
export interface Section {
  sectionId: string;
  label: string;
  components: SectionComponent[];
}

export interface ComponentStyle {
  type: number;
  label: string;
  thumbnail: JSX.Element;
}

export type ComponentData =
  | CallToActionData
  | ContactData
  | FooterData
  | HeaderData
  | MainContentData
  | NavbarData
  | ServicesSectionData
  | TeamSectionData
  | TextBoxData
  | BlogData;

export interface Component {
  name: string;
  label: string;
  component: JSX.Element;
  styles: ComponentStyle[];
  data: ComponentData;
}
