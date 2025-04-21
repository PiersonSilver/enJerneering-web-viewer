"use client";

import React from "react";
import NavbarType1 from "./_NavbarType1";
import NavbarType2 from "./_NavbarType2";
import NavbarType3 from "./_NavbarType3";
import { NavbarData } from "./types/NavbarData";

interface NavbarProps {
  type: number;
  typeSubLink: number;
  data: NavbarData;
}

const Navbar: React.FC<NavbarProps> = ({ type, typeSubLink, data }) => {
  const renderNavbarComponent = (type: number) => {
    switch (type) {
      case 1:
        return <NavbarType1 type={type} data={data} />;
      case 2:
        return <NavbarType2 type={type} data={data} />;
      case 3:
        return <NavbarType3 type={type} data={data} />;
      default:
        throw new Error(`Navbar type ${type} is not supported`);
    }
  };

  return <>{renderNavbarComponent(type)}</>;
};

export default Navbar;
