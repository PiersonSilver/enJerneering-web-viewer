/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { MainContentData } from "./types/MainContentData";

interface MainContentProps {
  data: MainContentData;
}

const MainContentType2: React.FC<MainContentProps> = ({ data }) => {
  const {
    title,
    subtitle,
    gallery = [],
    textColor,
    backgroundColor,
  } = data;

  return (
    <div style={{backgroundColor}}>
      <div className="mx-auto max-w-[1440px] px-6 py-20 lg:p-20">
        <div className="mx-auto w-full lg:mx-0 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-800 sm:text-4xl" style={{ color: textColor }}>
            {title}
          </h2>
          <p className="mt-4 text-base text-neutral-500" style={{ color: textColor }}>{subtitle}</p>
        </div>

        <div className="flex flex-col gap-6 mt-10">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="flex flex-col md:flex-row xl:flex-col gap-6">
              <div className="xl:w-full h-[400px] md:h-full lg:h-[400px] xl:h-[250px] flex-none md:flex-1 xl:flex-none">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={gallery[0]}
                  alt="gallery-image-1"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6 flex-none md:flex-1 xl:flex-none">
                <div className="xl:w-full h-[400px] md:h-[250px] lg:h-[400px]">
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    src={gallery[1]}
                    alt="gallery-image-2"
                  />
                </div>
                <div className="xl:w-full h-[400px] md:h-[250px] lg:h-[400px]">
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    src={gallery[2]}
                    alt="gallery-image-3"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row-reverse xl:flex-col-reverse gap-6">
              <div className="xl:w-full h-[400px] md:h-full lg:h-[400px] xl:h-[250px] flex-none md:flex-1 xl:flex-none">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={gallery[3]}
                  alt="gallery-image-4"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6 flex-none md:flex-1 xl:flex-none">
                <div className="xl:w-full h-[400px] md:h-[250px] lg:h-[400px]">
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    src={gallery[4]}
                    alt="gallery-image-5"
                  />
                </div>
                <div className="xl:w-full h-[400px] md:h-[250px] lg:h-[400px]">
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    src={gallery[5]}
                    alt="gallery-image-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContentType2;
