"use client";

import React from "react";
import FooterType1 from "./_FooterType1";
import FooterType2 from "./_FooterType2";
import FooterType3 from "./_FooterType3";
import FooterType4 from "./_FooterType4";
import { FooterData } from "./types/FooterData";

interface FooterProps {
  type: number;
  data: FooterData;
}

const Footer: React.FC<FooterProps> = ({ type, data }) => {
  const renderFooterComponent = (type: number) => {
    switch (type) {
      case 1:
        return <FooterType1 data={data} />;
      case 2:
        return <FooterType2 data={data} />;
      case 3:
        return <FooterType3 data={data} />;
      case 4:
        return <FooterType4 data={data} />
      default:
        throw new Error(`Footer type ${type} is not supported`);
    }
  };

  return <>{renderFooterComponent(type)}</>;
};

export default Footer;
