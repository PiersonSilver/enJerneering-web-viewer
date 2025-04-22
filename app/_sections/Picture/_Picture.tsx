"use client";

import React from "react";
import Image from "next/image";
import { PictureData } from "../Picture/types/PictureData";

interface PictureTypeProps {
  data: PictureData;
}

const PictureType: React.FC<PictureTypeProps> = ({ data }) => {
  const { src, alt, borderRadius = "0", maxWidth = "100%" } = data;

  return (
    <div
      className="flex justify-center items-center w-full"
      style={{ maxWidth }}
    >
      <div style={{ position: "relative", width: "100%", height: "auto" }}>
        <Image
          src={src}
          alt={alt}
          layout="responsive"
          width={800}
          height={500}
          style={{
            borderRadius,
            objectFit: "contain",
            width: "100%",
            height: "auto",
          }}
        />
      </div>
    </div>
  );
};

export default PictureType;
