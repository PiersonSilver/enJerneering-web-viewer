"use client";

import React from "react";
import Image from "next/image";
import { PictureData } from "../Picture/types/PictureData";

interface PictureTypeProps {
  data: PictureData;
}

const PictureType: React.FC<PictureTypeProps> = ({ data }) => {
  const { src, alt } = data;

  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative w-full aspect-[16/10]">
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
};

export default PictureType;
