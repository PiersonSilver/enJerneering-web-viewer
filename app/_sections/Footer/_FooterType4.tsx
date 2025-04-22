"use client";

import React from "react";
import { FooterData } from "./types/FooterData";

interface FooterProps {
  data: FooterData;
}

const FooterType4: React.FC<FooterProps> = ({ data }) => {
  const {
    copyRight,
  } = data;

    return (
        <footer className="w-full bg-gray-800 text-white p-4">
            <div className="container mx-auto text-center">
                <p className="text-sm">{copyRight}</p>
            </div>
        </footer>
    );
};

export default FooterType4;
