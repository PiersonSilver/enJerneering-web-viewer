"use client";

import React from "react";
import type { SubLink } from "../../types/NavbarData";
import SubLinkType1 from "./_SubLinkType1";
import SubLinkType2 from "./_SubLinkType2";
import SubLinkType3 from "./_SubLinkType3";

interface HeaderProps {
  type: number;
  title: string;
  subLinks: SubLink[];
  isMobile: boolean;
}

/**
 * SubLink component is used to render sub links in the navbar
 * @param param0 = { type, title, subLinks, isMobile }
 * @returns 
 */
const SubLink: React.FC<HeaderProps> = ({
  type,
  title,
  subLinks,
  isMobile,
}) => {
  const renderHeaderComponent = (type: number) => {
    switch (type) {
      case 1:
        return (
          <SubLinkType1 title={title} subLinks={subLinks} isMobile={isMobile} />
        );
      case 2:
        return (
          <SubLinkType2 title={title} subLinks={subLinks} isMobile={isMobile} />
        );
      case 3:
        return (
          <SubLinkType3 title={title} subLinks={subLinks} isMobile={isMobile} />
        );
      default:
        throw new Error(`SubLink type ${type} is not supported`);
    }
  };

  return <>{renderHeaderComponent(type)}</>;
};

export default SubLink;
