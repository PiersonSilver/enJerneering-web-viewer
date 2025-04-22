import { nanoid } from "nanoid";
import { HeaderData } from "@components/Header/types/HeaderData";
import { Metadata } from "next";
import { FeaturedData, NavbarData } from "../_sections/Navbar/types/NavbarData";
import { FooterData } from "../_sections/Footer/types/FooterData";
import { TeamSectionData } from "../_sections/TeamSection/types/TeamSectionData";
import { ContactData } from "../_sections/Contact/types/ContactData";
import { MainContentData } from "../_sections/MainContent/types/MainContentData";
import { ServicesSectionData } from "../_sections/ServicesSection/types/ServicesSectionData";
import { BlogData } from "../_sections/blog/types/BlogData";
import { v4 as uuidv4 } from "uuid";
import { TextBoxData } from "./TextBox/types/TextBoxData";
import { CallToActionData } from "./CallToAction/types/CallToActionData";

// Search Engine Optimization
export const seo: Metadata = {
  title: "enJerneering UI Kit",
  description: "A collection of React components for enJerneering projects",
  keywords: "enJerneering, React, UI Kit, Components, NextJS",
};

export const year = new Date().getFullYear();
export const companyName = "enJerneering";
export const mapSrc =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3046.674359781231!2d-85.40925552258973!3d40.21630607147254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88153d365781e4eb%3A0x90bb0a3a86aab047!2sReVitalize%20Med%20Spa!5e0!3m2!1sen!2sus!4v1694203487764!5m2!1sen!2sus";

// Header
export const headerType = 3;
export const headerData: HeaderData = {
  title: "enJerneering UI Kit",
  subtitle: "A collection of React components for enJerneering projects",
  buttons: [],
  tagLine: "enJerneering - Innovate Beyond",
  imgUrl: "/img/cryo.jpeg",
  videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  background: "linear-gradient(to right, #ff7e5f, #feb47b)",
};

//Navbar
export const navbarType = 3;
export const navbarData: NavbarData = {
  logo: "/img/enJerneering_black.png",
  menuList: [
    {
      id: nanoid(),
      title: "Link 1",
      href: "#",
    },
    {
      id: nanoid(),
      title: "Link 2",
      href: "#",
      subLinks: [
        {
          title: "Page 1",
          subTitle: "Lorem ipsum dolor sit amet consectetur.",
          icon: "pi-home",
          href: "/",
          pageGroup: "Page group 1",
        },
        {
          title: "Page 2",
          subTitle: "Lorem ipsum dolor sit amet consectetur.",
          icon: "pi-home",
          href: "/",
          pageGroup: "Page group 1",
        },
        {
          title: "Page 3",
          subTitle: "Lorem ipsum dolor sit amet consectetur.",
          icon: "pi-home",
          href: "/",
          pageGroup: "Page group 1",
        },
        {
          title: "Page 4",
          subTitle: "Lorem ipsum dolor sit amet consectetur.",
          icon: "pi-home",
          href: "/",
          pageGroup: "Page group 2",
        },
        {
          title: "Page 5",
          subTitle: "Lorem ipsum dolor sit amet consectetur.",
          icon: "pi-home",
          href: "/",
          pageGroup: "Page group 2",
        },
        {
          title: "Page 6",
          subTitle: "Lorem ipsum dolor sit amet consectetur.",
          icon: "pi-home",
          href: "/",
          pageGroup: "Page group 3",
        },
        {
          title: "Page 7",
          subTitle: "Lorem ipsum dolor sit amet consectetur.",
          icon: "pi-home",
          href: "/",
          pageGroup: "Page group 3",
        },
        {
          title: "Page 8",
          subTitle: "Lorem ipsum dolor sit amet consectetur.",
          icon: "pi-home",
          href: "/",
          pageGroup: "Page group 4",
        },
        {
          title: "Page 9",
          subTitle: "Lorem ipsum dolor sit amet consectetur.",
          icon: "pi-home",
          href: "/",
          pageGroup: "Page group 4",
        },
      ],
      showFeatured: false,
    },
    { id: nanoid(), title: "Link 3", href: "#" },
    { id: nanoid(), title: "Link 4", href: "#" },
    { id: nanoid(), title: "Link 5", href: "#" },
    { id: nanoid(), title: "Link 6", href: "#" },
  ],
  buttons: [],
  featuredData: [
    {
      imgUrl: "/img/cryo.jpeg",
      title: "Blog Title",
      subTitle:
        "Lorem ipsum dolor sit amet consectetur. Nunc tincidunt pretium ut duis rhoncus. Et pulvinar aliquam malesuada eu praesent  quam quam. ",
      blogUrl: "/",
    },
    {
      imgUrl: "/img/cryo.jpeg",
      title: "Blog Title",
      subTitle:
        "Lorem ipsum dolor sit amet consectetur. Nunc tincidunt pretium ut duis rhoncus. Et pulvinar aliquam malesuada eu praesent  quam quam. ",
      blogUrl: "/",
    },
  ],
  justifyContent: "center",
  isCtaButton: "on",
};

// Main Content
export const mainContentType = 3;
export const mainContentData: MainContentData = {
  title: "Medium length hero heading goes here",
  subtitle:
    "Lorem ipsum dolor sit amet consectetur. Nunc tincidunt pretium ut duis rhoncus. Et pulvinar aliquam malesuada eu praesent ullamcorper quam quam. ",
  tagLine: "enJerneering - Innovate Beyond",
  imgUrl: "/img/bg-contact.png",
  subHeading:[
    {
      title: "Subheading 1",
      subtitle: "Duis aute irure dolor in reprehenderit in voluptate velit.",
    },
    {
      title: "Subheading 2",
      subtitle: "Duis aute irure dolor in reprehenderit in voluptate velit.",
    },
    {
      title: "Subheading 3",
      subtitle: "Duis aute irure dolor in reprehenderit in voluptate velit.",
    },
  ],
  gallery: [
    "/img/blogs/blog-1.jpeg",
    "/img/blogs/blog-2.jpeg",
    "/img/blogs/blog-3.jpeg",
    "/img/blogs/blog-4.jpeg",
    "/img/blogs/blog-detail-1.jpeg",
    "/img/blogs/blog-detail-2.jpeg",
  ],
  videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  isTagline: "on",
  backgroundColor: "#00000",
  textColor: "#fffff"
};

// Call to action
export const ctaType = 3;
export const ctaData: CallToActionData = {
  title: "Medium length CTA goes here",
  subtitle: "Lorem ipsum dolor sit amet consectetur. Nunc tincidunt pretium ut duis rhoncus. Et pulvinar aliquam malesuada eu praesent quam quam.",
  buttons: [],
  tagLine: "enJerneering - Innovate Beyond",
  imgUrl: "/img/bg-contact.png",
  background: "#f3f4f6",
  isTagline: ""
};

// Team Section
export const teamSectionType = 2;
export const teamSectionData: TeamSectionData = {
  description:
    "Lorem ipsum dolor sit amet consectetur. Nunc tincidunt pretium ut duis rhoncus. Et pulvinar aliquam malesuada.",
  people: [
    {
      name: "Emma Dorsey",
      role: "Senior Developer",
      imageUrl: "/img/team.png",
      bio: "Praesentium iure error aliquam voluptas ut libero. Commodi placeat sit iure nulla officiis. Ut ex sit repellat tempora.",
      socials: [
        {
          name: "linkedin",
          url: "/",
          icon: "pi-linkedin",
        },
        {
          name: "github",
          url: "/",
          icon: "pi-github",
        },
        {
          name: "instagram",
          url: "/",
          icon: "pi-instagram",
        },
        {
          name: "facebook",
          url: "/",
          icon: "pi-facebook",
        },
      ],
    },
    {
      name: "Emma Dorsey",
      role: "Senior Developer",
      imageUrl: "/img/team.png",
      bio: "Praesentium iure error aliquam voluptas ut libero. Commodi placeat sit iure nulla officiis. Ut ex sit repellat tempora.",
      socials: [
        {
          name: "linkedin",
          url: "/",
          icon: "pi-linkedin",
        },
        {
          name: "github",
          url: "/",
          icon: "pi-github",
        },
        {
          name: "instagram",
          url: "/",
          icon: "pi-instagram",
        },
        {
          name: "facebook",
          url: "/",
          icon: "pi-facebook",
        },
      ],
    },
    {
      name: "Emma Dorsey",
      role: "Senior Developer",
      imageUrl: "/img/team.png",
      bio: "Praesentium iure error aliquam voluptas ut libero. Commodi placeat sit iure nulla officiis. Ut ex sit repellat tempora.",
      socials: [
        {
          name: "linkedin",
          url: "/",
          icon: "pi-linkedin",
        },
        {
          name: "github",
          url: "/",
          icon: "pi-github",
        },
        {
          name: "instagram",
          url: "/",
          icon: "pi-instagram",
        },
        {
          name: "facebook",
          url: "/",
          icon: "pi-facebook",
        },
      ],
    },
    {
      name: "Emma Dorsey",
      role: "Senior Developer",
      imageUrl: "/img/team.png",
      bio: "Praesentium iure error aliquam voluptas ut libero. Commodi placeat sit iure nulla officiis. Ut ex sit repellat tempora.",
      socials: [
        {
          name: "linkedin",
          url: "/",
          icon: "pi-linkedin",
        },
        {
          name: "github",
          url: "/",
          icon: "pi-github",
        },
        {
          name: "instagram",
          url: "/",
          icon: "pi-instagram",
        },
        {
          name: "facebook",
          url: "/",
          icon: "pi-facebook",
        },
      ],
    },
  ],
};

// Contact
export const contactType = 1;
export const contactData: ContactData = {
  title: "Contact Us",
  subtitle:
    "Lorem ipsum dolor sit amet consectetur. Nunc tincidunt pretium ut duis rhoncus. Et pulvinar aliquam malesuada.",
  phone: "+123456789",
  mail: "contact@enjerneering.com",
  address: "5333 Avenue Casgrain #1201 Montréal, QC H2T 1X3",
  phoneLabel: "Lorem ipsum dolor sit amet consectetur.",
  mailLabel: "Lorem ipsum dolor sit amet consectetur.",
  addressLabel: "Lorem ipsum dolor sit amet consectetur.",
  primaryLabel: "Send message",
  imgUrl: "/img/bg-contact.png",
  mapSrc: mapSrc,
  //added for successful Build
  contactPhone: true,  
  contactEmail: true,  
  contactAddress: true, 
  nameField: true, 
  emailField: true, 
  phoneField: true, 
  messageField: true, 
  textColor: "#000000"
};

// Servives
export const serviceType = 1;
export const serviceData: ServicesSectionData = {
  title: "Medium length hero heading goes here",
  subtitle:
    "Lorem ipsum dolor sit amet consectetur. Nunc tincidunt pretium ut duis rhoncus. Et pulvinar aliquam malesuada eu praesent ullamcorper quam quam. ",
  tagLine: "enJerneering - Innovate Beyond",
  subHeading: [
    {
      title: "Subheading 1",
      subtitle: "Duis aute irure dolor in reprehenderit in voluptate velit.",
      imageExtra: "/img/blogs/blog-1.jpeg",
    },
    {
      title: "Subheading 2",
      subtitle: "Duis aute irure dolor in reprehenderit in voluptate velit.",
      imageExtra: "/img/blogs/blog-2.jpeg",
    },
    {
      title: "Subheading 3",
      subtitle: "Duis aute irure dolor in reprehenderit in voluptate velit.",
      imageExtra: "/img/blogs/blog-3.jpeg",
    },
    {
      title: "Subheading 4",
      subtitle: "Duis aute irure dolor in reprehenderit in voluptate velit.",
      imageExtra: "/img/blogs/blog-4.jpeg",
    },
    {
      title: "Subheading 5",
      subtitle: "Duis aute irure dolor in reprehenderit in voluptate velit.",
      imageExtra: "/img/blogs/blog-detail-1.jpeg",
    },
    {
      title: "Subheading 6",
      subtitle: "Duis aute irure dolor in reprehenderit in voluptate velit.",
      imageExtra: "/img/blogs/blog-detail-2.jpeg",
    },
  ],
};

// Blog
export const blogType = 1;
export const blogData: BlogData = {
  title: "Ours Blog",
  subtitle:
    "Lorem ipsum dolor sit amet consectetur. Nunc tincidunt pretium ut duis rhoncus. Lorem ipsum dolor sit amet consectetur.",
  blogList: [
    {
      title: "Blog title heading goes here",
      subtitle:
        "Lorem ipsum dolor sit amet consectetur. Nunc tincidunt pretium ut duis rhoncus. Lorem ipsum dolor sit amet consectetur.",
      category: "Technology",
      thumbnailUrl: "/img/blogs/blog-1.jpeg",
      publishedAt: "Jan 15, 2024",
      timeRead: "16 min",
      href: "/",
      author: {
        name: "Jerrod",
        avatarUrl: "/img/team.png",
        href: "/",
      },
        //added for successful Build
      type: 1
    },
    {
      title: "Blog title heading goes here",
      subtitle:
        "Lorem ipsum dolor sit amet consectetur. Nunc tincidunt pretium ut duis rhoncus. Lorem ipsum dolor sit amet consectetur.",
      category: "Technology",
      thumbnailUrl: "/img/blogs/blog-1.jpeg",
      publishedAt: "Jan 15, 2024",
      timeRead: "16 min",
      href: "/",
      author: {
        name: "Jerrod",
        avatarUrl: "/img/team.png",
        href: "/",
      },
        //added for successful Build
      type: 2
    },
    {
      title: "Blog title heading goes here",
      subtitle:
        "Lorem ipsum dolor sit amet consectetur. Nunc tincidunt pretium ut duis rhoncus. Lorem ipsum dolor sit amet consectetur.",
      category: "Technology",
      thumbnailUrl: "/img/blogs/blog-1.jpeg",
      publishedAt: "Jan 15, 2024",
      timeRead: "16 min",
      href: "/",
      author: {
        name: "Jerrod",
        avatarUrl: "/img/team.png",
        href: "/",
      },
        //added for successful Build
      type: 3
    },
  ],
  isShowAuthor: true,
};

// Textbox
export const textBoxType = 1;
export const textBoxData: TextBoxData = {
  content: "This is Placeholder Text (Testing)",
  textColor: "#333",
  fontSize: "",
  isBold: false
};

// Footer
export const footerType = 1;
export const footerData: FooterData = {
  showContentFlags: {
    slogan: "on",
    socials: "on",
    copyRight: "on",
  },
  logo: "/img/enJerneering_black.png",
  copyRight: "© 202X. Powered by enJerneering.",
  slogan:
    "Lorem ipsum dolor sit amet consectetur. Nunc tincidunt pretium ut duis rhoncus. Et pulvinar aliquam malesuada.",
  socials: [
    {
      id: uuidv4(),
      name: "linkedin",
      url: "/",
      icon: "pi-linkedin",
    },
    {
      id: uuidv4(),
      name: "github",
      url: "/",
      icon: "pi-github",
    },
    {
      id: uuidv4(),
      name: "instagram",
      url: "/",
      icon: "pi-instagram",
    },
    {
      id: uuidv4(),
      name: "facebook",
      url: "/",
      icon: "pi-facebook",
    },
  ],
  navigation: [
    {
      title: "Page 1",
      href: "/",
      pageGroup: "Page group 1",
    },
    {
      title: "Page 2",
      href: "/",
      pageGroup: "Page group 1",
    },
    {
      title: "Page 3",
      href: "/",
      pageGroup: "Page group 1",
    },
    {
      title: "Page 4",
      href: "/",
      pageGroup: "Page group 2",
    },
    {
      title: "Page 5",
      href: "/",
      pageGroup: "Page group 2",
    },
    {
      title: "Page 6",
      href: "/",
      pageGroup: "Page group 3",
    },
    {
      title: "Page 7",
      href: "/",
      pageGroup: "Page group 3",
    },
  ],
  polices: [
    { title: "Privacy Policy", url: "/" },
    { title: "Terms & Conditions", url: "/" },
    { title: "Legal Information", url: "/" },
  ],
  ctaButtonLabel: "Submit",
  ctaButtonUrl: "/",
};

